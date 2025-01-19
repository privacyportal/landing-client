import crypto from 'node:crypto';
import { DOMAIN, UNAUTHORIZED_ERR } from '../constants';

const DIGEST_ALGORITHMS = ['SHA-256', 'SHA-1', 'sha256', 'sha1'];
const IS_QUOTED_STRING_REGEX = new RegExp('^".*"$');

const SIGNING_ALG = {
  name: "RSASSA-PKCS1-v1_5",
  hash: "SHA-256"
}

function getInboxFragment(inbox) {
  const { pathname } = new URL(inbox);
  return pathname;
}

export async function signMessage({ message, inbox, actor, privkey }) {
  const requestBody = JSON.stringify(message);

  // digest
  const digest = crypto.createHash('sha256').update(requestBody).digest('base64');
  const digestHeader = `SHA-256=${digest}`;

  // date
  const date = new Date();
  const dateHeader = date.toUTCString();

  // host
  const { hostname: hostHeader } = new URL(inbox);

  // signature
  const stringToSign = [`(request-target): post ${getInboxFragment(inbox)}`, `host: ${hostHeader}`, `date: ${dateHeader}`, `digest: ${digestHeader}`].join('\n');

  const signature = await signData(stringToSign, privkey);
  const algorithm = 'rsa-sha256';
  const signatureHeader = [`keyId="${actor}"`, `algorithm="${algorithm}"`, 'headers="(request-target) host date digest"', `signature="${signature}"`].join(',');

  return {
    body: requestBody,
    headers: {
      Host: hostHeader,
      Date: dateHeader,
      Digest: digestHeader,
      Signature: signatureHeader
    }
  };
}

export async function signAndSendMessage({ message, inbox, actor, privkey }) {
  const { body, sigHeaders } = await signMessage({ message, inbox, actor, privkey });
  const response = await fetch(inbox, {
    method: 'POST',
    headers: {
      Accept: 'application/activity+json',
      'Content-Type': 'application/activity+json',
      ...sigHeaders
    },
    body
  });

  if (!response.ok) throw new Error('Sending failed');
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
      !signatureParts.algorithm.toLowerCase().includes('sha256') // we only support sha256 when signing
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

function pemToBuffer(pem) {
  return Buffer.from(
    pem.replace(/(?:-----(?:BEGIN|END) (?:PUBLIC|PRIVATE) KEY-----|\r?\n)/g, ''),
    "base64"
  );
}

async function importPubKey(pem) {
  return await crypto.subtle.importKey("spki", pemToBuffer(pem), SIGNING_ALG, true, ["verify"]);
}

async function importPrivKey(pem) {
  return await crypto.subtle.importKey("pkcs8", pemToBuffer(pem), SIGNING_ALG, false, ["sign"]);
}

async function verifySignature(signedString, pubkeyPEM, signature) {
  return await crypto.subtle.verify(
    // algorithm
    { name: SIGNING_ALG.name },

    // public key as CryptoKey
    await importPubKey(pubkeyPEM),

    // signature as Uint8Array
    Buffer.from(signature, "base64"),

    // encoded data
    (new TextEncoder()).encode(signedString)
  );
}

async function signData (stringToSign, privkeyPEM) {
  const signature = await crypto.subtle.sign(
    // algorithm
    { name: SIGNING_ALG.name },

    // private key as CryptoKey
    await importPrivKey(privkeyPEM),

    // encoded data
    (new TextEncoder()).encode(stringToSign)
  );

  return Buffer.from(signature).toString("base64");
}