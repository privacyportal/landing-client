import { API_URL } from '../constants';
import signApiRequest from '../signApiRequest';
import { getStorageKey } from './apUtil';

const FOLLOW_ERROR_MSG = 'Unable to add follower.';
const UNFOLLOW_ERROR_MSG = 'Unable to remove follower.';
const FOLLOWERS_ERROR_MSG = 'Unable to fetch followers.';
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export async function storeSetFollow({ account_username, domain, username, inbox, shared_inbox, message }) {
  const method = 'POST';
  const path = `/activity-pub/accounts/${account_username}/followers/new`;
  const body = JSON.stringify({ domain, username, inbox, shared_inbox, ...(message && { message }) });

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...DEFAULT_HEADERS,
      ...(await signApiRequest({ method, path, body }))
    },
    body
  });

  if (!response.ok) throw new Error(FOLLOW_ERROR_MSG);
}

export async function storeUnsetFollow({ account_username, follower, message }) {
  const id = getStorageKey(account_username, follower);

  const method = 'DELETE';
  const path = `/activity-pub/followers/${id}`;
  const body = message ? { message } : undefined;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...DEFAULT_HEADERS,
      ...(await signApiRequest({ method, path, ...(body && { body }) }))
    },
    ...(body && { body })
  });

  if (!response.ok) throw new Error(UNFOLLOW_ERROR_MSG);
}

export async function storeGetFollowers(account_username, page = 1) {
  const method = 'GET';
  const path = `/activity-pub/accounts/${account_username}/followers?page=${page}`;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...DEFAULT_HEADERS,
      ...(await signApiRequest({ method, path }))
    }
  });

  if (!response.ok) throw new Error(FOLLOWERS_ERROR_MSG);
  return response.json();
}

export async function* storeFollowersIterator(account_username) {
  let page = 1;
  let next = true;

  while (next) {
    const { shared_inboxes, meta } = await storeGetFollowers(account_username, page);
    next = meta.next;
    for (const inbox of shared_inboxes) {
      yield inbox;
    }
  }
}

export async function storeGetFollowerCount(account_username) {
  const method = 'GET';
  const path = `/activity-pub/accounts/${account_username}/followers?count_only=true`;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...DEFAULT_HEADERS,
      ...(await signApiRequest({ method, path }))
    }
  });

  if (!response.ok) throw new Error(FOLLOWERS_ERROR_MSG);
  return response.json();
}
