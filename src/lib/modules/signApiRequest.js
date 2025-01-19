import { env } from '$env/dynamic/private';
import crypto from 'node:crypto';
import { bufferToBase64 } from './util';

const API_AUTHORIZATION_HEADER = 'authorization';
const API_AUTH_HEADER_TYPE = 'PP';
const API_TIMESTAMP_HEADER = 'X-PP-TS';
const ALGORITHM = {
  name: 'HMAC',
  hash: 'SHA-256'
};

const encoder = new TextEncoder();

async function createSignature(params) {
  const { method, url, body, timestamp, secret } = params;

  const items_to_sign = [timestamp, method, url];
  if (body && Object.keys(body).length > 0) items_to_sign.push(body);

  const keyData = encoder.encode(secret);
  const dataToSign = encoder.encode(items_to_sign.join('\n'));

  const key = await crypto.subtle.importKey('raw', keyData, ALGORITHM, false, ['sign']);

  const signature = await crypto.subtle.sign(ALGORITHM.name, key, dataToSign);

  return bufferToBase64(signature, { url: true });
}

export default async function signApiRequest({ method, path, body }) {
  const timestamp = Date.now();

  // create request signature
  const signature = await createSignature({
    method,
    url: path,
    body,
    timestamp,
    secret: env.API_KEY_SECRET
  });

  // create auth header
  return {
    [API_AUTHORIZATION_HEADER]: `${API_AUTH_HEADER_TYPE} ${env.API_KEY_ID}:${signature}`,
    [API_TIMESTAMP_HEADER]: timestamp
  };
}
