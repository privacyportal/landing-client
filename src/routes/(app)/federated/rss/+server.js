import config from '$lib/modules/config';
import { APUB_MSG_CONTEXT, ACTIVITYPUB_RES_HEADERS, APUB_MICROBLOG_ACCOUNT } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

const { image } = config.meta;

const RSS_ACCOUNT_INFO = {
  ...APUB_MSG_CONTEXT,
  id: APUB_MICROBLOG_ACCOUNT.PROFILE,
  type: APUB_MICROBLOG_ACCOUNT.TYPE,
  name: APUB_MICROBLOG_ACCOUNT.NAME,
  preferredUsername: APUB_MICROBLOG_ACCOUNT.USERNAME,
  inbox: APUB_MICROBLOG_ACCOUNT.INBOX_URL,
  outbox: APUB_MICROBLOG_ACCOUNT.OUTBOX_URL,
  publicKey: {
    id: APUB_MICROBLOG_ACCOUNT.KEY_ID,
    owner: APUB_MICROBLOG_ACCOUNT.PROFILE,
    publicKeyPem: APUB_MICROBLOG_ACCOUNT.PUBKEY
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

export async function _getRssActorInfo({ fetch }) {
  const { published, updated } = await fetch('/blog/meta.json').then((res) => res.json());
  return { ...RSS_ACCOUNT_INFO, published, updated };
}

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

    const body = await _getRssActorInfo({ fetch });
    return new Response(JSON.stringify(body), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
