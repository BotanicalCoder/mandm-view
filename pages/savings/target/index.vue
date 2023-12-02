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
          <Icon
            name="material-symbols:arrow-back-ios"
            size="20"
            color="black"
            class="cursor-pointer"
            @click="goBack"
          />
          <span> Target Savings </span>
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <div class="flex flex-row flex-wrap justify-between mt-4">
            <button
              class="border bg-[#3861b4] text-[#ffffff] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
              @click="async () => navigateTo('/savings/target/create')"
            >
              <Icon name="fluent:add-12-filled" size="20" color="#ffffff" />

              Create
            </button>

            <button
              class="border bg-[#3861b4] text-[#ffffff] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
              @click="async () => navigateTo('/savings/target/transactions')"
            >
              <Icon name="ph:eye-light" size="20" color="#ffffff" />

              Transactions
            </button>
          </div>

          <div class="flex flex-col gap-3 mt-4" v-if="targetSavings.length > 0">
            <div
              class="flex flex-col p-3 border bg-[#ffffff] text-black rounded-lg"
              v-for="(savingsData, index) in targetSavings"
              @click="
                async () =>
                  await navigateTo('/savings/target/' + savingsData.id)
              "
            >
              <div class="grid grid-cols-2 gap-2">
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
                      savingsData.unlock_date
                        ? moment(savingsData.unlock_date).format(
                            "DD, MMMM, YYYY"
                          )
                        : "-"
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

          <div
            class="h-full my-[6rem] flex justify-center items-center"
            v-if="targetSavings.length == 0"
          >
            <h3 class="font-medium font-3xl text-gray-700">
              No Target Savings
            </h3>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useMyAuthDataStore } from "../../../stores/authData";
import moment from "moment";

const dataStore = useMyAuthDataStore();

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

const userToken = ref<string | null>(dataStore.token);

const targetSavings = ref<Datum[]>([]);
const currentPage = ref(1);

const $router = useRouter();
const goBack = () => $router.back();

const loadNextPage = () => {
  currentPage.value = currentPage.value + 1;
};

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

function removeDuplicates(data: any) {
  let jsonObject = data.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  //@ts-ignore
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse);

  return uniqueArray;
}

watchEffect(() => {
  console.log(data.value);

  if (data.value) {
    targetSavings.value = removeDuplicates(data.value?.data);
  }
});

// http://localhost:3000/savings?data=%22{+%22tid%22:+%222057Q3G3%22,++%22token%22:+%22eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNyIsImp0aSI6ImNiNzljNzhkMWZhMWRlM2U3Y2Y5MDZkNWJmYzNkYWU1NDdiMTEyMjRiYWQ0ZGRlNzUwNjM2YmM5M2QwODg4NWFkMjQwZjQ0YTJjYWYzYzc4IiwiaWF0IjoxNjk4NDQ1MTg5LjgxMjY3MiwibmJmIjoxNjk4NDQ1MTg5LjgxMjY3NCwiZXhwIjoxNzMwMDY3NTg5LjgxMTQwOCwic3ViIjoiNzE0MjEiLCJzY29wZXMiOlsiKiJdfQ.XR-UloGCuNE419zpsvz9EPjAZ19MmD3Onf3cEd2DhNcTCZAVPRSISugNSYaKXHAMelZkcxDAndcOdNVAnICEgWn8iAgK5LpPXShKEpFK-4jr-Qos2phUCJ1xBiRAGNolb1m8if-pC4pTlQDmasq2wHiQ1x9gZBoVFtGI-gEqT7PQ0lPGTZNy9FyenJlYlnrj4_Xy0S2-wGIrzQrNrpNyXIqeHsTcOJfEYNplwzlOpjZlSwG--dE5d8WwFazZNUC5vOIlrX_pxVCq2CFfucieZkxyf2bFytI27sltFpf6wP4nJHDXUEKpKZms1KBs3xSSHaG1j5yEkpcGNQNzwgzNQVg6BN32Tdy9Q960VPQP1ZQV2Ip2u9V6Kix_8HaRpCLZjnzlHgclBJXw_0Gj9QfkvgUZyVNCw9P8Flrib6gmhsgJc3HtK1fgMiyR_0SX8HpKOyIATU_61jknKBgWjM2z9LeXllnsfYlTkho2WSo5IMb37CczCPu_RWUS8Q5YLq9PWsSqTbDlDPgs3o0Xl54E9GWLuGGHGCn7ltBQb5LNP5NZE7Xd5oACLqt63ATp6a6lbYNB6LA6ztrnpWxauE-ThK2qAXgkXwLV66NsOe2zxMyhIgOeQ7y5wfXKBNm9IlQjoElNq0cC368nxY20TZAhju5FCxlGwtVrxhULKVSAWkc%22,%22longitude%22:+%22237464.13%22,%22latitude%22:+%2210928.26%22}%27

// data={
//   tid: "22057Q3G3",
//   token:
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNyIsImp0aSI6ImNiNzljNzhkMWZhMWRlM2U3Y2Y5MDZkNWJmYzNkYWU1NDdiMTEyMjRiYWQ0ZGRlNzUwNjM2YmM5M2QwODg4NWFkMjQwZjQ0YTJjYWYzYzc4IiwiaWF0IjoxNjk4NDQ1MTg5LjgxMjY3MiwibmJmIjoxNjk4NDQ1MTg5LjgxMjY3NCwiZXhwIjoxNzMwMDY3NTg5LjgxMTQwOCwic3ViIjoiNzE0MjEiLCJzY29wZXMiOlsiKiJdfQ.XR-UloGCuNE419zpsvz9EPjAZ19MmD3Onf3cEd2DhNcTCZAVPRSISugNSYaKXHAMelZkcxDAndcOdNVAnICEgWn8iAgK5LpPXShKEpFK-4jr-Qos2phUCJ1xBiRAGNolb1m8if-pC4pTlQDmasq2wHiQ1x9gZBoVFtGI-gEqT7PQ0lPGTZNy9FyenJlYlnrj4_Xy0S2-wGIrzQrNrpNyXIqeHsTcOJfEYNplwzlOpjZlSwG--dE5d8WwFazZNUC5vOIlrX_pxVCq2CFfucieZkxyf2bFytI27sltFpf6wP4nJHDXUEKpKZms1KBs3xSSHaG1j5yEkpcGNQNzwgzNQVg6BN32Tdy9Q960VPQP1ZQV2Ip2u9V6Kix_8HaRpCLZjnzlHgclBJXw_0Gj9QfkvgUZyVNCw9P8Flrib6gmhsgJc3HtK1fgMiyR_0SX8HpKOyIATU_61jknKBgWjM2z9LeXllnsfYlTkho2WSo5IMb37CczCPu_RWUS8Q5YLq9PWsSqTbDlDPgs3o0Xl54E9GWLuGGHGCn7ltBQb5LNP5NZE7Xd5oACLqt63ATp6a6lbYNB6LA6ztrnpWxauE-ThK2qAXgkXwLV66NsOe2zxMyhIgOeQ7y5wfXKBNm9IlQjoElNq0cC368nxY20TZAhju5FCxlGwtVrxhULKVSAWkc",
//   longitude: "22237464.13",
//   latitude: "2210928.26",
// }
</script>

<style scoped></style>
