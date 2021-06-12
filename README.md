# @svenanders/security

* Encrypt and Decrypt
Provide `ENCRYPTION_KEY` through env.
```
import {Encrypt, Decrypt} from "@svenanders/security"
Encrypt(text_to_encrypt) // -> returns encrypted text
Verify(encryped_text) // -> returns original text
```

* Hash and Verify
Uses `pbkdf2Sync` and `sha512`
```
import {Hash, Verify} from "@svenanders/security"
Hash(input_password) // -> {hash, salt} (to be stored in db)
Verify(hash, input_password, salt) // -> true if input_password can be verified
```

* Email validation

```
import {ValidateEmail} from "@svenanders/security"
ValidateEmail(email) // -> true if email validates
```
