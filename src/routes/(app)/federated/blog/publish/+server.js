import { env } from '$env/dynamic/private';
import { authorize } from '$lib/modules/auth';
import { APUB_BLOG_ACCOUNT, APUB_GROUP, UNAUTHORIZED_ERR } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';
import { _processPublishRequest } from '../../rss/publish/+server';

export const prerender = false;

// we should not publish more than 5 posts in order to not spam servers
// this shouldn't happen anyway
const MAX_ITEMS = 5;

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, url, fetch }) {
  try {
    if (!(request.headers.get('Accept') || '').includes('application/json')) {
      return error(404, 'Page not found.');
    }
    if (!(await authorize(request).catch(() => null))) return error(401, UNAUTHORIZED_ERR);

    const lastPublished = url.searchParams.get('last');
    if (!lastPublished) return error(403, '"last" param required.');

    const orderedItems = await fetch(APUB_GROUP.OUTBOX_PATH)
      .then((res) => res.json())
      .then((data) => data.orderedItems.slice(0, MAX_ITEMS));

    return await _processPublishRequest({
      accountObj: APUB_GROUP,
      keyInfo: { // signed by moderator
        id: APUB_BLOG_ACCOUNT.KEY_ID,
        private: env[APUB_BLOG_ACCOUNT.PRIVKEY_NAME]
      },
      orderedItems,
      lastPublished
    });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
