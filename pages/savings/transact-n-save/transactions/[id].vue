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
          class="w-full text-white text-center h-fit bg-[#3861b4] rounded-lg p-3"
        >
          <h3 class="font-bold text-[1.5rem] gap-2 p-2 my-auto capitalize">
            {{ data?.data[0]?.narration || "--" }}
          </h3>

          <h4 class="text-base font-medium">
            {{
              formatToCurrency(
                parseFloat(data?.data[0]?.amount as string) || 0,
                false,
                false,
                "NGN"
              )
            }}
            Debited
          </h4>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="flex flex-col items-left">
            <p class="text-sm"> Plan Name </p>
            <h4 class="font-medium text-[1.3rem]">
              {{ data?.data[0]?.transactandsave.save_label }}
            </h4>
          </div>

          <!-- <div class="flex flex-col items-center">
            <p class="text-sm"> End Date </p>
            <h4 class="font-medium text-[1.3rem]">
              {{ data?.data[0]?.target_savings.end_date }}
            </h4>
          </div>

          <div class="flex flex-col items-center">
            <p class="text-sm"> Debit Source</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0]?.debit_source }}
            </h4>
          </div> -->

          <div class="flex flex-col items-left">
            <p class="text-sm"> Balance </p>
            <h4 class="font-medium text-[1.3rem]">
              {{
                formatToCurrency(
                  parseFloat(data?.data[0]?.newbal as string) || 0,
                  false,
                  false,
                  "NGN"
                )
              }}
            </h4>
          </div>

          <div class="flex flex-col items-left">
            <p class="text-sm">Transaction Type </p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0]?.transaction_type }}
            </h4>
          </div>

          <div class="flex flex-col items-left">
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

          <div class="flex flex-col items-left">
            <p class="text-sm"> Date</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{
                data?.data[0]?.created_at
                  ? moment(data?.data[0]?.created_at).format("DD, MMMM, YYYY")
                  : "-"
              }}
            </h4>
          </div>

          <div class="flex flex-col items-left">
            <p class="text-sm"> Reference</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0]?.reference }}
            </h4>
          </div>

          <div class="flex flex-col items-left">
            <p class="text-sm"> Debit Reference</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0]?.debit_reference }}
            </h4>
          </div>
        </div>
      </div>
      <div class="h-screen flex justify-center items-center">
        <h3 class="font-medium font-2xl"> No Transactions </h3>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
const params = useRoute().params;

const dataStore = useMyAuthDataStore();

const userToken = ref<string | null>(dataStore.token);

const $router = useRouter();

const goBack = () => $router.back();

// @ts-ignore
const { id } = params;

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

const { data, pending, error } = useFetch<RootObj>(
  "https://kams.kolomoni.ng/api/savings/view-transact-and-save-transactions",
  {
    method: "get",
    headers: {
      Authorization: "Bearer " + userToken.value,
    },
    params: {
      is_single_record: true,
      longitude: dataStore.longitude,
      latitude: dataStore.latitude,
      single_record_id: id,
    },
    key: "transact-n-save-transaction",
    server: false,
  }
);

watchEffect(() => {
  console.log(data.value);
});
</script>

<style scoped></style>
