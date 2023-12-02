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
          Target Savings Transactons
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <div class="flex flex-col gap-3 mt-4">
            <div
              class="flex flex-col p-3 border bg-[#3861b4] text-white rounded-lg"
              v-for="(transactionsData, index) in transactions"
              @click="
                async () =>
                  await navigateTo('/savings/target/' + transactionsData.id)
              "
            >
              <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col col-span-2 text-lg">
                  <!-- <p> Name </p> -->
                  <h4 class="font-bold capitalize"
                    >{{ transactionsData.narration }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Date </p>
                  <h4 class="text-base font-medium">
                    {{
                      transactionsData.created_at
                        ? moment(transactionsData.created_at).format(
                            "DD, MMMM, YYYY"
                          )
                        : "-"
                    }}
                  </h4>
                </div>

                <div class="flex flex-col">
                  <p> Debit Amount </p>
                  <h4 class="text-base font-medium">
                    {{
                      formatToCurrency(
                        parseFloat(transactionsData.debit_amount) || 0,
                        false,
                        false,
                        "NGN"
                      )
                    }}
                  </h4>
                </div>

                <!-- <div class="flex flex-col">
                  <p> Target </p>
                  <h4 class="text-base font-medium"
                    >{{ savingsData.save_target }}
                  </h4>
                </div>

      
                <div class="flex flex-col">
                  <p> Interest Earned </p>
                  <h4 class="text-base font-medium">
                    {{
                      formatToCurrency(
                        savingsData.interest_sum_amount_paid || 0,
                         false,
                        false,
                        "NGN"
                      )
                    }}
                  </h4>
                </div> -->
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

const userToken = ref<string | null>(null);
const transactions = ref<Datum[]>([]);
const currentPage = ref(1);

// watchEffect(async () => {
//   try {
//     const data = axiosinstance.get("savings/view-target-transactions", {
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

const { data, pending, error } = useFetch<RootObj>(
  "https://kams.kolomoni.ng/api/savings/view-target-transactions",
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

watchEffect(() => {
  if (data.value) {
    transactions.value.splice(0, 0, ...data.value?.data);
  }
  console.log(transactions.value);
});
</script>

<style scoped></style>
