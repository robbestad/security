let SALT_LENGTH: number, iterations: number, isDev: boolean;

import crypto from "crypto";
import Bluebird from "bluebird";
import ValidPass from "../validation/password";

let debug = require("debug")("server");
let randomBytes = Bluebird.promisify(crypto.randomBytes);

SALT_LENGTH = 256;
isDev = process.env.NODE_ENV !== "production";
iterations = isDev ? 1e3 : 1e5;

interface IHash {
  hash: string;
  salt: string;
}

function hash(password: string): IHash | undefined {
  if (!ValidPass(password)) return undefined;

  let salt = crypto
    .randomBytes(SALT_LENGTH)
    .toString("hex")
    .slice(0, SALT_LENGTH);
  let hashed = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  if (hashed) {
    return { hash: hashed, salt };
  }
  return undefined;
}

function verify(
  hash: string,
  password: string,
  salt: string
): boolean | undefined {
  if (!ValidPass(password)) return undefined;
  return (
    crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`) ===
    hash
  );
}

export default {
  hash,
  verify,
};
