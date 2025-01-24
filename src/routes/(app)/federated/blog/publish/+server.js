import { env } from '$env/dynamic/private';
import { authorize } from '$lib/modules/auth';
import { APUB_GROUP, DEFAULT_RES_HEADERS, UNAUTHORIZED_ERR } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';
import { _getGroupActorInfo } from '../+server';
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
      const data = await _getGroupActorInfo({ fetch });
      if (!data) throw new Error('Failed to fetch blog data.');
      await _publishItemToFollowers({
        message: _wrapItemForPublishing(data, true),
        accountObj: APUB_GROUP,
        keyInfo: {
          id: APUB_GROUP.KEY_ID,
          private: env[APUB_GROUP.PRIVKEY_NAME]
        }
      });
      return new Response(JSON.stringify({ success: true }), { headers: DEFAULT_RES_HEADERS });
    }

    const lastPublished = url.searchParams.get('last');
    if (!lastPublished) return error(403, '"last" param required.');

    const update = url.searchParams.get('update') === 'true';

    const orderedItems = await fetch(APUB_GROUP.OUTBOX_PATH)
      .then((res) => res.json())
      .then((data) => data.orderedItems.slice(0, MAX_ITEMS));

    return await _processPublishRequest({
      accountObj: APUB_GROUP,
      keyInfo: {
        id: APUB_GROUP.KEY_ID,
        private: env[APUB_GROUP.PRIVKEY_NAME]
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
