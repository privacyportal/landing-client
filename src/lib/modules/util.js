export const numberOrDefault = (number, defaultValue) => (Number.isNaN(number) ? defaultValue : number);

export const capitalize = (input) => input[0].toUpperCase() + input.substring(1);

export function bufferToBase64(buffer, { url } = { url: false }) {
  const result = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
  return url ? base64ToBase64Url(result) : result;
}

export function base64ToBase64Url(input) {
  return input.replace(/\//g, '_').replace(/\+/g, '-').replace(/=+$/, '');
}
