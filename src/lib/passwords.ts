import crypto from "crypto";

const ALGO = "scrypt"; // marker for format identification
const KEYLEN = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16);
  const derivedKey: Buffer = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, KEYLEN, {N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024}, (err, dk) => {
      if (err) return reject(err);
      resolve(dk as Buffer);
    });
  });
  return [ALGO, salt.toString("base64"), derivedKey.toString("base64")].join(":");
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, saltB64, hashB64] = stored.split(":");
  if (algo !== ALGO || !saltB64 || !hashB64) return false;
  const salt = Buffer.from(saltB64, "base64");
  const expected = Buffer.from(hashB64, "base64");
  const derived: Buffer = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, expected.length, {N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024}, (err, dk) => {
      if (err) return reject(err);
      resolve(dk as Buffer);
    });
  });
  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

