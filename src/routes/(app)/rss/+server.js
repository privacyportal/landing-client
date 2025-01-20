export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  return new Response(null, {
    status: 302,
    headers: {
      location: '/federated/rss'
    }
  });
}
