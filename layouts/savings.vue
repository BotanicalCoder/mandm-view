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

const { $decryptKey, $encryptKey } = useNuxtApp();
const route = useRoute();
const dataStore = useMyAuthDataStore();

const showSpinner = ref(true);

onBeforeMount(() => {
  showSpinner.value = true;
});

onMounted(() => {
  showSpinner.value = false;
});

watchEffect(() => {
  dataStore.setDataState(
    JSON.parse(
      $decryptKey(route.query.data.replace(/-/g, "+").replace(/_/g, "/"))
    )
  );
});
</script>
