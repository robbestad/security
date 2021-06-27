import HashFnc from "./hashing/hashing";
import EncryptionFnc from "./encryption/encryption";
import EmailValidation from "./validation/email";
import PasswordValidation from "./validation/password";

export const Hash = HashFnc.hash;
export const Verify = HashFnc.verify;
export const Encrypt = EncryptionFnc.encrypt;
export const Decrypt = EncryptionFnc.decrypt;
export const ValidateEmail = EmailValidation;
export const ValidatePassword = PasswordValidation;
