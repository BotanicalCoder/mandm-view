<template>
  <div>
    <NuxtLayout name="savings">
      <div
        class="w-full h-screen flex items-center justify-center"
        v-if="pending"
      >
        <Icon name="line-md:loading-twotone-loop" size="90" />
      </div>
      <div class="flex flex-col justify-center p-4 gap-2 text-[#003399]" v-else>
        <h3
          class="font-bold text-[1.5rem] flex items-center gap-2 pb-0 text-black"
        >
          <Icon
            name="material-symbols:arrow-back-ios"
            size="20"
            color="black"
            class="cursor-pointer"
            @click="goBack"
          />
          <span> Kolo </span>
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <div class="flex flex-row flex-wrap justify-between mt-4">
            <button
              class="border bg-[#3861b4] text-[#ffffff] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
              @click="async () => navigateTo('/savings/kolo/create')"
            >
              <Icon name="fluent:add-12-filled" size="20" color="#ffffff" />

              Create
            </button>

            <button
              class="border bg-[#3861b4] text-[#ffffff] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
              @click="async () => navigateTo('/savings/kolo/transactions')"
            >
              <Icon name="ph:eye-light" size="20" color="#ffffff" />

              Transactions
            </button>
          </div>

          <div class="flex flex-co text-black text-[1.2rem]">
            <p>Agent Balance: </p>
            &nbsp;
            <p class="font-bold">
              {{ formatToCurrency(balanceData?.amount, true, true, "NGN") }}
            </p>
          </div>

          <div class="flex flex-col gap-3 mt-4">
            <div
              class="flex flex-col p-3 border bg-[#ffffff] text-black rounded-lg"
              v-for="(savingsData, index) in koloSavings"
              @click="
                async () => await navigateTo('/savings/kolo/' + savingsData.id)
              "
              :key="savingsData.id"
            >
              <div class="grid grid-cols-2 gap-2">
                <div class="flex flex-col col-span-2 text-lg">
                  <h4 class="font-bold capitalize"
                    >{{ savingsData.save_label }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Name </p>
                  <h4 class="text-base font-medium">
                    {{ savingsData?.fullname }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p>Email </p>
                  <h4 class="text-base font-medium truncate">
                    {{ savingsData?.email }}
                  </h4>
                </div>
              </div>
            </div>

            <button
              class="w-fit border p-3 rounded-xl my-8 mx-auto"
              @click="loadNextPage"
              v-if="data?.next_page_url"
            >
              {{ pending ? "Loading......" : "Load more" }}
            </button>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
interface Datum {
  id: string;
  tid: string;
  amount_deduction: string;
  status: string;
  save_label: String;
  dedution_type: string;
  updated_at: Date;
  created_at: Date;
  selected_transactions: string[];
}

interface RootObj {
  current_page: number;
  first_page_url: null | string;
  from: number;
  next_page_url: null | string;
  path: null | string;
  per_page: number;
  prev_page_url: null;
  to: null | string;
  data: Datum[];
}

import { useMyAuthDataStore } from "../../../stores/authData";

const koloSavings = ref<Datum[]>([]);
const currentPage = ref(1);

const dataStore = useMyAuthDataStore();

const $router = useRouter();
const goBack = () => $router.back();

const userToken = ref<string | null>(dataStore.token);

const loadNextPage = () => {
  currentPage.value = currentPage.value + 1;
};

const { data, pending, error } = useFetch<RootObj>(
  "https://kams.kolomoni.ng/api/savings/view-kolo-savings",
  {
    method: "get",
    headers: {
      Authorization: "Bearer " + userToken.value,
    },
    params: {
      is_single_record: "false",
      longitude: "2039382",
      latitude: "08090932",
      page: currentPage.value,
    },
    key: "all-target-savings",
    server: false,
    watch: [currentPage],
  }
);

const {
  data: balanceData,
  pending: balanceDataPending,
  error: balanceDataError,
} = useFetch<RootObj>(
  "https://kams.kolomoni.ng/api/savings/view-koloajo-balance",
  {
    method: "get",
    headers: {
      Authorization: "Bearer " + userToken.value,
    },
    params: {
      longitude: "2039382",
      latitude: "08090932",
      is_single_record: false,
    },
    key: "view-koloajo-balance",
    server: false,
    watch: [currentPage],
  }
);

console.log(balanceData);

function removeDuplicates(data: any) {
  let jsonObject = data.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  //@ts-ignore
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse);

  return uniqueArray;
}

watchEffect(() => {
  if (data.value) {
    koloSavings.value = removeDuplicates(data.value?.data);
  }
});
</script>

<style scoped></style>
