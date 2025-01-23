import { ACTIVITYPUB_RES_HEADERS, APUB_GROUP, APUB_MSG_CONTEXT } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = true;

const RSS_ACCOUNT_INFO = {
  ...APUB_MSG_CONTEXT,
  id: APUB_GROUP.FEATURED_URL,
  type: 'OrderedCollection',
  orderedItems: [],
  totalItems: 0
};

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    return new Response(JSON.stringify(RSS_ACCOUNT_INFO), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
