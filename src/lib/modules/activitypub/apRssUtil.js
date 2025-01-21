import config from '$lib/modules/config';
import getBlogPosts, { generateDeterministicId } from '$lib/server/getBlogPosts';
import { ACTIVITYPUB_CONTEXTS, APUB_BLOG_ACCOUNT, APUB_GROUP, APUB_MICROBLOG_ACCOUNT } from '../constants';
import { capitalize } from '../util';

const { site_name } = config.meta;

export function formatPublishDate(postMetadata) {
  const [pubYear, pubMonth, pubDay] = postMetadata.date.split('-');
  return new Date(Date.UTC(pubYear, pubMonth - 1, pubDay)).toISOString().slice(0, -5) + 'Z';
}

// should only be used in prerendered routes
export async function publishedUpdatedDates() {
  const blogs = await getBlogPosts();
  const lastPost = blogs.chain().simplesort('date', true).limit(1).data({ removeMeta: true }).pop();
  const firstPost = blogs.chain().simplesort('date', false).limit(1).data({ removeMeta: true }).pop();
  return {
    published: formatPublishDate(firstPost),
    updated: formatPublishDate(lastPost)
  };
}

export function createBlogPost(postMetadata) {
  const postUrl = `${APUB_BLOG_ACCOUNT.PROFILE}/statuses/${postMetadata.id}`;
  const published = formatPublishDate(postMetadata);

  const content = [`<h1>${postMetadata.title}</h1>`, `<p>${postMetadata.description}</p>`].join('\n\n');

  return {
    id: `${postUrl}/activity`,
    type: 'Create',
    actor: APUB_BLOG_ACCOUNT.PROFILE,
    to: [`${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#Public`],
    cc: [APUB_GROUP.PROFILE],
    audience: APUB_GROUP.PROFILE,
    object: {
      type: 'Page',
      id: postUrl,
      attributedTo: APUB_BLOG_ACCOUNT.PROFILE,
      to: [APUB_GROUP.PROFILE, `${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#Public`],
      cc: [],
      name: postMetadata.title,
      content,
      mediaType: 'text/html',
      attachment: [
        {
          href: `https://${site_name}/blog/${postMetadata.slug}`,
          mediaType: 'text/html; charset="utf-8"',
          type: 'Link'
        }
      ],
      ...(postMetadata?.image && {
        image: {
          type: 'Image',
          url: `https://${site_name}${postMetadata.image}`
        }
      }),
      commentsEnabled: false,
      sensitive: false,
      published: published,
      language: {
        identifier: 'en',
        name: 'English'
      },
      audience: APUB_GROUP.PROFILE,
      tag: [
        {
          type: 'Hashtag',
          href: `https://${site_name}/blog/${postMetadata.category_slug}/1`,
          name: `#${postMetadata.category_slug.split('-').map(capitalize).join('')}`
        }
      ]
    }
  };
}

export function createMicroblogPost(postMetadata) {
  const postUrl = `${APUB_MICROBLOG_ACCOUNT.PROFILE}/statuses/${postMetadata.id}`;
  const published = formatPublishDate(postMetadata);
  const content = [
    `<h1>${postMetadata.title}</h1>`,
    `<p>${postMetadata.description}</p>`,
    `<a href="https://${site_name}/blog/${postMetadata.slug}">https://${site_name}/blog/${postMetadata.slug}</a>`
  ].join('\n\n');

  return {
    id: `${postUrl}/activity`,
    type: 'Create',
    actor: APUB_MICROBLOG_ACCOUNT.PROFILE,
    published,
    to: [`${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#Public`],
    cc: [`${APUB_MICROBLOG_ACCOUNT.PROFILE}/followers`],
    object: {
      id: postUrl,
      type: 'Note',
      summary: null,
      inReplyTo: null,
      published,
      attributedTo: APUB_MICROBLOG_ACCOUNT.PROFILE,
      to: [`${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#Public`],
      cc: [`${APUB_MICROBLOG_ACCOUNT.PROFILE}/followers`],
      sensitive: false,
      content,
      attachment: [
        ...(postMetadata?.image
          ? [
              {
                type: 'Document',
                mediaType: 'image/png',
                url: `https://${site_name}${postMetadata.image}`,
                name: null
              }
            ]
          : [])
      ],
      tag: [
        {
          type: 'Hashtag',
          href: `https://${site_name}/blog/${postMetadata.category_slug}/1`,
          name: `#${postMetadata.category_slug.split('-').map(capitalize).join('')}`
        }
      ]
    }
  };
}

function createAnnounce(postMetadata) {
  const announceId = generateDeterministicId(`${postMetadata.slug}/announce`);
  return {
    id: `${APUB_GROUP.PROFILE}/activities/announce/${announceId}`,
    type: 'Announce',
    actor: APUB_GROUP.PROFILE,
    to: [`${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#Public`],
    cc: [`${APUB_GROUP.PROFILE}/followers`],
    object: createBlogPost(postMetadata)
  };
}

// should only be used in prerendered routes
export async function createOutboxItems(accountObj, maxItems) {
  const blogs = await getBlogPosts();
  const posts = blogs.chain().simplesort('date', true).limit(maxItems).data({ removeMeta: true });

  return {
    '@context': ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS,
    id: accountObj.OUTBOX_URL,
    type: 'OrderedCollection',
    orderedItems: posts.map((postMetadata) => {
      if (accountObj.TYPE === 'Group') return createAnnounce(postMetadata);
      return accountObj.IS_MICROBLOGGER ? createMicroblogPost(postMetadata) : createBlogPost(postMetadata);
    }),
    totalItems: posts.length
  };
}
