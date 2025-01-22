import { ACTIVITYPUB_CONTEXTS, DEFAULT_RES_HEADERS } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = true;

const CONTEXT = {
  "@context": [
    ACTIVITYPUB_CONTEXTS.W3ID_SECURITY,
    {
      as: `${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#`,
      toot: 'http://joinmastodon.org/ns#',
      lemmy: 'https://join-lemmy.org/ns#',
      pt: 'https://joinpeertube.org/ns#',
      sc: 'http://schema.org/',
      commentsEnabled: 'pt:commentsEnabled',
      sensitive: 'as:sensitive',
      Hashtag: 'as:Hashtag',
      postingRestrictedToMods: 'lemmy:postingRestrictedToMods',
      removeData: 'lemmy:removeData',
      stickied: 'lemmy:stickied',
      discoverable: 'toot:discoverable',
      moderators: {
        type: '@id',
        id: 'lemmy:moderators'
      },
      expires: 'as:endTime',
      distinguished: 'lemmy:distinguished',
      language: 'sc:inLanguage',
      identifier: 'sc:identifier'
    }
  ]
};

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    return new Response(JSON.stringify(CONTEXT), { headers: DEFAULT_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
