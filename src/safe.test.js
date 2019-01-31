import { encrypt, decrypt } from './safe';

describe('Test encrypt-decrypt integrity', () => {
  const o = { test: 'test' };

  it('outputs the same', () => {
    expect(decrypt(encrypt(o))).toEqual(o);
  });
});
