import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import { DOMAIN } from './constants';

export async function authorize(request) {
  const [type, token] = (request.headers.get('Authentication') || '').split(' ', 2);
  if (type !== 'Bearer' || !token) throw new Error('token missing.');
  return jwt.verify(token, env.JWT_AP_PUBLISH_SECRET, {
    issuer: `https://${DOMAIN}`,
    audience: `https://${DOMAIN}`,
    algorithms: ['HS256']
  });
}
