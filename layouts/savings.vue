<template>
  <div
    v-if="!showSpinner"
    class="min-h-screen h-full lg:max-h-[40rem] lg:max-w-[50rem] lg:my-12 mx-auto bg-[#F2F2F2]"
  >
    <slot />
  </div>

  <template v-else>
    <div class="w-full h-screen flex items-center justify-center">
      <Icon name="line-md:loading-twotone-loop" size="90" />
    </div>
  </template>
</template>
<script setup>
import { useMyAuthDataStore } from "../stores/authData.ts";
import { encryptInstance } from "../plugins/js-encrypt.client.js";

const config = useRuntimeConfig();

// set the private key for decrypting the data
// encryptInstance.setPublicKey(config.public.TEST_PUBLIC_KEY);
// encryptInstance.setPrivateKey(config.public.TEST_PRIVATE_KEY);

// const { $decrypt, $encrypt } = useNuxtApp();
const { $decryptKey, $encryptKey } = useNuxtApp();

const showSpinner = ref(true);

onBeforeMount(() => {
  showSpinner.value = true;
});

onMounted(() => {
  showSpinner.value = false;

  // const encrypted = $encrypt("Test Encryption");

  // console.log("encrypted", encrypted);

  // let uncrypted = $decrypt( "bRpeG/SiVza9KD4H7EfPrK8bZ8yLTaRabZ7K1wgtSzXcOi/EL6dyV1h0bMhHXZzhZcTvOpi+IhMbpJGyzNfarc9JA1MjHeTILOg8h/li5TpfcnPretcxwWexWTxbobdbQ6qbw7gfaSTyDCe2deAj8/0BjmxM+vBTSz9Tv2XIbDV2fzXxiQdOowrWdW2RfTDM74lU8IFSk7P5sntjwUJ0bIOO1Fodql19hYq0cJGBS2LVQg+Kp5X21lo/wRk6FWD3ZWD8wT2VoGO7NNhHR4Eh33cwskGgUqZXVEWB3Zjqbtcjt2R4AD7+gLTw5YMbvuRIWxXPAoQRXmeG3IAEn86o+Q==" );

  // let uncrypted = $decrypt(encrypted);

  // console.log(uncrypted);

  // if (route.query.data) {
  //   dataStore.setDataState(JSON.parse(route.query.data));
  // }

  // Access the variable from Android
  // if (window.Android && window.Android.getVariable) {
  //   let androidVariable = window.Android.getVariable();

  //   console.log(androidVariable);
  // } else {
  //   console.error("Android interface or method not available.");
  // }
});

const route = useRoute();
const dataStore = useMyAuthDataStore();

const { $fetchToken } = useNuxtApp();

watchEffect(() => {
  // let enc = $encryptKey(
  //   undefined,
  //   undefined,
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5Mzk3NDAyLCJpYXQiOjE2OTkzMTEwMDIsImp0aSI6IjYzYTQzYTU2OTc1YTQxMjRiMGJmNzBjOGQ1Njg5NmY5IiwidXNlcl9pZCI6InNhbnh5bmV0IiwidXNlciI6eyJuaWNrbmFtZSI6IlNhbnh5bmV0IiwicGhvbmVfbnVtYmVyIjoiKzIzNDgxMDYwNzY5NDUiLCJmdWxsX25hbWUiOiJTYW54eW5ldCIsInVzZXJuYW1lIjoic2FueHluZXQiLCJhdmF0YXIiOiJodHRwczovL3NseWRvLWFzc2V0cy5zMy5hbWF6b25hd3MuY29tL3N0YXRpYy9pbWFnZXMvVXNlcl9BdmF0YXIucG5nIiwicXJfY29kZSI6Imh0dHA6Ly9jZG4uc2x5ZG8uY28uZ2xvYmFsLnByb2QuZmFzdGx5Lm5ldC9tZWRpYS9jdXN0b21lci9xci1jb2RlL2VmM2UwNDlmLThmNmYtNDBhYy05NDA5LTI0ZGJiMzkxMGZiYi5wbmciLCJ1dWlkIjoiYTQwYjIwY2MtYjAwMy00YmVhLWE4YmQtODhmMWViMjZmYzVmIiwiZGVmYXVsdF9jdXJyZW5jeSI6Ik5HTiIsImFjY291bnRfdHlwZSI6IkJ1c2luZXNzIiwidHlwZSI6IkJ1c2luZXNzIiwicHJvZmlsZSI6eyJuaWNrbmFtZSI6IlNhbnh5bmV0Iiwid2FsbHBhcGVyIjoiIiwiYWRkcmVzcyI6bnVsbCwiYmlvIjpudWxsLCJjb250YWN0IjpudWxsLCJvcGVuaW5nX2hvdXJzIjpudWxsfSwiY29udmVyc2F0aW9uX2lkIjoiIiwicmF0aW5nIjowLjAsImJpbyI6bnVsbCwiaXNfdmVyaWZpZWQiOmZhbHNlLCJjaGF0X3dhbGxwYXBlciI6IiIsIndhbGxwYXBlciI6IiIsImRhdGVfam9pbmVkIjoiMjAyMy0wMS0zMFQxNjoyNDowOS44OTUwMDBaIiwiZm9sbG93ZXJzIjo0LCJmb2xsb3dpbmciOjcsInByb2ZpbGVfbWVudSI6eyJpZCI6IjU1ZDUxNmMwLTM2YjQtNDcwZi1hNDU0LWUyOWVmOTY1YjJkNCIsInByb2R1Y3QiOnRydWUsInNlcnZpY2UiOmZhbHNlLCJibG9nIjpmYWxzZSwieWFybiI6dHJ1ZSwibW9tZW50Ijp0cnVlLCJjaGFubmVscyI6ZmFsc2UsInJldmlld3MiOnRydWUsIm9wZW5pbmdfaG91cnMiOnRydWUsIm9yZGVyaW5nIjpbInByb2R1Y3QiLCJ5YXJuIiwibW9tZW50Iiwic2VydmljZSIsImJsb2ciLCJjaGFubmVscyJdLCJwcm9kdWN0X2xhYmVsIjoiRm9sYSIsInNlcnZpY2VfbGFiZWwiOiJTZXJ2aWNlcyIsImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTE5VDE2OjA4OjUwLjcyODI2OVoiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wOC0yMFQxNDowMzo0My4yOTEzOThaIn0sIndhbGxldCI6eyJhY2NvdW50X251bWJlciI6IjUwMzAwMDAwNTQiLCJmaW5hbmNpYWxfaW5zdGl0dXRpb24iOnsibmFtZSI6IkJhbmtseSBNRkIiLCJjb3VudHJ5IjoiTmlnZXJpYSIsImxvZ28iOiJodHRwczovL3NseWRvLWFzc2V0cy5zMy5hbWF6b25hd3MuY29tL21lZGlhL2ZpbmFuY2lhbF9pbnN0aXR1dGlvbi9CYW5rbHktSWNvbi0xNTB4MTUwLmpwZyJ9LCJhY2NvdW50X3RpZXIiOnsidGllcl90eXBlIjoiMSIsImRhaWx5X2N1bXVsYXRpdmVfdHJhbnNhY3Rpb25fbGltaXQiOiI1MDAwMCIsImN1bXVsYXRpdmVfYmFsYW5jZSI6IjMwMDAwMCJ9LCJhY2NvdW50X25hbWUiOiJGb2xhaGFuIFl1c3VmIiwiY3VzdG9tZXJfdXNlcm5hbWUiOiJzYW54eW5ldCIsImlzX2FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZF9hdCI6IjIwMjMtMDMtMDZUMjM6Mzc6MjguMDc3MDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTA0LTIyVDE4OjM1OjI4LjQ1NTk5NVoiLCJub3RlIjpudWxsfX0sImlzcyI6IlNseWRvIn0.ne_tvYnn8XE6BVh5lRp1dQO2Gic3E1OSOSDyCxQS1so"
  // );
  // console.log(enc);
  // console.log(route.query.data);
  // Decode the parameter in JavaScript
  // var decodedMessage = decodeURIComponent(route.query.data);
  // console.log(decodedMessage);
  // $decryptKey(decodedMessage);
  // console.log(decodedMessage.split("\n").join(" "));
  // console.log($decryptKey(decodedMessage.split("\n").join(" ")));
  // console.log($decryptKey(decodedMessage));
  // console.log(decodedMessage);
  // console.log($decryptKey(decodedMessage));
  //   console.log($decryptKey(route.query.data));
  //   console.log(
  //     "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
  //   );
  //   console.log(route.query.data.replaceAll(/[\r\n]+/g, ""));
  // console.log($decryptKey(route.query.data.replaceAll(/[\r\n]+/g, "")));
  //   console.log(
  //     "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
  //   );
  //   console.log(route.query.data.replaceAll(" ", ""));
  //   console.log("aaaaaaaaaaaahhhhhhhbbbbbhhhhhhhhhhhhhhbbbb");
  //   console.log($decryptKey(route.query.data.replaceAll(/[\r\n]+/g, "")));
  //   // dataStore.setDataState($decryptKey(route.query.data));
  // if (!route.query.data) {
  //   console.log("logging");
  //   // console.log();
  //   // console.log(route.query.data.replace(/ /g, ""));
  //   // console.log(route.query.data);
  //   // // console.log(route.query.data.replaceAll(" ", ""));
  // const encrytedKey = $encryptKey(
  //   undefined,
  //   undefined,
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5Mzk3NDAyLCJpYXQiOjE2OTkzMTEwMDIsImp0aSI6IjYzYTQzYTU2OTc1YTQxMjRiMGJmNzBjOGQ1Njg5NmY5IiwidXNlcl9pZCI6InNhbnh5bmV0IiwidXNlciI6eyJuaWNrbmFtZSI6IlNhbnh5bmV0IiwicGhvbmVfbnVtYmVyIjoiKzIzNDgxMDYwNzY5NDUiLCJmdWxsX25hbWUiOiJTYW54eW5ldCIsInVzZXJuYW1lIjoic2FueHluZXQiLCJhdmF0YXIiOiJodHRwczovL3NseWRvLWFzc2V0cy5zMy5hbWF6b25hd3MuY29tL3N0YXRpYy9pbWFnZXMvVXNlcl9BdmF0YXIucG5nIiwicXJfY29kZSI6Imh0dHA6Ly9jZG4uc2x5ZG8uY28uZ2xvYmFsLnByb2QuZmFzdGx5Lm5ldC9tZWRpYS9jdXN0b21lci9xci1jb2RlL2VmM2UwNDlmLThmNmYtNDBhYy05NDA5LTI0ZGJiMzkxMGZiYi5wbmciLCJ1dWlkIjoiYTQwYjIwY2MtYjAwMy00YmVhLWE4YmQtODhmMWViMjZmYzVmIiwiZGVmYXVsdF9jdXJyZW5jeSI6Ik5HTiIsImFjY291bnRfdHlwZSI6IkJ1c2luZXNzIiwidHlwZSI6IkJ1c2luZXNzIiwicHJvZmlsZSI6eyJuaWNrbmFtZSI6IlNhbnh5bmV0Iiwid2FsbHBhcGVyIjoiIiwiYWRkcmVzcyI6bnVsbCwiYmlvIjpudWxsLCJjb250YWN0IjpudWxsLCJvcGVuaW5nX2hvdXJzIjpudWxsfSwiY29udmVyc2F0aW9uX2lkIjoiIiwicmF0aW5nIjowLjAsImJpbyI6bnVsbCwiaXNfdmVyaWZpZWQiOmZhbHNlLCJjaGF0X3dhbGxwYXBlciI6IiIsIndhbGxwYXBlciI6IiIsImRhdGVfam9pbmVkIjoiMjAyMy0wMS0zMFQxNjoyNDowOS44OTUwMDBaIiwiZm9sbG93ZXJzIjo0LCJmb2xsb3dpbmciOjcsInByb2ZpbGVfbWVudSI6eyJpZCI6IjU1ZDUxNmMwLTM2YjQtNDcwZi1hNDU0LWUyOWVmOTY1YjJkNCIsInByb2R1Y3QiOnRydWUsInNlcnZpY2UiOmZhbHNlLCJibG9nIjpmYWxzZSwieWFybiI6dHJ1ZSwibW9tZW50Ijp0cnVlLCJjaGFubmVscyI6ZmFsc2UsInJldmlld3MiOnRydWUsIm9wZW5pbmdfaG91cnMiOnRydWUsIm9yZGVyaW5nIjpbInByb2R1Y3QiLCJ5YXJuIiwibW9tZW50Iiwic2VydmljZSIsImJsb2ciLCJjaGFubmVscyJdLCJwcm9kdWN0X2xhYmVsIjoiRm9sYSIsInNlcnZpY2VfbGFiZWwiOiJTZXJ2aWNlcyIsImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTE5VDE2OjA4OjUwLjcyODI2OVoiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wOC0yMFQxNDowMzo0My4yOTEzOThaIn0sIndhbGxldCI6eyJhY2NvdW50X251bWJlciI6IjUwMzAwMDAwNTQiLCJmaW5hbmNpYWxfaW5zdGl0dXRpb24iOnsibmFtZSI6IkJhbmtseSBNRkIiLCJjb3VudHJ5IjoiTmlnZXJpYSIsImxvZ28iOiJodHRwczovL3NseWRvLWFzc2V0cy5zMy5hbWF6b25hd3MuY29tL21lZGlhL2ZpbmFuY2lhbF9pbnN0aXR1dGlvbi9CYW5rbHktSWNvbi0xNTB4MTUwLmpwZyJ9LCJhY2NvdW50X3RpZXIiOnsidGllcl90eXBlIjoiMSIsImRhaWx5X2N1bXVsYXRpdmVfdHJhbnNhY3Rpb25fbGltaXQiOiI1MDAwMCIsImN1bXVsYXRpdmVfYmFsYW5jZSI6IjMwMDAwMCJ9LCJhY2NvdW50X25hbWUiOiJGb2xhaGFuIFl1c3VmIiwiY3VzdG9tZXJfdXNlcm5hbWUiOiJzYW54eW5ldCIsImlzX2FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZF9hdCI6IjIwMjMtMDMtMDZUMjM6Mzc6MjguMDc3MDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTA0LTIyVDE4OjM1OjI4LjQ1NTk5NVoiLCJub3RlIjpudWxsfX0sImlzcyI6IlNseWRvIn0.ne_tvYnn8XE6BVh5lRp1dQO2Gic3E1OSOSDyCxQS1so"
  // );

  // console.log("encrytedKey", encrytedKey);

  //   // console.log("decrypted", $decryptKey(encrytedKey));
  console.log(
    "decrypted",
    $decryptKey(route.query.data.replace(/-/g, "+").replace(/_/g, "/"))
  );
  // dataStore.setDataState($decryptKey(route.query.data));
  // }

  dataStore.setDataState(
    $decryptKey(route.query.data.replace(/-/g, "+").replace(/_/g, "/"))
  );
});

// onMounted(() => {
//   // const encrypted = $encrypt("Test Encryption");

//   // console.log("encrypted", encrypted);

//   let uncrypted = $decrypt(
//     "AxeM12Eqx7YxydKVWw767wHHlvB5MU2xT8vhXbAmPDoQDTFBNx7/ZQyL1HG5e2j7yA3bQf26149QILVKcDN2MbuSItQ6DnEtVO6PpfSLOIY+WJbkkOq0VtPslZAgxMlSGEyeSlakH+1w1kQGjZg9eWzShmnJlYbJTwUz/p7amvE3hxmKBs9+Bl+4t2Dkt3joA1R0RQ2mjkX9KtaAB1NDwboAosQNyeqS29/rkvq2a8aTEKAbPVFVF2RFDkcVtFcGxVxhDnz4vtJ+1P774mkeZAfyA7Ga3XMCwp2Ftj+mo6a6XFikGksUxTemql3lg06B8rtuekPHXnd9bnJNCYEgtw=="
//   );

//   // let uncrypted = $decrypt(encrypted);

//   console.log(uncrypted);

//   if (route.query.data) {
//     dataStore.setDataState(JSON.parse(route.query.data));
//   }
// });
</script>
