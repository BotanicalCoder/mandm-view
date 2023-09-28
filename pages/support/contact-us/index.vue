<template>
  <div>
    <NuxtLayout>
      <template v-slot:header>
        <!-- content for the header slot -->
        <div class="flex items-center">
          <Icon
            name="material-symbols:arrow-back-ios"
            size="20"
            color="white"
            @click="returnHome"
            class="cursor-pointer"
          />
          <p class="text-white text-xl font-bold text-center w-full">
            Contact Us
          </p>
        </div>
      </template>

      <div
        class="flex flex-row h-full p-4 items-center justify-center gap-4 flex-wrap"
      >
        <card text="Call Us" link="/contact-us/phone/">
          <Icon
            name="material-symbols:phone-forwarded-outline"
            size="60"
            color="#003399"
          />
        </card>

        <card text="Social Media" link="/contact-us/socials/">
          <Icon
            name="fluent:people-community-20-regular"
            size="60"
            color="#003399"
          />
        </card>

        <!-- <card text="Mail" link="contact-us/mail">
          <Icon name="solar:mailbox-line-duotone" size="90" color="#003399" />
        </card> -->
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const returnHome = async () => await navigateTo("/");
</script>

<style scoped></style>
