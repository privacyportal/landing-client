import { ACTIVITYPUB_ACCOUNT, ACTIVITYPUB_CONTEXTS, ACTIVITYPUB_RES_HEADERS } from '$lib/modules/constants';
import { error } from '@sveltejs/kit';

export const prerender = false;

const RSS_ACCOUNT_INFO = {
  '@context': [ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS, ACTIVITYPUB_CONTEXTS.W3ID_SECURITY],
  id: ACTIVITYPUB_ACCOUNT.PROFILE,
  type: 'Service',
  preferredUsername: `${ACTIVITYPUB_ACCOUNT.USERNAME}`,
  name: ACTIVITYPUB_ACCOUNT.USERNAME,
  inbox: `${ACTIVITYPUB_ACCOUNT.INBOX_URL}`,
  outbox: `${ACTIVITYPUB_ACCOUNT.OUTBOX_URL}`,
  publicKey: {
    id: `${ACTIVITYPUB_ACCOUNT.PROFILE}#main-key`,
    owner: `${ACTIVITYPUB_ACCOUNT.PROFILE}`,
    publicKeyPem: ACTIVITYPUB_ACCOUNT.PUBKEY
  }
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
  try {
    if (!(request.headers.get('Accept') || '').includes('application/activity+json')) {
      return new Response(null, {
        status: 302,
        headers: {
          location: '/blog/1'
        }
      });
    }
    return new Response(JSON.stringify(RSS_ACCOUNT_INFO), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
