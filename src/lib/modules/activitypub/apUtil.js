import crypto from 'node:crypto';
import { ACTIVITYPUB_CONTEXTS, ACTIVITYPUB_REQ_HEADERS, DEFAULT_REQ_HEADERS, DOMAIN } from '../constants';

const STATUS_ID_REGEX = new RegExp('^[0-9a-fA-F]{32}$');

export function generateGUID() {
  return crypto.randomBytes(16).toString('hex');
}

export function getStorageKey(username, followerAccount) {
  return crypto.createHash('sha256').update(`${username}:${followerAccount}`).digest('hex').substring(0, 12);
}

export async function parseActor(actor) {
  try {
    const { protocol, hostname, pathname, search, username, password } = new URL(actor);
    if (protocol !== 'https:' || !hostname || !pathname || !!search || !!username || !!password) return {};

    const user = pathname.split('/').pop();
    if (!user) return {};

    return { hostname, username: user };
  } catch {
    // do nothing
  }
  return {};
}

export async function getActivityPubAccount(accountUrl) {
  const response = await fetch(accountUrl, { headers: ACTIVITYPUB_REQ_HEADERS });
  if (!response.ok) throw new Error('unable to fetch account');
  return response.json();
}

export function messageContent(message) {
  const { ['@context']: _, ...content } = message;
  return content;
}

export function createAcceptMessage({ messageBody, actor }) {
  // eslint-disable-next-line no-unused-vars
  const { ['@context']: _, ...object } = messageBody;

  if (object?.to) delete object.to;
  if (object?.object?.to) delete object.object.to;

  return {
    '@context': [ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS, ACTIVITYPUB_CONTEXTS.W3ID_SECURITY],
    id: `https://${DOMAIN}/${generateGUID()}`,
    type: 'Accept',
    actor,
    object
  };
}

export async function verifyActorWithWebfinger({ actor, domain, username }) {
  try {
    // lookup the user using webfinger and verify that it exists
    const url = `https://${domain}/.well-known/webfinger?resource=acct:${username}@${domain}`;
    const response = await fetch(url, { headers: DEFAULT_REQ_HEADERS });
    if (!response.ok) {
      console.error('webfinger response:', {
        url,
        status:
        response.status, res: await response.text().catch(() => '')
      });
      return false;
    }

    // Parse the JSON response
    const { subject, links } = await response.json();
    if (subject !== `acct:${username}@${domain}` || !links.some((l) => l?.rel === 'self' && l?.href === actor)) {
      console.error('webfinger response:', { url, subject, links });
      return false;
    }
    return true;
  } catch {
    // do nothing
  }
  return false;
}

export function validateFollowMessage(message, opts) {
  if (message?.type !== 'Follow') return false;
  if (!message?.actor || typeof message.actor !== 'string') return false;
  if (opts.actor && message?.actor !== opts.actor) return false;
  if (!message?.object || typeof message.object !== 'string') return false;
  if (opts.object && message?.object !== opts.object) return false;
  return true;
}

export function validateStatusId(input) {
  return STATUS_ID_REGEX.test(input);
}
