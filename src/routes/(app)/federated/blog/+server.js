import { publishedUpdatedDates } from '$lib/modules/activitypub/apRssUtil';
import config from '$lib/modules/config';
import { ACTIVITYPUB_CONTEXTS, ACTIVITYPUB_GROUP, ACTIVITYPUB_RES_HEADERS } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

const { image } = config.meta;

const BLOG_ACCOUNT_INFO = {
  '@context': [ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS, ACTIVITYPUB_CONTEXTS.W3ID_SECURITY],
  id: ACTIVITYPUB_GROUP.PROFILE,
  type: ACTIVITYPUB_GROUP.TYPE,
  name: ACTIVITYPUB_GROUP.NAME,
  preferredUsername: ACTIVITYPUB_GROUP.USERNAME,
  inbox: ACTIVITYPUB_GROUP.INBOX_URL,
  outbox: ACTIVITYPUB_GROUP.OUTBOX_URL,
  featured: ACTIVITYPUB_GROUP.FEATURED_URL,
  attributedTo: ACTIVITYPUB_GROUP.ATTRIBUTED_TO_URL,
  postingRestrictedToMods: true,
  publicKey: {
    id: `${ACTIVITYPUB_GROUP.PROFILE}#main-key`,
    owner: ACTIVITYPUB_GROUP.PROFILE,
    publicKeyPem: ACTIVITYPUB_GROUP.PUBKEY
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
  sensitive: false
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
    return new Response(JSON.stringify({ ...BLOG_ACCOUNT_INFO, ...publishDates }), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
