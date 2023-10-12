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
            {{ data?.data[0].save_label }}
          </h3>

          <h4 class="text-base font-medium">
            <!-- {{ data?.data[0].interest_sum_amount_paid || 0 }} -->

            {{
              formatToCurrency(
                data?.data[0].interest_sum_amount_paid || 0,
                true,
                true,
                "NGN"
              )
            }}
            Earned
          </h4>
        </div>

        <div class="flex flex-row justify-between">
          <button
            class="border border-[#3861b4] text-[#3861b4] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
            @click="async () => navigateTo('/savings/target/create')"
          >
            <Icon name="fluent:add-12-filled" size="20" color="#5e84d0" />

            New Plan
          </button>

          <button
            class="border border-[#3861b4] text-[#3861b4] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
            @click="
              async () => navigateTo('/savings/target/' + id + '/transactions/')
            "
          >
            <Icon name="ph:eye-light" size="20" color="#5e84d0" />

            View Transactions
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="flex flex-col items-center">
            <p class="text-sm"> Current Balance </p>
            <h4 class="font-medium text-[1.3rem]">
              <!-- {{ data?.data[0].wallet.current_balance }} -->

              {{
                formatToCurrency(
                  parseInt(data?.data[0].wallet?.current_balance as string) ||
                    0,
                  true,
                  true,
                  "NGN"
                )
              }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Status</p>
            <h4
              class="font-medium text-[1.1rem] capitalize"
              :class="[
                data?.data[0].status == 'active'
                  ? 'text-green-700'
                  : 'text-red-700',
              ]"
            >
              {{ data?.data[0].status }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Start Date</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              <!-- {{ data?.data[0].status }} -->
              {{ moment(data?.data[0].created_at).format("DD, MMM, YYYY") }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Unlock Date</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              <!-- {{ data?.data[0].status }} -->
              {{ moment(data?.data[0].unlock_date).format("DD, MMM, YYYY") }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Debit Frequency</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0].when_debit }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Debit Source</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0].debit_source }}
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

const { $fetchToken, $getToken } = useNuxtApp();

const userToken = ref<string | null>(null);

// @ts-ignore
const { id } = params;

watchEffect(() => {
  if (process.browser) {
    $fetchToken();
    userToken.value = $getToken();
  }
});

watchEffect(() => {
  console.log(id);
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

const { data, pending, error } = useFetch<RootObj>(
  "https://kams.kolomoni.ng/api/savings/view-target-savings",
  {
    method: "get",
    headers: {
      Authorization: "Bearer " + userToken.value,
    },
    params: {
      is_single_record: true,
      longitude: "2039382",
      latitude: "08090932",
      single_record_id: id,
    },
    key: "all-target-savings",
    server: false,
  }
);

watchEffect(() => {
  console.log(data.value);
});
</script>

<style scoped></style>
