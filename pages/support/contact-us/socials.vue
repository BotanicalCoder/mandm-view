<template>
  <div>
    <NuxtLayout name="support">
      <template #header>
        <!-- content for the header slot -->
        <div class="flex items-center">
          <Icon name="material-symbols:arrow-back-ios" size="20" color="white" @click="goBack" class="cursor-pointer" />
          <p class="text-white text-xl font-bold text-center w-full">
            Our Social Media Handles
          </p>
        </div>
      </template>

      <template #body>
        <div class="flex flex-row h-full p-4 items-center justify-start gap-4 flex-wrap">
          <!-- <card text="@kolomoniagent" link="">
            <Icon name="skill-icons:instagram" size="60" color="#003399" />
          </card> -->

          <!-- <card text="@kolomoniagent" link="#">
            <Icon name="skill-icons:twitter" size="60" color="#003399" />
          </card> -->

          <!-- <card text="09132623643" link="#">
            <Icon name="logos:whatsapp-icon" size="60" color="#003399" />
          </card> -->

          <card text="@mormonee" link="#">
            <Icon name="logos:facebook" size="60" color="#003399" />
          </card>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import { useRouter } from "#vue-router";
const $router = useRouter();
const goBack = () => $router.back();
</script>

<style scoped></style>
