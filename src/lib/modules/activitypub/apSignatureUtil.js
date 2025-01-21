import crypto from 'node:crypto';
import { BufferSourceConverter, Convert } from 'pvtsutils';
import { DOMAIN, UNAUTHORIZED_ERR } from '../constants';

const DIGEST_ALGORITHMS = ['SHA-256', 'SHA-1', 'sha256', 'sha1'];
const IS_QUOTED_STRING_REGEX = new RegExp('^".*"$');

const SIGNING_ALG = {
  name: 'RSASSA-PKCS1-v1_5',
  hash: 'SHA-256'
};

function getInboxFragment(inbox) {
  const { pathname } = new URL(inbox);
  return pathname;
}

export async function signMessage({ message, inbox, keyInfo }) {
  const requestBody = typeof message === 'string' ? message : JSON.stringify(message);

  // content-type
  const contentTypeHeader = 'application/activity+json';

  // digest
  const digest = crypto.createHash('sha256').update(requestBody).digest('base64');
  const digestHeader = `SHA-256=${digest}`;

  // date
  const date = new Date();
  const dateHeader = date.toUTCString();

  // host
  const { hostname: hostHeader } = new URL(inbox);

  // signature
  const stringToSign = [`(request-target): post ${getInboxFragment(inbox)}`, `content-type: ${contentTypeHeader}`, `date: ${dateHeader}`, `digest: ${digestHeader}`, `host: ${hostHeader}`].join('\n');

  const signature = await signData(stringToSign, keyInfo.private);
  const algorithm = 'hs2019';
  const signatureHeader = [`keyId="${keyInfo.id}"`, `algorithm="${algorithm}"`, 'headers="(request-target) content-type date digest host"', `signature="${signature}"`].join(',');

  return {
    body: requestBody,
    headers: {
      'Content-Type': contentTypeHeader,
      Host: hostHeader,
      Date: dateHeader,
      Digest: digestHeader,
      Signature: signatureHeader
    }
  };
}

export async function signAndSendMessage({ message, inbox, keyInfo }) {
  const { body, headers: sigHeaders } = await signMessage({ message, inbox, keyInfo });
  console.log({ inbox, body, headers: { Accept: 'application/activity+json', ...sigHeaders } });

  const response = await fetch(inbox, {
    method: 'POST',
    headers: {
      Accept: 'application/activity+json',
      ...sigHeaders
    },
    body
  });

  if (!response.ok) {
    console.error(`Sending failed [${response.status}]:`, await response.text());
  }
}

export async function verifyRequestSignature({ inbox, message, headers, actor, actorPubkey }) {
  try {
    const hostHeader = headers.get('Host');
    const dateHeader = headers.get('Date');
    const digestHeader = headers.get('Digest');
    const contentTypeHeader = headers.get('Content-Type');
    const signatureHeader = headers.get('Signature');
    if (!hostHeader || !dateHeader || !digestHeader || !signatureHeader) throw new Error(UNAUTHORIZED_ERR);

    // verify signature header
    // Format: `keyId="https://<domain>/u/<name>",algorithm="<algorithm>",headers="(request-target) host date digest",signature="<signature_b64>"`
    const signatureParts = Object.fromEntries(
      signatureHeader.split(',').map((kv) => {
        const separatorIndex = kv.indexOf('=');
        const k = kv.substring(0, separatorIndex);
        const v = kv.substring(separatorIndex + 1);
        return IS_QUOTED_STRING_REGEX.test(v) ? [k, v.slice(1, -1)] : [k, v];
      })
    );

    // ensure all parts of the signature header are present
    if (
      !signatureParts?.keyId ||
      !signatureParts?.algorithm ||
      !signatureParts?.headers ||
      !signatureParts?.signature ||
      !signatureParts.keyId.startsWith(actor) || // ensure the keyId matches the actor
      (!signatureParts.algorithm.toLowerCase().includes('sha256') && // we support sha256 when signing
        signatureParts.algorithm !== 'hs2019')
    )
      throw new Error(UNAUTHORIZED_ERR);

    // validate host
    if (hostHeader !== DOMAIN) throw new Error(UNAUTHORIZED_ERR);

    // validate date
    const requestTimestamp = new Date(dateHeader).getTime();
    if (isNaN(requestTimestamp) || Math.abs(Date.now() - requestTimestamp) > 300000) throw new Error(UNAUTHORIZED_ERR);

    // validate digest
    const separatorIndex = digestHeader.indexOf('=');
    const digestAlg = digestHeader.substring(0, separatorIndex);
    const digestValue = digestHeader.substring(separatorIndex + 1);
    if (!digestValue || !DIGEST_ALGORITHMS.includes(digestAlg)) throw new Error(UNAUTHORIZED_ERR);
    const digest = crypto.createHash(digestAlg.replace('-', '')).update(message).digest('base64');
    if (digest !== digestValue) throw new Error(UNAUTHORIZED_ERR);

    const signedString = signatureParts.headers
      .split(' ')
      .map((type) => {
        switch (type) {
          case '(request-target)':
            return `${type}: post ${getInboxFragment(inbox)}`;
          case 'host':
            return `${type}: ${hostHeader}`;
          case 'date':
            return `${type}: ${dateHeader}`;
          case 'digest':
            return `${type}: ${digestHeader}`;
          case 'content-type':
            return `${type}: ${contentTypeHeader}`;
        }
      })
      .join('\n');

    // verify the signature
    return await verifySignature(signedString, actorPubkey, signatureParts.signature);
  } catch (err) {
    console.error(err);
    throw new Error(UNAUTHORIZED_ERR);
  }
}

function bufferFromBase64(data) {
  return BufferSourceConverter.toArrayBuffer(Convert.FromBase64(data));
}

function pemToBuffer(pem) {
  return bufferFromBase64(pem.replace(/(?:-----(?:BEGIN|END) (?:PUBLIC|PRIVATE) KEY-----|\r?\n)/g, ''));
}

async function importPubKey(pem) {
  return await crypto.subtle.importKey('spki', pemToBuffer(pem), SIGNING_ALG, true, ['verify']);
}

async function importPrivKey(pem) {
  return await crypto.subtle.importKey('pkcs8', pemToBuffer(pem), SIGNING_ALG, false, ['sign']);
}

async function verifySignature(signedString, pubkeyPEM, signature) {
  return await crypto.subtle.verify(
    // algorithm
    { name: SIGNING_ALG.name },

    // public key as CryptoKey
    await importPubKey(pubkeyPEM),

    // signature as Uint8Array

    bufferFromBase64(signature),

    // encoded data
    new TextEncoder().encode(signedString)
  );
}

async function signData(stringToSign, privkeyPEM) {
  const signature = await crypto.subtle.sign(
    // algorithm
    { name: SIGNING_ALG.name },

    // private key as CryptoKey
    await importPrivKey(privkeyPEM),

    // encoded data
    new TextEncoder().encode(stringToSign)
  );

  return Convert.ToBase64(signature);
}
