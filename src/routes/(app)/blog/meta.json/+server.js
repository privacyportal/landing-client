import { publishedUpdatedDates } from '$lib/modules/activitypub/apRssUtil';
import { DEFAULT_RES_HEADERS } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    const metadata = await publishedUpdatedDates();
    return new Response(JSON.stringify(metadata), { headers: DEFAULT_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
