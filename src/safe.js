import { encodeKey } from 'hkufui/config';
import CryptoJS from 'crypto-js';

export const decrypt = (ciphertext) => {
  ciphertext = ciphertext
    .replace(/xff0b/g, '+')
    .replace(/x2215/g, '/')
    .replace(/x003d/g, '=');
  const bytes = CryptoJS.AES.decrypt(ciphertext, encodeKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export const encrypt = (plainobj) => {
  let plaintext = JSON.stringify(plainobj);
  /* replace special character */
  let ciphertext = CryptoJS.AES.encrypt(plaintext, encodeKey).toString();
  return ciphertext
    .replace(/\+/g, 'xff0b')
    .replace(/\//g, 'x2215')
    .replace(/=+$/, 'x003d');
}
