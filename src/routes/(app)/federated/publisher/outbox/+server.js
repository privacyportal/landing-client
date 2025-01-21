import { createOutboxItems } from '$lib/modules/activitypub/apRssUtil';
import { ACTIVITYPUB_RES_HEADERS, APUB_BLOG_ACCOUNT } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = true;

const MAX_ITEMS = 10;

const outbox_promise = createOutboxItems(APUB_BLOG_ACCOUNT, MAX_ITEMS);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    const outbox = await outbox_promise;
    return new Response(JSON.stringify(outbox), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
