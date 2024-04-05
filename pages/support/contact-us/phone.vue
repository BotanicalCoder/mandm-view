<template>
  <div>
    <NuxtLayout name="support">
      <template #header>
        <!-- content for the header slot -->
        <div class="flex items-center">
          <Icon name="material-symbols:arrow-back-ios" size="20" color="white" @click="goBack" class="cursor-pointer" />
          <p class="text-white text-xl font-bold text-center w-full">
            Call Us
          </p>
        </div>
      </template>

      <template #body>

        <div class="flex flex-col h-full justify-center p-4 items-center gap-8">
          <img src="/images/contact-us.jpg" class="w-[15rem] rounded-3xl" />
          <div class="text-center">
            <h3 class="text-gray-700 font-bold text-xl">
              Reach out to us today
            </h3>
            <p class="text-gray-700 font-thin text-sm">
              Our Phone lines are open from
              <span class="font-normal">8:00 AM</span>
              to
              <span class="font-normal">5:00PM</span>
            </p>
          </div>

          <p class="text-gray-700 font-thin text-md w-full px-3">
            Call us on:
            <br />
          <p class="flex flex-wrap gap-4">
            <span class="font-bold">+2347025015329 &nbsp; </span>

            <!-- <span class="font-bold">08104386082 &nbsp; </span>

            <span class="font-bold">07068364670 &nbsp; </span>

            <span class="font-bold">07061928550  </span> -->


          </p>

          </p>
        </div>
      </template>

    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const $router = useRouter();
const goBack = () => $router.back()
</script>

<style scoped></style>
