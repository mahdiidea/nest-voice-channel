import CryptoJS from 'crypto-js';

export default {
    password: "crypto",
    keySize: 128,
    iterations: 1000,
    key(salt) {
        return CryptoJS.PBKDF2(this.password,
            CryptoJS.enc.Hex.parse(salt),
            {
                keySize: this.keySize / 32,
                iterations: this.iterations
            });
    },
    enc(salt, iv, plainText) {
        let key = this.key(salt);

        let encrypted = CryptoJS.AES.encrypt(plainText, key, {
            iv: CryptoJS.enc.Hex.parse(iv)
        });

        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    },
    dec(salt, iv, cipherText) {
        let key = this.key(salt);

        let cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(cipherText)
        });

        let decrypted = CryptoJS.AES.decrypt(
            cipherParams, key,
            {
                iv: CryptoJS.enc.Hex.parse(iv)
            }
        );

        return decrypted.toString(CryptoJS.enc.Utf8);
    },
    generate() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    encrypt(text, password = "crypto") {
        this.password = password;
        let iv = CryptoJS.lib.WordArray.random(this.keySize / 8).toString(CryptoJS.enc.Hex);
        let salt = CryptoJS.lib.WordArray.random(this.keySize / 8).toString(CryptoJS.enc.Hex);
        return salt + iv + this.enc(salt, iv, text);
    },
    decrypt(text, def = null, password = "crypto") {
      try {
          this.password = password;
          let salt = text.substring(0, 32);
          let iv = text.substring(32, 64);
          let enc = text.substring(64);
          return this.dec(salt, iv, enc);
      }
      catch (ex) {
          return def;
      }
    }
}