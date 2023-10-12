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
          Target Savings
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <!-- <div class="flex gap-3 flex-wrap justify-between">
            <div
              class="h-[3rem] text-[#3861b4] rounded flex items-center justify-center font-bold text-lg"
            >
              {{ formatToCurrency(Number(1000000), true, true, "NGN") }}
              Invested
            </div>
            <div
              class="h-[3rem] text-[#3861b4] rounded flex items-center justify-center font-bold text-lg"
            >
              {{ formatToCurrency(Number(1000), true, true, "NGN") }} Gained
            </div>
          </div> -->

          <div class="flex flex-row justify-between">
            <button
              class="border border-[#3861b4] text-[#3861b4] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
              @click="async () => navigateTo('/savings/target/create')"
            >
              <Icon name="fluent:add-12-filled" size="20" color="#5e84d0" />

              Create Plan
            </button>

            <button
              class="border border-[#3861b4] text-[#3861b4] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
              @click="
                async () => navigateTo('/savings/target/all-transactions')
              "
            >
              <Icon name="ph:eye-light" size="20" color="#5e84d0" />

              View Transactions
            </button>
          </div>

          <div class="flex flex-col gap-3 mt-4">
            <div
              class="flex flex-col p-3 border bg-[#3861b4] text-white rounded-lg"
              v-for="(savingsData, index) in targetSavings"
              @click="
                async () =>
                  await navigateTo('/savings/target/' + savingsData.id)
              "
            >
              <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col col-span-2 text-lg">
                  <!-- <p> Name </p> -->
                  <h4 class="font-bold capitalize"
                    >{{ savingsData.save_label }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Target </p>
                  <h4 class="text-base font-medium"
                    >{{ savingsData.save_target }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Due Date </p>
                  <h4 class="text-base font-medium">
                    {{
                      moment(savingsData.unlock_date).format("DD, MMM, YYYY")
                    }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Current Balance </p>
                  <h4 class="text-base font-medium">
                    <!-- {{ savingsData.wallet.current_balance }} -->

                    {{
                      formatToCurrency(
                        parseInt(savingsData.wallet.current_balance) || 0,
                        true,
                        true,
                        "NGN"
                      )
                    }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Interest Earned </p>
                  <h4 class="text-base font-medium">
                    {{
                      formatToCurrency(
                        savingsData.interest_sum_amount_paid || 0,
                        true,
                        true,
                        "NGN"
                      )
                    }}
                  </h4>
                </div>
              </div>
              <!-- <h4 class="text-base font-medium"
                >{{ savingsData.save_label }}
              </h4> -->
              <!-- <p class="text-xs font-medium">Save a part of your earnings</p> -->
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
// import formatToCurrency from "../../utils/formatToCurrency";
// import axiosinstance from "../../../libs/axiosinstance";
import moment from "moment";

interface Wallet {
  current_balance: string;
  wallet_id: number;
  savings_id: number;
}

interface Datum {
  id: string;
  tid: string;
  unlock_date: Date;
  save_label: string;
  save_target: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  debit_source: string;
  amount_debit: string;
  when_debit: string;
  debit_account_number: null | number;
  interest_sum_amount_paid: number;
  debit_day_time: string;
  wallet: Wallet;
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

const { $fetchToken, $getToken } = useNuxtApp();

const userToken = ref<string | null>(null);
const targetSavings = ref<Datum[]>([]);
const currentPage = ref(1);

// watchEffect(async () => {
//   try {
//     const data = axiosinstance.get("savings/view-target-savings", {
//       headers: {
//         Authorization: "Bearer " + userToken.value,
//       },
//       params: {
//         is_single_record: false,
//         longitude: "2039382",
//         latitude: "08090932",
//       },
//     });
//     console.log(userToken.value);
//     console.log(await data);
//   } catch (error) {
//     console.log(error);
//   }
// });

const loadNextPage = () => {
  currentPage.value = currentPage.value + 1;
};

watchEffect(() => {
  if (process.browser) {
    $fetchToken();
    userToken.value = $getToken();
  }
});

const { data, pending, error } = useFetch<RootObj>(
  "https://kams.kolomoni.ng/api/savings/view-target-savings",
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
    key: "all-target-savings",
    server: false,
    watch: [currentPage],
  }
);

watchEffect(() => {
  // targetSavings.value = [...data.value?.data, targetSavings.value];

  if (data.value) {
    targetSavings.value.splice(0, 0, ...data.value?.data);
  }
});
</script>

<style scoped></style>
