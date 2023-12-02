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
          <h3 class="font-bold text-[1.5rem] gap-2 p-0 my-auto capitalize">
            {{ data?.data[0]?.narration || "--" }}
          </h3>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div
            class="flex flex-col col-span-2 items-start"
            v-if="data?.data[0]?.users_id"
          >
            <p class="text-sm">Full name</p>
            <h4 class="font-medium text-[1.2rem] capitalize">
              {{ data?.data[0]?.kolosavingsmodel?.fullname }}
            </h4>
          </div>

          <div
            class="flex flex-col col-span-2 items-start"
            v-if="data?.data[0]?.users_id"
          >
            <p class="text-sm">Email</p>
            <h4 class="font-medium text-[1.2rem] capitalize">
              {{ data?.data[0]?.kolosavingsmodel?.email }}
            </h4>
          </div>

          <div class="flex flex-col items-start" v-if="data?.data[0]?.users_id">
            <p class="text-sm">Phone no.</p>
            <h4 class="font-medium text-[1.2rem] capitalize">
              {{ data?.data[0]?.kolosavingsmodel?.phone }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Amount </p>
            <h4 class="font-medium text-[1.2rem]">
              {{
                formatToCurrency(
                  parseFloat(data?.data[0]?.amount as string) || 0,
                  false,
                  false,
                  "NGN"
                )
              }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Transaction Type </p>
            <h4 class="font-medium text-[1.2rem] capitalize">
              {{ data?.data[0]?.transaction_type }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Date </p>
            <h4 class="font-medium text-[1.2rem]">
              {{
                data?.data[0]?.created_at
                  ? moment(data?.data[0]?.created_at).format("DD, MMMM, YYYY")
                  : "-"
              }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Transaction Source</p>
            <h4 class="font-medium text-[1.2rem] capitalize">
              {{ data?.data[0]?.transaction_source }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Status</p>
            <h4
              class="font-medium text-[1.2rem] capitalize"
              :class="[
                data?.data[0]?.status == 'successful'
                  ? 'text-green-700'
                  : 'text-red-700',
              ]"
            >
              {{ data?.data[0]?.status }}
            </h4>
          </div>

          <div class="flex flex-col col-span-2 items-start">
            <p class="text-sm"> Reference</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0]?.reference }}
            </h4>
          </div>

          <div class="flex flex-col col-span-2 items-start">
            <p class="text-sm"> Debit Reference</p>
            <h4 class="font-medium text-[1.1rem] capitalize">
              {{ data?.data[0]?.debit_reference }}
            </h4>
          </div>
        </div>
      </div>
      <div class="h-screen flex justify-center items-center relative" v-else>
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

interface RootObj {
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

const params = useRoute().params;

const $router = useRouter();
const goBack = () => $router.back();

// @ts-ignore
const { id } = params;

const dataStore = useMyAuthDataStore();

const userToken = ref<string | null>(dataStore.token);

const { data, pending, error } = useFetch<RootObj>(
  "https://kams.kolomoni.ng/api/savings/view-kolo-savings-transactions",
  {
    method: "get",
    headers: {
      Authorization: "Bearer " + userToken.value,
    },
    params: {
      is_single_record: "true",
      longitude: "2039382",
      latitude: "08090932",
      single_record_id: id,
    },
    key: "kolo-single-savings-transaction",
    server: false,
  }
);

watchEffect(() => {
  console.log(pending);
});
</script>

<style scoped></style>
