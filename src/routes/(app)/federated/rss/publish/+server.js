import { env } from '$env/dynamic/private';
import { signAndSendMessage } from '$lib/modules/activitypub/apSignatureUtil';
import { storeFollowersIterator } from '$lib/modules/activitypub/apStorageUtil';
import { authorize } from '$lib/modules/auth';
import { APUB_MICROBLOG_ACCOUNT, APUB_MSG_CONTEXT, DEFAULT_RES_HEADERS, UNAUTHORIZED_ERR } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';
import { _getRssActorInfo } from '../+server';

export const prerender = false;

// we should not publish more than 10 posts in order to not spam servers
// this shouldn't happen anyway
const MAX_ITEMS = 10;

export async function _publishItemToFollowers({ message, accountObj, keyInfo }) {
  for await (const inbox of storeFollowersIterator(accountObj.USERNAME)) {
    console.log('publishing item...');
    console.log({ inbox, message });
    await signAndSendMessage({
      message,
      inbox,
      keyInfo
    });
    console.log('done publishing item.');
  }
}

export function _wrapItemForPublishing(item, update = false) {
  return {
    ...APUB_MSG_CONTEXT,
    ...item,
    ...(update &&
      item?.type === 'Create' && {
        type: 'Update',
        updated: new Date().toISOString().slice(0, -5) + 'Z'
      }),
    ...(update &&
      item?.object?.type === 'Create' && {
        object: {
          ...item.object,
          type: 'Update',
          updated: new Date().toISOString().slice(0, -5) + 'Z'
        }
      })
  };
}

export async function _processPublishRequest({ accountObj, keyInfo, orderedItems, lastPublished, update = false }) {
  // prepare items to publish
  if (orderedItems.length) {
    let itemsToPublish;
    const lastPublishedIndex = orderedItems.findIndex((item) => item.id === lastPublished);
    if (lastPublishedIndex > -1) {
      itemsToPublish = orderedItems
        .slice(0, lastPublishedIndex)
        .map((item) => {
          return [
            // Send Announce/Page for compatibility with Mastodon
            ...(item?.type === 'Announce' && item?.object?.type === 'Create' && item?.object?.object?.type === 'Page' ? [_wrapItemForPublishing({ ...item, object: item.object.object }, update)] : []),
            // Send Announce/Create/Page for compatibility with Lemmy
            _wrapItemForPublishing(item, update)
          ];
        })
        .flat();
    }

    if (itemsToPublish?.length) {
      // items found for publishing, let's get the followers
      for (const message of itemsToPublish) {
        await _publishItemToFollowers({ message, accountObj, keyInfo });
      }
    } else {
      console.log('no new items found to publish.');
    }
  } else {
    console.log('no items found to publish.');
  }

  return new Response(JSON.stringify({ success: true }), { headers: DEFAULT_RES_HEADERS });
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, url, fetch }) {
  try {
    if (!(request.headers.get('Accept') || '').includes('application/json')) {
      return error(404, 'Page not found.');
    }
    if (
      !(await authorize(request).catch((err) => {
        console.error(err);
        return null;
      }))
    )
      return error(401, UNAUTHORIZED_ERR);

    const type = url.searchParams.get('type');
    if (type === 'actor') {
      const data = await _getRssActorInfo({ fetch });
      if (!data) throw new Error('Failed to fetch blog data.');
      await _publishItemToFollowers({
        message: _wrapItemForPublishing(data, true),
        accountObj: APUB_MICROBLOG_ACCOUNT,
        keyInfo: {
          id: APUB_MICROBLOG_ACCOUNT.KEY_ID,
          private: env[APUB_MICROBLOG_ACCOUNT.PRIVKEY_NAME]
        }
      });
      return new Response(JSON.stringify({ success: true }), { headers: DEFAULT_RES_HEADERS });
    }

    const lastPublished = url.searchParams.get('last');
    if (!lastPublished) return error(403, '"last" param required.');

    const update = !!url.searchParams.get('update');

    const orderedItems = await fetch(APUB_MICROBLOG_ACCOUNT.OUTBOX_PATH)
      .then((res) => res.json())
      .then((data) => data.orderedItems.slice(0, MAX_ITEMS));

    return await _processPublishRequest({
      accountObj: APUB_MICROBLOG_ACCOUNT,
      keyInfo: {
        id: APUB_MICROBLOG_ACCOUNT.KEY_ID,
        private: env[APUB_MICROBLOG_ACCOUNT.PRIVKEY_NAME]
      },
      orderedItems,
      lastPublished,
      update
    });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
