import { ACTIVITYPUB_ACCOUNT } from '$lib/modules/constants';
import { error } from '@sveltejs/kit';

export const prerender = false;

const HEADERS = {
  'Cache-Control': 'max-age=0, s-maxage=3600',
  'Content-Type': 'application/jrd+json'
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  try {
    const queryParams = url.searchParams;
    const resource = queryParams.get('resource');

    // we only allow users to follow our rss feed "resource=acct:<USERNAME>@<DOMAIN>"
    if (!resource) return error(403, '"resource" param required.');
    if (resource !== `acct:${ACTIVITYPUB_ACCOUNT.ID}`) return error(404, 'resource not found.');

    return new Response(
      JSON.stringify({
        subject: resource,
        links: [
          {
            rel: 'self',
            type: 'application/activity+json',
            href: ACTIVITYPUB_ACCOUNT.PROFILE
          }
        ]
      }),
      {
        headers: HEADERS
      }
    );
  } catch (err) {
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
