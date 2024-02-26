import { numberOrDefault } from '$lib/modules/util';
import getBlogPosts from '$lib/server/getBlogPosts';
import { error } from '@sveltejs/kit';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

// https://kit.svelte.dev/docs/page-options#entries used for prerendering all pages

/** @type {import('./$types').EntryGenerator} */
export async function entries() {
  const blogs = await getBlogPosts();
  return blogs.mapReduce(
    (o) => o.category_slug,
    (array) => {
      var result = {};
      var i = array.length >>> 0;
      while (i--) {
        const category = array[i].category_slug;
        if (result[category]) {
          result[category]++;
        } else {
          result[category] = 1;
        }
      }
      return Object.keys(result)
        .map((category) => {
          const pageCount = Math.ceil(result[category] / DEFAULT_PAGE_SIZE);
          return Array.from(new Array(pageCount), (_, i) => ({
            category,
            page: String(i + 1)
          }));
        })
        .flat();
    }
  );
}

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const page = numberOrDefault(Number(params.page) ?? 1, DEFAULT_PAGE);

  try {
    const blogs = await getBlogPosts();
    const pageCount = Math.ceil(blogs.chain().find({ category_slug: params.category }).count() / DEFAULT_PAGE_SIZE);
    const posts = blogs
      .chain()
      .find({ category_slug: params.category })
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
