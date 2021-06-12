var crypto, ENCRYPTION_KEY, IV_LENGTH;

crypto = require("crypto");
ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY ||
  "e0597dd73bc2703212a665a13360b046f1ebaf39203a104df0dfe69066faeac5".match(
    /.{1,32}/g
  )[0]; // Must be 256 bits (32 characters)
IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    new Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  let textParts = text.split(":");
  let iv = new Buffer.from(textParts.shift(), "hex");
  let encryptedText = new Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    new Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = { decrypt, encrypt };
