import { createOutboxItems } from '$lib/modules/activitypub/apRssUtil';
import { ACTIVITYPUB_ACCOUNT, ACTIVITYPUB_RES_HEADERS } from '$lib/modules/constants';
import { error } from '@sveltejs/kit';

export const prerender = true;

const MAX_ITEMS = 50;

const outbox_promise = createOutboxItems(ACTIVITYPUB_ACCOUNT, MAX_ITEMS);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    const outbox = await outbox_promise;
    return new Response(JSON.stringify(outbox), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
