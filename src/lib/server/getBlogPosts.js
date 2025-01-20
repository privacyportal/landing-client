import loki from 'lokijs';
import path from 'path';
import crypto from 'crypto';

const db = new loki('Index');
const blogs = db.addCollection('blog', { indices: ['date', 'slug', 'category_slug'] });

const extractDescription = (html) => {
  return html
    .split('</p>')
    .shift()
    .replace(/<\\?[^>]+>/g, '')
    .split(' ', 45)
    .join(' ');
};

export function generateDeterministicId(slug) {
  return crypto.createHash('sha256').update(slug).digest('hex').slice(0, 32);
}

const createPostsIndex = async () => {
  const modules = import.meta.glob('../../routes/\\(app\\)/blog/\\(post\\)/*/+page.md', {
    eager: true
  });

  for (const filepath in modules) {
    const post = modules[filepath];
    const html = post.default.render().html;
    const slug = path.basename(path.parse(filepath).dir);
    blogs.insert({
      id: generateDeterministicId(slug),
      slug,
      ...post.metadata,
      category_slug: post.metadata.category.replaceAll(/\s/g, '-'),
      summary: extractDescription(html),
      duration: Math.round(html.length / 800)
    });
  }

  // sort blogs and update previous and next links
  const sortedPosts = blogs
    .chain()
    .compoundsort([
      ['date', true],
      ['slug', false]
    ])
    .data({ removeMeta: true });
  let next;
  let idx = 0;
  for (const current of sortedPosts) {
    if (next) {
      idx = next.date === current.date ? idx + 1 : 0;
      blogs.findAndUpdate({ slug: next.slug }, (o) => {
        o.prev = { slug: current.slug, title: current.title };
      });
      blogs.findAndUpdate({ slug: current.slug }, (o) => {
        o.next = { slug: next.slug, title: next.title };
        o.idx = idx;
      });
    } else {
      blogs.findAndUpdate({ slug: current.slug }, (o) => {
        o.idx = 0;
      });
    }
    next = current;
  }

  return true;
};

const postIndexPromise = createPostsIndex();

export default async function getBlogPosts() {
  await postIndexPromise;
  return blogs;
}
