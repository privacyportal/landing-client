import { DOMAIN } from '$lib/modules/constants';
import { error } from '@sveltejs/kit';
import path from 'path';

export const prerender = true;

const PAGE_FILTER_REGEX = new RegExp('\\[|\\]|\\.\\.|^$');

const pages = Object.keys(import.meta.glob('../**/+page.{svelte,md}'))
  .map((p) => path.relative('..', path.dirname(p)))
  .filter(page => !PAGE_FILTER_REGEX.test(page))
  .sort((a, b) => {
    if (a.startsWith('blog') && !b.startsWith('blog')) return 1;
    if (!a.startsWith('blog') && b.startsWith('blog')) return -1;
    return a.localeCompare(b, undefined, {sensitivity: 'base'});
  });
console.log(pages);

const headers = {
  'Cache-Control': 'max-age=0, s-maxage=3600',
  'Content-Type': 'application/xml'
};

const createURL = (loc, changefreq = 'always', priority = '1.0') =>
  ['  <url>', `    <loc>${loc}</loc>`, `    <changefreq>${changefreq}</changefreq>`, `    <priority>${priority}</priority>`, '  </url>'].join('\n');

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    const BASE_URL = `https://${DOMAIN}`;

    const body = [
      '<?xml version="1.0" encoding="UTF-8" ?>',
      '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">',
      createURL(BASE_URL),
      ...pages.map((page) => createURL(BASE_URL + '/' + page, 'daily', '0.5')),
      '</urlset>'
    ].join('\n');

    return new Response(body, { headers });
  } catch (err) {
    console.error(err);
    error(404, 'Failed to download image. Please try again later.');
  }
}
