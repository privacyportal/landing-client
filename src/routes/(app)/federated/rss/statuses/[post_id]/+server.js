import { validateStatusId } from '$lib/modules/activitypub/apUtil';
import { APUB_MSG_CONTEXT, ACTIVITYPUB_RES_HEADERS } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

/** @type {import('../$types').RequestHandler} */
export async function GET({ params, fetch }) {
  try {
    if (!validateStatusId(params.post_id)) return error(404, 'Page not found');
    const data = await fetch(`/federated/rss/statuses/${params.post_id}/activity`).then(res => res.ok ? res.json() : null);
    if (!data) return error(404, 'page not found');
    const body = {
      ...APUB_MSG_CONTEXT,
      ...data.object
    }
    return new Response(JSON.stringify(body), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
