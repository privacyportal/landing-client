import { env } from '$env/dynamic/private';
import { createOutboxItems } from '$lib/modules/activitypub/apRssUtil';
import { signAndSendMessage } from '$lib/modules/activitypub/apSignatureUtil';
import { storeFollowersIterator } from '$lib/modules/activitypub/apStorageUtil';
import { authorize } from '$lib/modules/auth';
import { ACTIVITYPUB_ACCOUNT, ACTIVITYPUB_CONTEXTS, DEFAULT_RES_HEADERS, UNAUTHORIZED_ERR } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

// we should not publish more than 5 posts in order to not spam servers
// this shouldn't happen anyway
const MAX_ITEMS = 5;
const outbox_promise = createOutboxItems(ACTIVITYPUB_ACCOUNT, MAX_ITEMS);

export async function _processPublishRequest(accountObj, outbox, lastPublished) {
  // prepare items to publish
  if (outbox.totalItems) {
    let itemsToPublish;
    const lastPublishedIndex = outbox.orderedItems.findIndex((item) => item.id === lastPublished);
    if (lastPublishedIndex > -1) {
      itemsToPublish = outbox.orderedItems.slice(0, lastPublishedIndex).map((item) => ({
        '@context': [ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS, ACTIVITYPUB_CONTEXTS.W3ID_SECURITY],
        ...item
      }));
    }

    if (itemsToPublish?.length) {
      // items found for publishing, let's get the followers
      for await (const inbox of storeFollowersIterator(accountObj.USERNAME)) {
        console.log(`publishing ${itemsToPublish.length} messages...`);
        for (const message of itemsToPublish) {
          console.log({ inbox, message });
          await signAndSendMessage({
            message,
            inbox,
            actor: accountObj.PROFILE,
            privkey: env.ACTIVITYPUB_PRIVKEY
          });
        }
        console.log(`done publishing.`);
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
export async function GET({ request, url }) {
  try {
    if (!(request.headers.get('Accept') || '').includes('application/json')) {
      return error(404, 'Page not found.');
    }
    if (!(await authorize(request).catch(() => null))) return error(401, UNAUTHORIZED_ERR);

    const lastPublished = url.searchParams.get('last');
    if (!lastPublished) return error(403, '"last" param required.');

    const outbox = await outbox_promise;
    return await _processPublishRequest(ACTIVITYPUB_ACCOUNT, outbox, lastPublished);
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
