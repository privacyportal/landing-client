import { createOutboxItems } from '$lib/modules/activitypub/apRssUtil';
import { ACTIVITYPUB_RES_HEADERS } from '$lib/modules/constants';
import { error } from '@sveltejs/kit';

export const prerender = true;

const MAX_ITEMS = 50;

const outbox_promise = createOutboxItems(MAX_ITEMS);

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
  try {
    if (request.headers.get('Accept') !== 'application/activity+json') return error(404, 'Page not found.');
    const outbox = await outbox_promise;
    return new Response(JSON.stringify(outbox), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
