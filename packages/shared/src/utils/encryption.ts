import crypto from 'crypto';

const { CRYPTO_HASH_SALT = '' } = process.env;

if (!CRYPTO_HASH_SALT) {
  throw new Error('CRYPTO_HASH_SALT is undefined.');
}

// TODO: replace to generated type
export type CryptoHashPayload = {
  hash: string;
  salt: string;
};

const createHash = (text: string, salt: string): string =>
  crypto
    .createHash('sha256')
    .update(text + salt)
    .digest('hex');

export const createTextHash = (
  text: string,
  salt: string
): string =>
  createHash(createHash(text, salt), CRYPTO_HASH_SALT);

export const isCorrectTextHash = (
  text: string,
  { hash, salt }: CryptoHashPayload
): boolean => createTextHash(text, salt) === hash;

export const generateRandomString = (length = 64): string =>
  crypto.randomBytes(length).toString('hex');
