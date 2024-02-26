import { DOMAIN } from '$lib/modules/constants';
import { error } from '@sveltejs/kit';
import path from 'path';

export const prerender = true;

const pages = Object.keys(import.meta.glob('../*/+page.svelte')).map((p) => path.basename(path.dirname(p)));
const posts = Object.keys(import.meta.glob('../blog/\\(post\\)/*/+page.md')).map((p) => path.basename(path.dirname(p)));

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
      ...posts.map((post) => createURL(BASE_URL + '/blog/' + post, 'daily', '0.5')),
      '</urlset>'
    ].join('\n');

    return new Response(body, { headers });
  } catch (err) {
    console.error(err);
    error(404, 'Failed to download image. Please try again later.');
  }
}
