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
        class="flex flex-col p-4 gap-4"
        v-if="!pending && data?.data?.length > 0"
      >
        <Icon
          name="material-symbols:arrow-back-ios"
          size="20"
          color="black"
          class="cursor-pointer"
          @click="goBack"
        />
        <div
          class="w-full text-white text-center h-content bg-[#3861b4] rounded-lg p-1"
        >
          <h3 class="font-bold text-sm gap-2 p-2 my-auto capitalize">
            {{ data?.data[0]?.narration || "--" }}
          </h3>

          <!-- <h4 class="text-base font-medium">
            {{
              formatToCurrency(
                parseInt(data?.data[0]?.debit_amount as string) || 0,
                true,
                true,
                "NGN"
              )
            }}
            Debited
          </h4> -->
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <!-- <div class="flex flex-col items-start">
            <p class="text-sm"> Plan Name </p>
            <h4 class="font-medium text-[1.1rem]">
              {{ data?.data[0]?.target_savings?.save_label }}
            </h4>
          </div> -->

          <div class="flex flex-col items-start">
            <p class="text-sm"> Date </p>
            <h4 class="font-medium text-[1.1rem]">
              {{ moment(data?.data[0]?.created_at).format("DD, MMM, YYYY") }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Debit Source</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0]?.debit_source }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Amount </p>
            <h4 class="font-medium text-[1.3rem]">
              {{
                formatToCurrency(
                  parseInt(data?.data[0]?.amount as string) || 0,
                  true,
                  true,
                  "NGN"
                )
              }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Status</p>
            <h4
              class="font-medium text-[1.1rem] capitalize"
              :class="[
                data?.data[0]?.status == 'successful'
                  ? 'text-green-700'
                  : 'text-red-700',
              ]"
            >
              {{ data?.data[0]?.status }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Date</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ moment(data?.data[0]?.created_at).format("DD, MMM, YYYY") }}
            </h4>
          </div>

          <div class="flex flex-col items-start justify-start col-span-2">
            <p class="text-sm"> Reference</p>
            <h4 class="font-medium text-[1rem] capitalize">
              {{ data?.data[0]?.reference }}
            </h4>
          </div>

          <div class="flex flex-col items-start col-span-2">
            <p class="text-sm"> Debit Reference</p>
            <h4 class="font-medium text-[1rem] capitalize">
              {{ data?.data[0]?.debit_reference }}
            </h4>
          </div>
        </div>
      </div>
      <div
        class="h-screen flex justify-center items-center relative"
        v-if="data?.data?.length == 0"
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

const params = useRoute().params;

const $router = useRouter();
const goBack = () => $router.back();

const dataStore = useMyAuthDataStore();
const userToken = ref<string | null>(dataStore.token);

// @ts-ignore
const { id } = params;

watchEffect(() => {
  console.log(id);
});

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
  "https://kams.kolomoni.ng/api/savings/view-fixed-savings-transactions",
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
    key: "target-savings-transaction",
    server: false,
  }
);

watchEffect(() => {
  console.log(data.value);
});
</script>

<style scoped></style>
