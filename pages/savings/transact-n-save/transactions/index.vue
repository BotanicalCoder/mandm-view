<template>
  <div>
    <NuxtLayout name="savings">
      <div class="w-full h-screen flex items-center justify-center" v-if="pending">
        <Icon name="line-md:loading-twotone-loop" size="90" />
      </div>
      <div class="flex flex-col justify-center p-4 gap-2 text-[#00339986]" v-else>
        <h3 class="font-bold text-[1.5rem] flex items-center gap-2 pb-0 text-black">
          <Icon name="material-symbols:arrow-back-ios" size="20" color="black" class="cursor-pointer" @click="goBack" />

          Transactions
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex flex-col p-3 border bg-[#ffffff] text-black rounded-lg"
              v-for="(transactionsData, index) in transactions" @click="async () =>
                await navigateTo(
                  '/savings/transact-n-save/transactions/' +
                  transactionsData.id
                )
                " :key="transactionsData.id">
              <div class="grid grid-cols-2 gap-2">
                <div class="flex flex-col col-span-2 text-lg">
                  <h4 class="font-bold capitalize">{{ transactionsData.transactandsave.save_label }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Type </p>
                  <h4 class="text-base font-medium capitalize">
                    {{ transactionsData?.transaction_type }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Amount </p>
                  <h4 class="text-base font-medium">
                    {{
                      formatToCurrency(
                        Number(transactionsData.amount),
                        false,
                        false,
                        "NGN"
                      )
                    }}
                  </h4>
                </div>
              </div>
            </div>

            <button class="w-fit border p-3 rounded-xl my-8 mx-auto" @click="loadNextPage" v-if="data?.next_page_url">
              {{ pending ? "Loading......" : "Load more" }}
            </button>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { useMyAuthDataStore } from "../../../../stores/authData";

interface Transact_N_Save {
  id: number;
  end_date: Date;
  debit_amount: string;
  save_label: string;
  date_created: Date;
  transaction_type: string[];
}

interface Datum {
  amount: string;
  created_at: Date;
  debit_reference: string;
  id: number;
  narration: string;
  newbal: string;
  oldbal: string;
  reference: string;
  savings_id: number;
  status: string;
  tid: string;
  trans_amount: string;
  transactandsave: Transact_N_Save;
  transaction_type: string;
  updated_at: Date;
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

const dataStore = useMyAuthDataStore();

const userToken = ref<string | null>(dataStore.token);
const transactions = ref<Datum[]>([]);
const currentPage = ref(1);
const $router = useRouter();
const goBack = () => $router.back();

const loadNextPage = () => {
  currentPage.value = currentPage.value + 1;
};

const { data, pending, error } = await useAsyncData<RootObj>(
  'all-transact-n-save-transactions',
  () => $fetch("https://kams.kolomoni.ng/api/savings/view-transact-and-save-transactions", {
    method: "get",
    headers: {
      Authorization: "Bearer " + userToken.value,
    },
    params: {
      is_single_record: false,
      longitude: "2039382",
      latitude: "08090932",
      page: currentPage.value,
    }
  }), {
  server: false,
  watch: [currentPage]
}
)

function removeDuplicates(data: any) {

  let allData = [...data, ...transactions.value];

  //@ts-ignore
  let jsonObject = allData.map(JSON.stringify);


  let uniqueSet = new Set(jsonObject);
  //@ts-ignore
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse);

  return uniqueArray;
}

watchEffect(() => {
  if (data.value) {
    transactions.value = removeDuplicates(data.value?.data);
  }
});

</script>

<style scoped></style>
