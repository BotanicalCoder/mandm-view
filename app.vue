<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { encryptInstance } from "../plugins/js-encrypt.client.js";
// import { stringToHex } from "./helpers/hexToString";

const config = useRuntimeConfig();

// encryptInstance.setPrivateKey(config.public.PRIVATE_KEY);
</script>
