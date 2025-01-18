import { PUBLIC_ACTIVITYPUB_PUBKEY, PUBLIC_APP_ENDPOINT, PUBLIC_DOMAIN } from '$env/static/public';

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

export const ACTIVITYPUB_ACCOUNT = {
  USERNAME: 'rss',
  ID: `rss@${PUBLIC_DOMAIN}`,
  PROFILE: `https://${PUBLIC_DOMAIN}/rss`,
  INBOX_URL: `https://${PUBLIC_DOMAIN}/rss/inbox`,
  OUTBOX_URL: `https://${PUBLIC_DOMAIN}/rss/outbox`,
  INBOX_PATH: '/rss/inbox',
  PUBKEY: PUBLIC_ACTIVITYPUB_PUBKEY
};

export const DEFAULT_RES_HEADERS = {
  Expires: '0',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate, proxy-revalidate',
  'Content-Type': 'application/activity+json'
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
  W3ID_SECURITY: 'https://w3id.org/security/v1'
};

export const UNAUTHORIZED_ERR = 'Unauthorized.';
