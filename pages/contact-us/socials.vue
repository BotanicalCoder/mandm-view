<template>
  <div>
    <NuxtLayout>
      <template v-slot:header>
        <!-- content for the header slot -->
        <div class="flex items-center">
          <Icon
            name="material-symbols:arrow-back-ios"
            size="20"
            color="black"
            @click="goBack"
            class="cursor-pointer"
          />
          <p class="text-gray-800 text-xl font-bold text-center w-full">
            Our Social Media Handles
          </p>
        </div>
      </template>

      <div
        class="flex flex-row h-full p-4 items-center justify-center gap-4 flex-wrap"
      >
        <card
          text="Instagram"
          link="https://instagram.com/kolomoniagent"
          :is-external="true"
        >
          <Icon
            name="skill-icons:instagram"
            size="90"
            color="#003399"
            :is-external="true"
          />
        </card>

        <card
          text="Twitter / X"
          link="https://twitter.com/kolomoniagent"
          :is-external="true"
        >
          <Icon name="skill-icons:twitter" size="90" color="#003399" />
        </card>

        <card
          text="WhatsApp"
          link=" https://wa.me/9132623643"
          :is-external="true"
        >
          <Icon name="logos:whatsapp-icon" size="90" color="#003399" />
        </card>

        <card
          text="Facebook"
          link="https://www.facebook.com/Kolomoni.ng"
          :is-external="true"
        >
          <Icon name="logos:facebook" size="90" color="#003399" />
        </card>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const $router = useRouter();
const goBack = () => $router.back();
</script>

<style scoped></style>
