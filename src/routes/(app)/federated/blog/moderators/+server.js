import { ACTIVITYPUB_CONTEXTS, ACTIVITYPUB_RES_HEADERS, APUB_BLOG_ACCOUNT, APUB_GROUP } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = true;

const MODERATORS = {
  '@context': [ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS, ACTIVITYPUB_CONTEXTS.W3ID_SECURITY],
  id: APUB_GROUP.ATTRIBUTED_TO_URL,
  type: 'OrderedCollection',
  orderedItems: [APUB_BLOG_ACCOUNT.PROFILE]
};

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    return new Response(JSON.stringify(MODERATORS), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
