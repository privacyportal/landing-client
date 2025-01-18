import crypto from 'node:crypto';
import { DOMAIN, UNAUTHORIZED_ERR } from '../constants';

const DIGEST_ALGORITHMS = ['SHA-256', 'SHA-1', 'sha256', 'sha1'];
const IS_QUOTED_STRING_REGEX = new RegExp('^".*"$');

function getInboxFragment(inbox) {
  const { pathname } = new URL(inbox);
  return pathname;
}

export function signMessage({ message, inbox, actor, privkey }) {
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

  console.log({ stringToSign });
  const signer = crypto.createSign('sha256');
  signer.update(stringToSign);
  signer.end();
  const signature = signer.sign(privkey, 'base64');
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
  const { body, sigHeaders } = signMessage({ message, inbox, actor, privkey });
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

export async function verifyRequestSignature({ inbox, request, actor, actorPubkey }) {
  try {
    const message = await request.text();

    const hostHeader = request.headers.get('Host');
    const dateHeader = request.headers.get('Date');
    const digestHeader = request.headers.get('Digest');
    const signatureHeader = request.headers.get('Signature');
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
    console.log({ message, digest, digestValue });
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
        }
      })
      .join('\n');

    console.log({ signedString });
    // verify the signature
    const verifier = crypto.createVerify('sha256');
    verifier.write(signedString);
    verifier.end();

    console.log({ actorPubkey, signature: signatureParts.signature });
    return verifier.verify(actorPubkey, signatureParts.signature, 'base64');
  } catch (err) {
    console.error(err);
    throw new Error(UNAUTHORIZED_ERR);
  }
}
