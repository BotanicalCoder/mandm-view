import CryptoJS from "crypto-js";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      encryptKey: (keyString: string, ivString: string, payload: string) => {
        // console.log(payload.replaceAll(/[\r\n]+/g, ""));
        // console.log(payload.split(" "));
        // console.log(payload.split("", ""));

        var key = CryptoJS.enc.Base64.parse(
          "ZG1zNFdGVVF1VEduZj83M3Q3WnEqP31dISx3UXtpYGg="
        );

        var iv = CryptoJS.enc.Base64.parse("TkdITEJSTEg0Q0tYMVFERA==");

        var encrypted = CryptoJS.AES.encrypt(payload, key, { iv: iv });

        return encrypted.toString();
      },

      decryptKey: (data: string) => {
        var rawData = CryptoJS.enc.Base64.parse(data);
        var key = CryptoJS.enc.Base64.parse(
          "ZG1zNFdGVVF1VEduZj83M3Q3WnEqP31dISx3UXtpYGg="
        );
        var iv = CryptoJS.enc.Base64.parse("TkdITEJSTEg0Q0tYMVFERA==");

        var plaintextData = CryptoJS.AES.decrypt({ ciphertext: rawData }, key, {
          iv: iv,
        });

        var plaintext = plaintextData.toString(CryptoJS.enc.Latin1);

        return plaintext;
      },
    },
  };
});
