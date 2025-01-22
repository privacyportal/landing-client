import { APUB_BLOG_ACCOUNT, APUB_GROUP, APUB_MICROBLOG_ACCOUNT } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';
import { ACTIVITYPUB_CONTEXTS } from '../../../../lib/modules/constants';

export const prerender = false;

const HEADERS = {
  'Cache-Control': 'max-age=0, s-maxage=3600',
  'Content-Type': 'application/jrd+json'
};

const ACCOUNT_KEY = 'acct:';

const ACCOUNTS = {
  [APUB_MICROBLOG_ACCOUNT.ID]: APUB_MICROBLOG_ACCOUNT,
  [APUB_BLOG_ACCOUNT.ID]: APUB_BLOG_ACCOUNT,
  [APUB_GROUP.ID]: APUB_GROUP
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
            href: ACCOUNTS[accountId].PROFILE,
            properties: {
              [`${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#type`]: ACCOUNTS[accountId].TYPE
            }
          }
        ]
      }),
      {
        headers: HEADERS
      }
    );
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
