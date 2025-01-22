import config from '$lib/modules/config';
import { APUB_MSG_CONTEXT, ACTIVITYPUB_RES_HEADERS, APUB_BLOG_ACCOUNT } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

const { image } = config.meta;

const PUBLISHER_ACCOUNT_INFO = {
  ...APUB_MSG_CONTEXT,
  id: APUB_BLOG_ACCOUNT.PROFILE,
  type: APUB_BLOG_ACCOUNT.TYPE,
  name: APUB_BLOG_ACCOUNT.NAME,
  preferredUsername: APUB_BLOG_ACCOUNT.USERNAME,
  inbox: APUB_BLOG_ACCOUNT.INBOX_URL,
  outbox: APUB_BLOG_ACCOUNT.OUTBOX_URL,
  publicKey: {
    id: APUB_BLOG_ACCOUNT.KEY_ID,
    owner: APUB_BLOG_ACCOUNT.PROFILE,
    publicKeyPem: APUB_BLOG_ACCOUNT.PUBKEY
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
  },
  discoverable: true
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, fetch }) {
  try {
    if (!(request.headers.get('Accept') || '').includes('application/activity+json')) {
      return new Response(null, {
        status: 302,
        headers: {
          location: '/blog/1'
        }
      });
    }

    const { published, updated } = await fetch('/blog/meta.json').then((res) => res.json());
    return new Response(JSON.stringify({ ...PUBLISHER_ACCOUNT_INFO, published, updated }), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
