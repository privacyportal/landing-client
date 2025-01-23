import { PUBLIC_ACTIVITYPUB_BLOGGER_PUBKEY, PUBLIC_ACTIVITYPUB_GROUP_PUBKEY, PUBLIC_ACTIVITYPUB_MICROBLOGGER_PUBKEY, PUBLIC_APP_ENDPOINT, PUBLIC_DOMAIN } from '$env/static/public';

export {
  PUBLIC_API_URL as API_URL,
  PUBLIC_APP_ENDPOINT as APP_ENDPOINT,
  PUBLIC_CHROME_EXTENSION_URL as CHROME_EXTENSION_URL,
  PUBLIC_DOMAIN as DOMAIN,
  PUBLIC_DOMAIN_ALIAS as DOMAIN_ALIAS,
  PUBLIC_FIREFOX_EXTENSION_URL as FIREFOX_EXTENSION_URL
} from '$env/static/public';

export const SIGNUP_URL = PUBLIC_APP_ENDPOINT + '/signup';
export const WORDPRESS_PLUGIN_URL = 'https://wordpress.org/plugins/privacy-portal-sso';

export const APUB_MICROBLOG_ACCOUNT = {
  IS_MICROBLOGGER: true,
  TYPE: 'Service',
  USERNAME: 'rss',
  NAME: 'Privacy Portal Feed',
  ID: `rss@${PUBLIC_DOMAIN}`,
  PROFILE: `https://${PUBLIC_DOMAIN}/federated/rss`,
  INBOX_URL: `https://${PUBLIC_DOMAIN}/federated/rss/inbox`,
  OUTBOX_URL: `https://${PUBLIC_DOMAIN}/federated/rss/outbox`,
  KEY_ID: `https://${PUBLIC_DOMAIN}/federated/rss#main-key`,
  INBOX_PATH: '/federated/rss/inbox',
  OUTBOX_PATH: '/federated/rss/outbox',
  PRIVKEY_NAME: 'ACTIVITYPUB_MICROBLOGGER_PRIVKEY',
  PUBKEY: PUBLIC_ACTIVITYPUB_MICROBLOGGER_PUBKEY,
  PUBLISHED: Date.UTC(2021, 10, 1)
};

export const APUB_BLOG_ACCOUNT = {
  IS_MICROBLOGGER: false,
  TYPE: 'Person',
  USERNAME: 'publisher',
  NAME: 'Privacy Portal',
  ID: `publisher@${PUBLIC_DOMAIN}`,
  PROFILE: `https://${PUBLIC_DOMAIN}/federated/publisher`,
  INBOX_URL: `https://${PUBLIC_DOMAIN}/federated/publisher/inbox`,
  OUTBOX_URL: `https://${PUBLIC_DOMAIN}/federated/publisher/outbox`,
  KEY_ID: `https://${PUBLIC_DOMAIN}/federated/publisher#main-key`,
  INBOX_PATH: '/federated/publisher/inbox',
  OUTBOX_PATH: '/federated/publisher/outbox',
  PRIVKEY_NAME: 'ACTIVITYPUB_BLOGGER_PRIVKEY',
  PUBKEY: PUBLIC_ACTIVITYPUB_BLOGGER_PUBKEY,
  PUBLISHED: Date.UTC(2021, 10, 1)
};

export const APUB_GROUP = {
  TYPE: 'Group',
  USERNAME: 'blog',
  NAME: 'Privacy Portal Blog',
  ID: `blog@${PUBLIC_DOMAIN}`,
  PROFILE: `https://${PUBLIC_DOMAIN}/federated/blog`,
  INBOX_URL: `https://${PUBLIC_DOMAIN}/federated/blog/inbox`,
  OUTBOX_URL: `https://${PUBLIC_DOMAIN}/federated/blog/outbox`,
  FEATURED_URL: `https://${PUBLIC_DOMAIN}/federated/blog/featured`,
  FOLLOWERS_URL: `https://${PUBLIC_DOMAIN}/federated/blog/followers`,
  ATTRIBUTED_TO_URL: `https://${PUBLIC_DOMAIN}/federated/blog/moderators`,
  KEY_ID: `https://${PUBLIC_DOMAIN}/federated/blog#main-key`,
  INBOX_PATH: '/federated/blog/inbox',
  OUTBOX_PATH: '/federated/blog/outbox',
  PRIVKEY_NAME: 'ACTIVITYPUB_GROUP_PRIVKEY',
  PUBKEY: PUBLIC_ACTIVITYPUB_GROUP_PUBKEY,
  PUBLISHED: Date.UTC(2021, 10, 1)
};

export const DEFAULT_RES_HEADERS = {
  Expires: '0',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate, proxy-revalidate',
  'Content-Type': 'application/json'
};

export const ACTIVITYPUB_REQ_HEADERS = {
  Accept: 'application/activity+json'
};

export const ACTIVITYPUB_RES_HEADERS = {
  ...DEFAULT_RES_HEADERS,
  'Content-Type': 'application/activity+json'
};

export const ACTIVITYPUB_CONTEXTS = {
  ACTIVITY_STREAMS: 'https://www.w3.org/ns/activitystreams',
  W3ID_SECURITY: 'https://w3id.org/security/v1',
  PRIVACY_PORTAL_CONTEXT: `https://${PUBLIC_DOMAIN}/federated/context.json`
};

export const APUB_MSG_CONTEXT = {
  '@context': [ACTIVITYPUB_CONTEXTS.PRIVACY_PORTAL_CONTEXT, ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS]
};

export const UNAUTHORIZED_ERR = 'Unauthorized.';
