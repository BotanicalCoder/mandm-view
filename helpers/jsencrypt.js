import { JSEncrypt } from "jsencrypt";

let encryptInstance;

if (process.client || typeof window !== "undefined") {
  encryptInstance = new JSEncrypt();

  let pubkey = import.meta.env.PUBLIC_KEY ?? "";

  encryptInstance.setPublicKey(pubkey);
}

export default encryptInstance;
