import config from '$lib/modules/config';
import getBlogPosts from '$lib/server/getBlogPosts';
import crypto from 'crypto';
import { ACTIVITYPUB_ACCOUNT, ACTIVITYPUB_CONTEXTS, ACTIVITYPUB_GROUP } from '../constants';
import { capitalize } from '../util';

const { site_name, image } = config.meta;

function generateDeterministicId(slug) {
  return crypto.createHash('sha256').update(slug).digest('hex').slice(0, 32);
}

export function formatPublishDate(postMetadata) {
  const [pubYear, pubMonth, pubDay] = postMetadata.date.split('-');
  return new Date(Date.UTC(pubYear, pubMonth - 1, pubDay)).toISOString().slice(0, -5) + 'Z';
}

export async function publishedUpdatedDates() {
  const blogs = await getBlogPosts();
  const lastPost = blogs.chain().simplesort('date', true).limit(1).data({ removeMeta: true }).pop();
  const firstPost = blogs.chain().simplesort('date', false).limit(1).data({ removeMeta: true }).pop();
  return {
    published: formatPublishDate(firstPost),
    updated: formatPublishDate(lastPost)
  };
}

function createPost(postMetadata) {
  const postId = generateDeterministicId(postMetadata.slug);
  const postUrl = `${ACTIVITYPUB_ACCOUNT.PROFILE}/statuses/${postId}`;
  const published = formatPublishDate(postMetadata);
  const content = [
    `<h1>${postMetadata.title}</h1>`,
    `<p>${postMetadata.description}</p>`,
    `<a href="https://${site_name}/blog/${postMetadata.slug}">https://${site_name}/blog/${postMetadata.slug}</a>`
  ].join('\n\n');

  return {
    id: `${postUrl}/activity`,
    type: 'Create',
    actor: ACTIVITYPUB_ACCOUNT.PROFILE,
    published,
    to: [`${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#Public`],
    cc: [`${ACTIVITYPUB_ACCOUNT.PROFILE}/followers`],
    object: {
      id: postUrl,
      type: 'Note',
      summary: null,
      inReplyTo: null,
      published,
      attributedTo: ACTIVITYPUB_ACCOUNT.PROFILE,
      to: [`${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#Public`],
      cc: [`${ACTIVITYPUB_ACCOUNT.PROFILE}/followers`],
      sensitive: false,
      content,
      attachment: [
        {
          type: 'Document',
          mediaType: 'image/png',
          url: image,
          name: null
        }
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
    id: `${ACTIVITYPUB_GROUP.PROFILE}/activity/${announceId}/announce`,
    type: 'Announce',
    actor: ACTIVITYPUB_GROUP.PROFILE,
    to: [`${ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS}#Public`],
    cc: [`${ACTIVITYPUB_GROUP.PROFILE}/followers`],
    object: createPost(postMetadata)
  };
}

export async function createOutboxItems(accountObj, maxItems) {
  const blogs = await getBlogPosts();
  const posts = blogs.chain().simplesort('date', true).limit(maxItems).data({ removeMeta: true });

  return {
    '@context': ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS,
    id: accountObj.OUTBOX_URL,
    type: 'OrderedCollection',
    orderedItems: posts.map((postMetadata) => {
      return accountObj.TYPE === 'Group' ? createAnnounce(postMetadata) : createPost(postMetadata);
    }),
    totalItems: posts.length
  };
}
