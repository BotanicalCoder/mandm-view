<template>
  <div>
    <NuxtLayout>
      <template v-slot:header>
        <!-- content for the header slot -->
        <div class="flex items-center">
          <!-- <Icon name="material-symbols:close-rounded" size="20" color="black" /> -->
          <p class="text-white text-xl font-bold text-center w-full">
            Get Help
          </p>
        </div>
      </template>

      <div
        class="flex flex-row h-full p-4 items-center justify-center gap-4 flex-wrap"
      >
        <card text="Contact Us" link="/support/contact-us">
          <Icon
            name="material-symbols:connect-without-contact"
            size="50"
            color="#003399"
          />
        </card>

        <card text="F.A.Q" link="/support/faq">
          <Icon
            name="streamline:interface-help-question-circle-circle-faq-frame-help-info-mark-more-query-question"
            size="50"
            color="#003399"
          />
        </card>

        <card text="User Manual" link="/support/user-manual">
          <Icon
            name="ic:round-menu-book"
            size="50"
            color="#003399"
            class="select-none"
          />
        </card>

        <card text="T & C" link="/support/tnc">
          <Icon
            name="solar:book-line-duotone"
            size="50"
            color="#003399"
            class="select-none"
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
