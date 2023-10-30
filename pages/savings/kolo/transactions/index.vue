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
          <span> Kolo Savings Transactons </span>
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <div class="flex flex-col gap-3 mt-4">
            <div
              class="flex flex-col p-3 border bg-[#ffffff] text-black rounded-lg"
              v-for="(transactionsData, index) in transactions"
              @click="
                async () =>
                  await navigateTo(
                    '/savings/kolo/transactions/' + transactionsData.id
                  )
              "
            >
              <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col col-span-2 text-lg">
                  <h4 class="font-bold capitalize"
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
                  <p> Amount </p>
                  <h4 class="text-base font-medium">
                    {{
                      formatToCurrency(
                        parseInt(transactionsData.amount) || 0,
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
        class="h-screen flex justify-center items-center relative"
        v-if="transactions.length !== 0"
      >
        <Icon
          name="material-symbols:arrow-back-ios"
          size="20"
          color="black"
          class="cursor-pointer absolute top-4 left-4"
          @click="goBack"
        />

        <h3 class="font-medium font-2xl"> No Transactions </h3>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { useMyAuthDataStore } from "../../../../stores/authData";

interface RootObject {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
}

interface Datum {
  id: number;
  reference: string;
  debit_reference: string;
  amount: string;
  oldbal: string;
  newbal: string;
  transaction_source: string;
  narration: string;
  status: string;
  created_at: string;
  updated_at: string;
  users_id?: number;
  owner_tid: string;
  transaction_type: string;
  kolosavingsmodel?: Kolosavingsmodel;
}

interface Kolosavingsmodel {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  date_created: string;
}

const $router = useRouter();
const goBack = () => $router.back();

const dataStore = useMyAuthDataStore();

const userToken = ref<string | null>(dataStore.token);
const transactions = ref<Datum[]>([]);
const currentPage = ref(1);

const loadNextPage = () => {
  currentPage.value = currentPage.value + 1;
};

const { data, pending, error } = useFetch<RootObject>(
  "https://kams.kolomoni.ng/api/savings/view-kolo-savings-transactions",
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
  console.log(transactions.value);
});
</script>

<style scoped></style>
