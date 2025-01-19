import { env } from '$env/dynamic/private';
import { signAndSendMessage, verifyRequestSignature } from '$lib/modules/activitypub/apSignatureUtil';
import { storeSetFollow, storeUnsetFollow } from '$lib/modules/activitypub/apStorageUtil';
import { generateGUID, getActivityPubAccount, parseActor } from '$lib/modules/activitypub/apUtil';
import { ACTIVITYPUB_ACCOUNT, ACTIVITYPUB_CONTEXTS, ACTIVITYPUB_RES_HEADERS, DOMAIN, UNAUTHORIZED_ERR } from '$lib/modules/constants';
import { error } from '@sveltejs/kit';

export const prerender = false;

async function verifyActor({ actor, domain, username }) {
  try {
    // lookup the user using webfinger and verify that it exists
    const response = await fetch(`https://${domain}/.well-known/webfinger?resource=acct:${username}@${domain}`);
    if (!response.ok) return false;

    // Parse the JSON response
    const { subject, links } = await response.json();
    if (subject !== `acct:${username}@${domain}` || !links.some((l) => l?.rel === 'self' && l?.href === actor)) return false;
    return true;
  } catch {
    // do nothing
  }
  return false;
}

function validateFollowMessage(message, opts) {
  if (message?.type !== 'Follow') return false;
  if (!message?.actor || typeof message.actor !== 'string') return false;
  if (opts.actor && message?.actor !== opts.actor) return false;
  if (!message?.object || typeof message.object !== 'string') return false;
  if (opts.object && message?.object !== opts.object) return false;
  return true;
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    if (request.headers.get('Content-Type') !== 'application/activity+json') {
      console.error('Page not found.');
      return error(404, 'Page not found.');
    }

    const body = await request.json();
    console.log({ body });
    const { type, actor, object } = body;

    const context = [ body?.['@context'] ].flat();
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
        if (!validateFollowMessage(body, { object: ACTIVITYPUB_ACCOUNT.PROFILE })) {
          console.error('Follow message invalid.');
          return error(403, 'Follow message invalid.');
        }
        break;
      }
      case 'Undo': {
        if (!validateFollowMessage(object, { actor, object: ACTIVITYPUB_ACCOUNT.PROFILE })) {
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
    const isActorValid = await verifyActor({ actor, domain, username });
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
      inbox: ACTIVITYPUB_ACCOUNT.INBOX_URL,
      request,
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
      await storeSetFollow({ domain, username, inbox, shared_inbox });
    } else {
      // handle undo follow
      await storeUnsetFollow({ account: `${username}@${domain}` });
    }

    // send accept message
    const acceptMessage = createAcceptMessage(body);
    await signAndSendMessage({
      message: acceptMessage,
      inbox,
      actor: ACTIVITYPUB_ACCOUNT.PROFILE,
      privkey: env.ACTIVITYPUB_PRIVKEY
    });

    return new Response(JSON.stringify({ message: 'Data received successfully' }), {
      status: 200,
      headers: ACTIVITYPUB_RES_HEADERS
    });
  } catch (err) {
    console.error(err);
    error(400, 'Unexpected error.');
  }
}

function createAcceptMessage(messageBody) {
  // eslint-disable-next-line no-unused-vars
  const { ['@context']: _, ...object } = messageBody;

  return {
    '@context': [ACTIVITYPUB_CONTEXTS.ACTIVITY_STREAMS, ACTIVITYPUB_CONTEXTS.W3ID_SECURITY],
    id: `https://${DOMAIN}/${generateGUID()}`,
    type: 'Accept',
    actor: ACTIVITYPUB_ACCOUNT.PROFILE,
    object
  };
}
