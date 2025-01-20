import { ACTIVITYPUB_GROUP } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';
import { _processInboxMessage } from '../../rss/inbox/+server';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    if (request.headers.get('Content-Type') !== 'application/activity+json') {
      console.error('Page not found.');
      return error(404, 'Page not found.');
    }

    return await _processInboxMessage({
      message: await request.text(),
      headers: request.headers,
      accountObj: ACTIVITYPUB_GROUP
    });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
