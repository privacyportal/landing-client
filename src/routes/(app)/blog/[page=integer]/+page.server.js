import { numberOrDefault } from '$lib/modules/util';
import getBlogPosts from '$lib/server/getBlogPosts';
import { error } from '@sveltejs/kit';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

// https://kit.svelte.dev/docs/page-options#entries used for prerendering all pages

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const blogs = await getBlogPosts();
  const pageCount = Math.ceil(blogs.count() / DEFAULT_PAGE_SIZE);
  return Array.from(new Array(pageCount), (_, i) => ({ page: String(i + 1) }));
}

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const page = numberOrDefault(Number(params.page) ?? 1, DEFAULT_PAGE);

  try {
    const blogs = await getBlogPosts();
    const pageCount = Math.ceil(blogs.count() / DEFAULT_PAGE_SIZE);
    const posts = blogs
      .chain()
      .compoundsort([
        ['date', true],
        ['slug', false]
      ])
      .offset((page - 1) * DEFAULT_PAGE_SIZE)
      .limit(DEFAULT_PAGE_SIZE)
      .data({ removeMeta: true });

    return { posts, pageCount };
  } catch (err) {
    console.error(err);
    error(404, 'Posts not found');
  }
}
