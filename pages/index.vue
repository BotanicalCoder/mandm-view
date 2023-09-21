<template>
  <div>
    <NuxtLayout>
      <template v-slot:header>
        <!-- content for the header slot -->
        <div class="flex items-center">
          <!-- <Icon name="material-symbols:close-rounded" size="20" color="black" /> -->
          <p class="text-gray-800 text-xl font-bold text-center w-full">
            Get Help
          </p>
        </div>
      </template>

      <div
        class="flex flex-row h-full p-4 items-center justify-center gap-4 flex-wrap"
      >
        <card text="Contact Us" link="/contact-us">
          <Icon
            name="material-symbols:connect-without-contact"
            size="90"
            color="#003399"
          />
        </card>

        <!-- <card text="User Manual" link="user-manual">
          <Icon
            name="ic:round-menu-book"
            size="90"
            color="#FF6600"
            class="select-none"
          />
        </card> -->

        <card text="F.A.Q" link="/faq">
          <Icon
            name="streamline:interface-help-question-circle-circle-faq-frame-help-info-mark-more-query-question"
            size="90"
            color="#003399"
          />
        </card>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "#components";
</script>

<style scoped></style>
