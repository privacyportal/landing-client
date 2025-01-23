import { env } from '$env/dynamic/private';
import { authorize } from '$lib/modules/auth';
import { APUB_BLOG_ACCOUNT, DEFAULT_RES_HEADERS, UNAUTHORIZED_ERR } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';
import { _getPublisherActorInfo } from '../+server';
import { _processPublishRequest, _publishItemToFollowers, _wrapItemForPublishing } from '../../rss/publish/+server';

export const prerender = false;

// we should not publish more than 10 posts in order to not spam servers
// this shouldn't happen anyway
const MAX_ITEMS = 10;

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, url, fetch }) {
  try {
    if (!(request.headers.get('Accept') || '').includes('application/json')) {
      return error(404, 'Page not found.');
    }
    if (!(await authorize(request).catch(() => null))) return error(401, UNAUTHORIZED_ERR);

    const type = url.searchParams.get('type');
    if (type === 'actor') {
      const data = await _getPublisherActorInfo({ fetch });
      if (!data) throw new Error('Failed to fetch publisher data.');
      await _publishItemToFollowers({
        message: _wrapItemForPublishing(data, true),
        accountObj: APUB_BLOG_ACCOUNT,
        keyInfo: {
          id: APUB_BLOG_ACCOUNT.KEY_ID,
          private: env[APUB_BLOG_ACCOUNT.PRIVKEY_NAME]
        }
      });
      return new Response(JSON.stringify({ success: true }), { headers: DEFAULT_RES_HEADERS });
    }

    const lastPublished = url.searchParams.get('last');
    if (!lastPublished) return error(403, '"last" param required.');

    const update = !!url.searchParams.get('update');

    const orderedItems = await fetch(APUB_BLOG_ACCOUNT.OUTBOX_PATH)
      .then((res) => res.json())
      .then((data) => data.orderedItems.slice(0, MAX_ITEMS));

    return await _processPublishRequest({
      accountObj: APUB_BLOG_ACCOUNT,
      keyInfo: {
        id: APUB_BLOG_ACCOUNT.KEY_ID,
        private: env[APUB_BLOG_ACCOUNT.PRIVKEY_NAME]
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
