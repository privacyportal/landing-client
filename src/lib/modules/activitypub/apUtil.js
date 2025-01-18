import crypto from 'node:crypto';
import { ACTIVITYPUB_REQ_HEADERS } from '../constants';

export function generateGUID() {
  crypto.randomBytes(16).toString('hex');
}

export function getStorageKey(account) {
  return crypto.createHash('sha256').update(account).digest('hex').substring(0, 12);
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
