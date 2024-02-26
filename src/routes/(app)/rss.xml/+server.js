import config from '$lib/modules/config';
import getBlogPosts from '$lib/server/getBlogPosts';
import { error } from '@sveltejs/kit';

export const prerender = true;

const { site_name, title, description, image } = config.meta;

const headers = {
  'Cache-Control': 'max-age=0, s-maxage=3600',
  'Content-Type': 'application/xml'
};

function createRSSItem(params) {
  return [
    '    <item>',
    `      <title>${params.title}</title>`,
    `      <description>${params.description}</description>`,
    `      <link>https://${site_name}/blog/${params.slug}</link>`,
    `      <pubDate>${new Date(Date.UTC(...params.date.split('-')))}</pubDate>`,
    ...[params.category, ...(params.tags || [])].map((tag) => `      <category term="${tag}" />`),
    `      <media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${image}"/>`,
    '    </item>'
  ].join('\n');
}

async function createRSS() {
  const blogs = await getBlogPosts();
  const posts = blogs.chain().simplesort('date', true).data({ removeMeta: true });

  return [
    '<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">',
    '  <channel>',
    `    <title>${title}</title>`,
    `    <link>https://${site_name}</link>`,
    `    <description>${description}</description>`,
    ...posts.map((postMetadata) => createRSSItem(postMetadata)),
    '  </channel>',
    '</rss>'
  ].join('\n');
}

const rss_promise = createRSS();

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    const body = await rss_promise;
    return new Response(body, { headers });
  } catch (err) {
    console.error(err);
    error(404, 'Failed to download image. Please try again later.');
  }
}
