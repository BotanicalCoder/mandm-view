<template>
  <div>
    <NuxtLayout name="savings">
      <div
        class="w-full h-screen flex items-center justify-center"
        v-if="pending"
      >
        <Icon name="line-md:loading-twotone-loop" size="90" />
      </div>
      <div class="flex flex-col p-4 gap-4" v-else>
        <div
          class="w-full text-white text-center h-fit bg-[#3861b4] rounded-lg p-3"
        >
          <h3 class="font-bold text-[1.5rem] gap-2 p-2 my-auto capitalize">
            {{ data?.data[0].narration }}
          </h3>

          <h4 class="text-base font-medium">
            <!-- {{ data?.data[0].interest_sum_amount_paid || 0 }} -->

            {{
              formatToCurrency(
                parseFloat(data?.data[0]?.debit_amount as string) || 0,
                false,
                false,
                "NGN"
              )
            }}
            Debited
          </h4>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="flex flex-col items-center">
            <p class="text-sm"> Amount </p>
            <h4 class="font-medium text-[1.3rem]">
              {{
                formatToCurrency(
                  parseFloat(data?.data[0].amount as string) || 0,
                  false,
                  false,
                  "NGN"
                )
              }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Debit Source</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0].debit_source }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Status</p>
            <h4
              class="font-medium text-[1.1rem] capitalize"
              :class="[
                data?.data[0].status == 'successful'
                  ? 'text-green-700'
                  : 'text-red-700',
              ]"
            >
              {{ data?.data[0].status }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Date</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{
                data?.data[0].created_at
                  ? moment(data?.data[0].created_at).format("DD, MMMM, YYYY")
                  : "-"
              }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Reference</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0].reference }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Debit Reference</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0].debit_reference }}
            </h4>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
const params = useRoute().params;

const dataStore = useMyAuthDataStore();

const userToken = ref<string | null>(dataStore.token);

// @ts-ignore
const { transaction_id } = params;

watchEffect(() => {
  console.log(transaction_id);
});

// watchEffect(async () => {
//   try {
//     const data = axiosinstance.get("savings/view-target-savings", {
//       headers: {
//         Authorization: "Bearer " + userToken.value,
//       },
//       params: {
//         is_single_record: true,
//         longitude: "2039382",
//         latitude: "08090932",
//          single_record_id:id
//       },
//     });
//     console.log(userToken.value);
//     console.log(await data);
//   } catch (error) {
//     console.log(error);
//   }
// });

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

const { data, pending, error } = useFetch<RootObj>(
  "https://kams.kolomoni.ng/api/savings/view-target-transactions",
  {
    method: "get",
    headers: {
      Authorization: "Bearer " + userToken.value,
    },
    params: {
      is_single_record: true,
      longitude: "2039382",
      latitude: "08090932",
      single_record_id: transaction_id,
    },
    key: "target-savings-transaction",
    server: false,
  }
);

watchEffect(() => {
  console.log(data.value);
});
</script>

<style scoped></style>
