import { storeGetFollowerCount } from '$lib/modules/activitypub/apStorageUtil';
import { APUB_MSG_CONTEXT, ACTIVITYPUB_RES_HEADERS, APUB_GROUP } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

const FOLLOWERS_RESPONSE = {
  ...APUB_MSG_CONTEXT,
  id: APUB_GROUP.FOLLOWERS_URL,
  type: 'Collection',
  items: [], // we do not include followers for privacy
  totalItems: 0
};

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    const { count } = await storeGetFollowerCount(APUB_GROUP.USERNAME);
    return new Response(JSON.stringify({
      ...FOLLOWERS_RESPONSE,
      totalItems: count
    }), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
