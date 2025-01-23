import { createBlogPost } from '$lib/modules/activitypub/apRssUtil';
import { ACTIVITYPUB_RES_HEADERS, APUB_MSG_CONTEXT } from '$lib/modules/constants';
import getBlogPosts from '$lib/server/getBlogPosts';
import { error, isHttpError } from '@sveltejs/kit';

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const blogs = await getBlogPosts();
  return blogs
    .chain()
    .simplesort('date', true)
    .data({ removeMeta: true })
    .map(({ id }) => ({ post_id: id }));
}

export const prerender = true;

/** @type {import('../$types').RequestHandler} */
export async function GET({ params }) {
  try {
    const blogs = await getBlogPosts();
    const postMetadata = blogs.findOne({ id: params.post_id });
    if (!postMetadata) return error(404, 'page not found.');
    const post = {
      ...APUB_MSG_CONTEXT,
      ...createBlogPost(postMetadata)
    };
    return new Response(JSON.stringify(post), { headers: ACTIVITYPUB_RES_HEADERS });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
