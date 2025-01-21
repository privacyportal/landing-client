import { APUB_BLOG_ACCOUNT } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';
import { _processInboxMessage } from '../../rss/inbox/+server';

export const prerender = false;

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
      accountObj: APUB_BLOG_ACCOUNT
    });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
