<template>
  <div>
    <NuxtLayout name="support">
      <template #header>
        <!-- content for the header slot -->
        <div class="flex items-center">
          <Icon
            name="material-symbols:arrow-back-ios"
            size="20"
            color="white"
            @click="goBack"
            class="cursor-pointer"
          />
          <p class="text-white text-xl font-bold text-center w-full">
            User Manual
          </p>
        </div>
      </template>

      <template #body>
        <div class="mt-[5rem] flex items-center justify-center">
          <h2 class="text-4xl"> Coming soon </h2>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const $router = useRouter();
const goBack = () => $router.back();
</script>

<style scoped></style>
