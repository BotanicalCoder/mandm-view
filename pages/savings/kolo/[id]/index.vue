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
            {{ data?.data[0]?.fullname }}
          </h3>
        </div>

        <div class="flex justify-between">
          <button
            class="bg-[#3861b4] p-2 rounded-md font-medium text-white flex items-center"
            @click="
              () =>
                navigateTo(
                  '/savings/kolo/' + id + '/debit/' + data?.data[0]?.id
                )
            "
          >
            <Icon name="entypo:credit" size="20" color="white" /> Debit
          </button>
          <button
            class="bg-[#3861b4] p-2 rounded-md font-medium text-white flex items-center"
            @click="
              () =>
                navigateTo(
                  '/savings/kolo/' + id + '/credit/' + data?.data[0]?.id
                )
            "
          >
            <Icon name="entypo:credit" size="20" color="white" /> Credit
          </button>
        </div>

        <div class="grid grid-cols-1 justify-between gap-6 mt-4">
          <div class="flex flex-col items-start">
            <p class="text-sm">Wallet Balance </p>
            <h4 class="font-medium text-base capitalize">
              {{
                formatToCurrency(
                  +data?.data[0]?.wallet?.current_balance || 0,
                  true,
                  true,
                  "NGN"
                )
              }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Email</p>
            <h4 class="font-medium text-base capitalize">
              {{ data?.data[0]?.email }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Address</p>
            <h4 class="font-medium text-base capitalize">
              {{ data?.data[0]?.address }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Balance </p>
            <h4 class="font-medium text-base capitalize">
              {{
                formatToCurrency(
                  +data?.data[0]?.wallet.current_balance || 0,
                  true,
                  true,
                  "NGN"
                )
              }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Phone</p>
            <h4 class="font-medium text-base capitalize">
              {{ data?.data[0]?.phone }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Status</p>
            <h4
              class="font-medium text-base capitalize"
              :class="[
                data?.data[0]?.status == 'active'
                  ? 'text-green-700'
                  : 'text-red-700',
              ]"
            >
              {{ data?.data[0]?.status }}
            </h4>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import moment from "moment";
const params = useRoute().params;

const dataStore = useMyAuthDataStore();

const $router = useRouter();
const goBack = () => $router.back();

const userToken = ref<string | null>(dataStore.token);

// @ts-ignore
const { id } = params;

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
  "https://kams.kolomoni.ng/api/savings/view-kolo-savings",
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
    key: "single-target-savings",
    server: false,
  }
);

const convertStringArray = (string: string) => {
  const arr = string.replace(/\[|\]/g, "").split(",");
  return arr;
};
</script>

<style scoped></style>
