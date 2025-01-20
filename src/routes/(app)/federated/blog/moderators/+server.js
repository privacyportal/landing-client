import { ACTIVITYPUB_ACCOUNT, ACTIVITYPUB_CONTEXTS, ACTIVITYPUB_GROUP, ACTIVITYPUB_RES_HEADERS } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = true;

const RSS_ACCOUNT_INFO = {
  '@context': [ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS, ACTIVITYPUB_CONTEXTS.W3ID_SECURITY],
  id: ACTIVITYPUB_GROUP.ATTRIBUTED_TO_URL,
  type: 'OrderedCollection',
  orderedItems: [ACTIVITYPUB_ACCOUNT.PROFILE]
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
