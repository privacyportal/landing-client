import loki from 'lokijs';
import path from 'path';

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

const createPostsIndex = async () => {
  const modules = import.meta.glob('../../routes/\\(app\\)/blog/\\(post\\)/*/+page.md', {
    eager: true
  });

  for (const filepath in modules) {
    const post = modules[filepath];
    const html = post.default.render().html;
    blogs.insert({
      slug: path.basename(path.parse(filepath).dir),
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
  for (const current of sortedPosts) {
    if (next) {
      blogs.findAndUpdate({ slug: next.slug }, (o) => {
        o.prev = { slug: current.slug, title: current.title };
      });
      blogs.findAndUpdate({ slug: current.slug }, (o) => {
        o.next = { slug: next.slug, title: next.title };
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
