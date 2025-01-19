import { ACTIVITYPUB_ACCOUNT, ACTIVITYPUB_GROUP } from '$lib/modules/constants';
import { error } from '@sveltejs/kit';

export const prerender = false;

const HEADERS = {
  'Cache-Control': 'max-age=0, s-maxage=3600',
  'Content-Type': 'application/jrd+json'
};

const ACCOUNT_KEY = 'acct:';

const ACCOUNTS = {
  [ACTIVITYPUB_ACCOUNT.ID]: ACTIVITYPUB_ACCOUNT.PROFILE,
  [ACTIVITYPUB_GROUP.ID]: ACTIVITYPUB_GROUP.PROFILE
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  try {
    const queryParams = url.searchParams;
    const resource = queryParams.get('resource');

    // we only allow users to follow our rss feed "resource=acct:<USERNAME>@<DOMAIN>"
    if (!resource) return error(403, '"resource" param required.');
    if (!resource.startsWith(ACCOUNT_KEY)) return error(404, 'resource not found.');

    const accountId = resource.substring(ACCOUNT_KEY.length);
    if (!(accountId in ACCOUNTS)) return error(404, 'resource not found.');

    return new Response(
      JSON.stringify({
        subject: resource,
        links: [
          {
            rel: 'self',
            type: 'application/activity+json',
            href: ACCOUNTS[accountId]
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
