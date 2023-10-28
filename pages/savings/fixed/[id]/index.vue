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
            {{ data?.data[0].save_label }}
          </h3>

          <h4 class="text-base font-medium">
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

        <div class="flex flex-col gap-1">
          <div class="flex justify-between">
            <div class="flex flex-col items-start">
              <p class="text-xs"> Current Balance </p>
              <h4 class="font-medium text-sm">
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

            <div class="flex flex-col items-start">
              <p class="text-xs"> Target </p>
              <h4 class="font-medium text-sm">
                {{
                  formatToCurrency(
                    parseInt(data?.data[0].save_target as string) || 0,
                    true,
                    true,
                    "NGN"
                  )
                }}
              </h4>
            </div>
          </div>
          <progress-bar
            :goal="parseInt(data?.data[0].save_target as string) || 0"
            :current=" parseInt(data?.data[0].wallet?.current_balance as string) ||0"
          />
        </div>

        <div class="grid grid-cols-2 justify-between gap-6 mt-4">
          <div class="flex flex-col items-start">
            <p class="text-sm"> Debit Source</p>
            <h4 class="font-medium text-base capitalize">
              {{ data?.data[0].debit_source }}
            </h4>
          </div>

          <div class="flex flex-col items-start">
            <p class="text-sm"> Status</p>
            <h4
              class="font-medium text-base capitalize"
              :class="[
                data?.data[0].status == 'active'
                  ? 'text-green-700'
                  : 'text-red-700',
              ]"
            >
              {{ data?.data[0].status }}
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
  "https://kams.kolomoni.ng/api/savings/view-fixed-savings",
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

const getNextDebitTime = (
  frequency: string | undefined,
  time: string | undefined
) => {
  if (frequency == "daily") {
    return moment(time, "hh:mm:ss").format("x") > moment().format("x")
      ? "Today " + moment(time, "hh:mm:ss").format("hh:mm A")
      : "Tomorrow " + moment(time, "hh:mm:ss").format("hh:mm A");
  } else if (frequency == "weekly") {
    if (moment().format("ddd") == time) return "Today";
    else {
      let day;
      switch (time) {
        case "Sun":
          day = "Sunday";
          break;
        case "Mon":
          day = "Monday";
          break;
        case "Tue":
          day = "Tuesday";
          break;
        case "Wed":
          day = "Wednesday";
          break;
        case "Thu":
          day = "Thursday";
          break;
        case "Fri":
          day = "Friday";
          break;
        case "Sat":
          day = "Saturday";
          break;
        default:
          break;
      }
      return moment().add(1, "d").format("ddd") == day ? "Tomorrow" : day;
    }
  } else {
    if (
      moment().format("DD MMMM, YYYY") ==
      moment(time, "D").format("DD MMMM, YYYY")
    ) {
      return "Today";
    } else if (
      moment().add(1, "d").format("DD MMMM, YYYY") ==
      moment(time, "D").format("DD MMMM, YYYY")
    ) {
      return "Tomorrow";
    }
    return moment(time, "D").format("DD MMMM, YYYY");
  }
};
</script>

<style scoped></style>
