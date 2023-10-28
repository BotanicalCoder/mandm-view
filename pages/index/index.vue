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
            class="cursor-pointer"
            @click="goBack"
          />
          <p class="text-white text-xl font-bold text-center w-full">
            Get Help
          </p>
        </div>
      </template>
      <template #body>
        <div>
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
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "#components";

const $router = useRouter();
const goBack = () => $router.back();

definePageMeta({
  layout: "support",
});
</script>

<style scoped></style>
