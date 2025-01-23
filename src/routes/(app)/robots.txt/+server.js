import { DEFAULT_RES_HEADERS } from '$lib/modules/constants';

export const prerender = true;

/** @type {import('../$types').RequestHandler} */
export async function GET() {
  const body = [
    'User-Agent: *',
    '  Disallow: /federated/inbox',
    '  Disallow: /federated/publish',
    '  Disallow: /federated/blog/followers',
  ].join('\n');

  return new Response(body, {
    headers: {
      ...DEFAULT_RES_HEADERS,
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
