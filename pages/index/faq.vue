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
            Frequently asked questions
          </p>
        </div>
      </template>

      <template #body>
        <div
          class="mb-12 h-full flex flex-col w-full items-center"
          v-if="!isLoading"
        >
          <div
            class="flex flex-col w-full h-full justify-center p-0 items-center gap-8"
            v-for="item in faqs || []"
          >
            <faq-accordion :item="item" />
          </div>

          <button
            class="w-fit bg-orange-200 p-3 rounded-xl my-8"
            v-if="faqData?.next_page_url"
            @click="loadNextPage"
          >
            {{ isLoading ? "Loading......" : "Load more" }}
          </button>

          <!-- <pagination
          :current-page="currentPage"
          :total-items="faqData.p"
          @click-handler="onClickHandler"
        /> -->
        </div>
        <div class="w-full my-[5rem] flex items-center justify-center" v-else>
          <Icon name="line-md:loading-twotone-loop" size="90" />
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import { faqs } from "@/contants/faq";
// import { ref, watchEffect } from "vue";
// import { useRouter } from "#vue-router";
import axiosinstance from "@/libs/axiosinstance";

const $router = useRouter();
const goBack = () => $router.back();

const isLoading = ref(false);
const currentPage = ref(1);
const faqs = ref([]);
const faqData = ref();

const onClickHandler = (page: number) => {
  currentPage.value = page;
  alert(page);
};

const loadNextPage = () => {
  currentPage.value = currentPage.value + 1;
};

watchEffect(async () => {
  isLoading.value = true;
  try {
    let res = await axiosinstance.get(`/faq/getfaq?page=${currentPage.value}`);
    if (res.data) {
      let decodedData = JSON.parse(atob(res.data));
      faqData.value = decodedData;

      faqs.value.unshift(...(decodedData.data as []));
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped></style>
