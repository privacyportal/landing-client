import { env } from '$env/dynamic/private';
import { signAndSendMessage, verifyRequestSignature } from '$lib/modules/activitypub/apSignatureUtil';
import { storeSetFollow, storeUnsetFollow } from '$lib/modules/activitypub/apStorageUtil';
import { createAcceptMessage, getActivityPubAccount, parseActor, validateFollowMessage, verifyActorWithWebfinger } from '$lib/modules/activitypub/apUtil';
import { ACTIVITYPUB_ACCOUNT, ACTIVITYPUB_CONTEXTS, ACTIVITYPUB_RES_HEADERS, UNAUTHORIZED_ERR } from '$lib/modules/constants';
import { error, isHttpError } from '@sveltejs/kit';

export const prerender = false;

export async function _processInboxMessage({ message, headers, accountObj }) {
  const body = JSON.parse(message);
  console.log({ body });
  const { type, actor, object } = body;

  const context = [body?.['@context']].flat();
  if (!context.includes(ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS)) {
    console.error('Unsupported request "@context".');
    return error(403, 'Unsupported request "@context".');
  }

  const { hostname: domain, username } = await parseActor(actor).catch(() => {});
  if (!domain || !username) {
    console.error('"actor" param invalid.');
    return error(403, '"actor" param invalid.');
  }

  switch (type) {
    case 'Follow': {
      if (!validateFollowMessage(body, { object: accountObj.PROFILE })) {
        console.error('Follow message invalid.');
        return error(403, 'Follow message invalid.');
      }
      break;
    }
    case 'Undo': {
      if (!validateFollowMessage(object, { actor, object: accountObj.PROFILE })) {
        console.error('Undo message invalid.');
        return error(403, 'Undo message invalid.');
      }
      break;
    }
    default: {
      console.error('Unsupported message "type".');
      return error(403, 'Unsupported message "type".');
    }
  }

  // validate url
  const isActorValid = await verifyActorWithWebfinger({ actor, domain, username });
  if (!isActorValid) {
    console.error('"actor" param invalid.');
    return error(403, '"actor" param invalid.');
  }

  // get actor account
  const actorAccount = await getActivityPubAccount(actor).catch(() => null);
  if (!actorAccount) {
    console.error('"actor" param invalid.');
    return error(403, '"actor" param invalid.');
  }

  // check signature
  const actorPubkey = actorAccount?.publicKey?.publicKeyPem;
  if (!actorPubkey) {
    console.error(UNAUTHORIZED_ERR);
    return error(401, UNAUTHORIZED_ERR);
  }

  const isSignatureVerified = await verifyRequestSignature({
    inbox: accountObj.INBOX_URL,
    message,
    headers,
    actor,
    actorPubkey
  }).catch(() => false);
  if (!isSignatureVerified) {
    console.error(UNAUTHORIZED_ERR);
    return error(401, UNAUTHORIZED_ERR);
  }

  const inbox = actorAccount?.inbox;
  if (!inbox) {
    console.error('inbox not found.');
    return error(400, 'inbox not found.');
  }

  if (type === 'Follow') {
    // handle follow
    const shared_inbox = actorAccount?.endpoints?.sharedInbox;
    if (!shared_inbox) {
      console.error('shared inbox not found.');
      return error(400, 'shared inbox not found.');
    }
    await storeSetFollow({ account_username: accountObj.USERNAME, domain, username, inbox, shared_inbox });
  } else {
    // handle undo follow
    await storeUnsetFollow({ account_username: accountObj.USERNAME, follower: `${username}@${domain}` });
  }

  // send accept message
  const acceptMessage = createAcceptMessage({ messageBody: body, actor: accountObj.PROFILE });
  setTimeout(async () => {
    await signAndSendMessage({
      message: acceptMessage,
      inbox,
      actor: accountObj.PROFILE,
      privkey: accountObj.TYPE === 'Group' ? env.ACTIVITYPUB_GROUP_PRIVKEY : env.ACTIVITYPUB_USER_PRIVKEY
    }).catch(console.error);
  }, 1000);

  return new Response(JSON.stringify({ message: 'Data received successfully' }), {
    status: 200,
    headers: ACTIVITYPUB_RES_HEADERS
  });
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    if (request.headers.get('Content-Type') !== 'application/activity+json') {
      console.error('Page not found.');
      return error(404, 'Page not found.');
    }

    return await _processInboxMessage({
      message: await request.text(),
      headers: request.headers,
      accountObj: ACTIVITYPUB_ACCOUNT
    });
  } catch (err) {
    if (isHttpError(err)) throw err;
    console.error(err);
    error(400, 'Unexpected error.');
  }
}
