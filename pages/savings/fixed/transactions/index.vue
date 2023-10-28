<template>
  <div>
    <NuxtLayout name="savings">
      <div
        class="w-full h-screen flex items-center justify-center"
        v-if="pending"
      >
        <Icon name="line-md:loading-twotone-loop" size="90" />
      </div>
      <div
        class="flex flex-col justify-center p-4 gap-2 text-[#00339986]"
        v-else
      >
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

          Transactons
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <div class="flex flex-col gap-3 mt-4">
            <div
              class="flex flex-col p-3 border bg-[white] text-black rounded-lg"
              v-for="(transactionsData, index) in transactions"
              @click="
                async () =>
                  await navigateTo(
                    '/savings/fixed/transactions/' + transactionsData.id
                  )
              "
            >
              <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col col-span-2 text-lg">
                  <!-- <p> Name </p> -->
                  <h4 class="font-bold capitalize truncate"
                    >{{ transactionsData.narration }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Date </p>
                  <h4 class="text-base font-medium">
                    {{
                      moment(transactionsData.created_at).format(
                        "DD, MMM, YYYY"
                      )
                    }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Debit Amount </p>
                  <h4 class="text-base font-medium">
                    {{
                      formatToCurrency(
                        parseInt(transactionsData.debit_amount) || 0,
                        true,
                        true,
                        "NGN"
                      )
                    }}
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

      <div
        class="h-screen flex justify-center items-center"
        v-if="transactions.length == 0"
      >
        <h3 class="font-medium font-2xl"> No Transactions </h3>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useMyAuthDataStore } from "../../../../stores/authData";
import moment from "moment";

interface Target_Savings {
  id: number;
  end_date: Date;
  save_label: string;
  date_created: Date;
}

interface Datum {
  id: number;
  reference: string;
  debit_reference: string;
  amount: string;
  oldbal: string;
  newbal: string;
  debit_source: string;
  narration: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  savings_id: number;
  tid: string;
  debit_amount: string;
  target_savings: Target_Savings;
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

const { data, pending, error } = useFetch<RootObj>(
  "https://kams.kolomoni.ng/api/savings/view-fixed-savings-transactions",
  {
    method: "get",
    headers: {
      Authorization: "Bearer " + userToken.value,
    },
    params: {
      is_single_record: false,
      longitude: "2039382",
      latitude: "08090932",
      page: currentPage.value,
    },
    key: "all-target-savings-transactions",
    server: false,
    watch: [currentPage],
  }
);

function removeDuplicates(data: any) {
  let jsonObject = data.map(JSON.stringify);
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

// watchEffect(() => {
//   if (data.value) {
//     console.log(data.value);

//     transactions.value.splice(0, 0, ...data.value?.data);
//   }
//   console.log(transactions.value);
// });
</script>

<style scoped></style>
