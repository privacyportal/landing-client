import getBlogPosts from '$lib/server/getBlogPosts';
import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const slug = url.pathname.split('/').pop();

  const blogs = await getBlogPosts();
  const post = blogs.findOne({ slug }, true);

  try {
    return post;
  } catch (err) {
    console.error(err);
    error(404, 'Post not found');
  }
}
