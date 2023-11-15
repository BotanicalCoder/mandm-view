import { JSEncrypt } from "jsencrypt";

export const encryptInstance = new JSEncrypt();

const encryptPayload = (payload) => {
  // console.log(payload);
  console.log(encryptInstance.encrypt(payload));

  return encryptInstance.encrypt(payload);
};

const decryptPayload = (payload) => {
  // console.log(payload);
  return encryptInstance.decrypt(payload);
};

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.provide("encrypt", (p) => encryptPayload(p));

  return {
    provide: {
      encrypt: (p) => encryptPayload(p),
      decrypt: (p) => decryptPayload(p),
    },
  };
});
