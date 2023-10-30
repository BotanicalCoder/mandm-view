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

const showSpinner = ref(true);

onBeforeMount(() => {
  showSpinner.value = true;
});

onMounted(() => {
  showSpinner.value = false;
});

const route = useRoute();
const dataStore = useMyAuthDataStore();

watchEffect(() => {
  if (route.query.data) {
    // console.log(route.query);

    dataStore.setDataState(JSON.parse(route.query.data));
  }
});
</script>
