import { validateStatusId } from '$lib/modules/activitypub/apUtil';
import { APUB_MSG_CONTEXT, ACTIVITYPUB_RES_HEADERS, DOMAIN } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

const SLUG_REGEX = new RegExp(`"https://${DOMAIN}/blog/([^"]+)"`);

/** @type {import('../$types').RequestHandler} */
export async function GET({ request, params, fetch }) {
  try {
    if (!validateStatusId(params.post_id)) return error(404, 'Page not found');
    const data = await fetch(`/federated/publisher/statuses/${params.post_id}/activity`).then(res => res.ok ? res.json() : null);
    if (!data) return error(404, 'page not found');
    if (!(request.headers.get('Accept') || '').includes('application/activity+json')) {
      const slug = (data?.object?.attachment?.[0]?.href || '').match(SLUG_REGEX)[1];
      return new Response(null, {
        status: 302,
        headers: {
          location: `/blog/${slug}`
        }
      });
    }

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
