var crypto, SALT_LENGTH, iterations, validPass, isDev, randomBytes, debug;

crypto = require("crypto");
debug = require("debug")("server");
Promise = require("bluebird");
randomBytes = Promise.promisify(crypto.randomBytes);

validPass = require("../validation/password");
SALT_LENGTH = 256;
isDev = process.env.NODE_ENV !== "production";
iterations = isDev ? 10 : 1e5;

function hash(password) {
  if (!validPass(password)) return undefined;

  let salt = crypto
    .randomBytes(SALT_LENGTH)
    .toString("hex")
    .slice(0, SALT_LENGTH);
  hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  if (hash) {
    return { hash, salt };
  }
  return undefined;
}

function verify(hash, password, salt) {
  if (!validPass(password)) return undefined;
  return (
    crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`) ===
    hash
  );
}

module.exports = { hash, verify };
