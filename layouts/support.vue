<template>
  <div
    class="h-full lg:max-h-[40rem] lg:max-w-[50rem] lg:my-12 mx-auto"
    v-if="!showSpinner"
  >
    <div class="border-b border-b-gray-600 bg-[#003399]">
      <div class="p-4">
        <slot name="header"></slot>
      </div>
    </div>
    <slot name="body"></slot>
  </div>
  <template v-else>
    <div class="w-full h-screen flex items-center justify-center">
      <Icon name="line-md:loading-twotone-loop" size="90" />
    </div>
  </template>
</template>

<script setup>
// import { ref, onBeforeMount, onMounted } from "vue";

const showSpinner = ref(true);

onBeforeMount(() => {
  showSpinner.value = true;
});

onMounted(() => {
  showSpinner.value = false;
});

import { useMyAuthDataStore } from "../stores/authData.ts";
const route = useRoute();
const dataStore = useMyAuthDataStore();

// watchEffect(() => {
//   if (route.query.data) {
//     dataStore.setDataState(JSON.parse(route.query.data));
//   }
// });
</script>
