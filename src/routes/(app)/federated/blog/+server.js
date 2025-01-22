import config from '$lib/modules/config';
import { APUB_MSG_CONTEXT, ACTIVITYPUB_RES_HEADERS, APUB_GROUP } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

const { image } = config.meta;

const BLOG_ACCOUNT_INFO = {
  ...APUB_MSG_CONTEXT,
  id: APUB_GROUP.PROFILE,
  type: APUB_GROUP.TYPE,
  name: APUB_GROUP.NAME,
  preferredUsername: APUB_GROUP.USERNAME,
  inbox: APUB_GROUP.INBOX_URL,
  outbox: APUB_GROUP.OUTBOX_URL,
  featured: APUB_GROUP.FEATURED_URL,
  attributedTo: APUB_GROUP.ATTRIBUTED_TO_URL,
  postingRestrictedToMods: true,
  publicKey: {
    id: APUB_GROUP.KEY_ID,
    owner: APUB_GROUP.PROFILE,
    publicKeyPem: APUB_GROUP.PUBKEY
  },
  summary: '<p><strong>Privacy Portal Blog Posts:</strong> learn about online privacy and follow the latest updates on our products.</p>\n',
  source: {
    content: '**Privacy Portal Blog Posts:** learn about online privacy and follow the latest updates on our products.',
    mediaType: 'text/markdown'
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
  language: [],
  sensitive: false,
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
    return new Response(JSON.stringify({ ...BLOG_ACCOUNT_INFO, published, updated }), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
