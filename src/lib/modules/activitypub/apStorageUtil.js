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

export async function storeSetFollow({ domain, username, inbox, shared_inbox }) {
  const method = 'POST';
  const path = `/activity-pub/followers/new`;
  const body = JSON.stringify({ domain, username, inbox, shared_inbox });

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

export async function storeUnsetFollow({ account }) {
  const id = getStorageKey(account);

  const method = 'DELETE';
  const path = `/activity-pub/followers/${id}`;
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...DEFAULT_HEADERS,
      ...(await signApiRequest({ method, path }))
    }
  });

  if (!response.ok) throw new Error(UNFOLLOW_ERROR_MSG);
}

export async function storeGetFollowers(page = 1) {
  const method = 'GET';
  const path = `/activity-pub/followers?page=${page}`;

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

export async function* storeFollowersIterator() {
  let page = 1;
  let next = true;

  while (next) {
    const { shared_inboxes, meta } = await storeGetFollowers(page);
    next = meta.next;
    for (const inbox of shared_inboxes) {
      yield inbox;
    }
  }
}
