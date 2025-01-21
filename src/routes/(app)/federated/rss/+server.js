import { publishedUpdatedDates } from '$lib/modules/activitypub/apRssUtil';
import config from '$lib/modules/config';
import { ACTIVITYPUB_ACCOUNT, ACTIVITYPUB_CONTEXTS, ACTIVITYPUB_RES_HEADERS } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

const { image } = config.meta;

const RSS_ACCOUNT_INFO = {
  '@context': [ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS, ACTIVITYPUB_CONTEXTS.W3ID_SECURITY],
  id: ACTIVITYPUB_ACCOUNT.PROFILE,
  type: ACTIVITYPUB_ACCOUNT.TYPE,
  name: ACTIVITYPUB_ACCOUNT.NAME,
  preferredUsername: ACTIVITYPUB_ACCOUNT.USERNAME,
  inbox: ACTIVITYPUB_ACCOUNT.INBOX_URL,
  outbox: ACTIVITYPUB_ACCOUNT.OUTBOX_URL,
  publicKey: {
    id: ACTIVITYPUB_ACCOUNT.KEY_ID,
    owner: ACTIVITYPUB_ACCOUNT.PROFILE,
    publicKeyPem: ACTIVITYPUB_ACCOUNT.PUBKEY
  },
  icon: {
    type: 'Image',
    mediaType: 'image/png',
    url: image
  },
  image: {
    type: 'Image',
    mediaType: 'image/png',
    url: image
  }
};

const dates_promise = publishedUpdatedDates();

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

    const publishDates = await dates_promise;
    return new Response(JSON.stringify({ ...RSS_ACCOUNT_INFO, ...publishDates }), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
