<template>
  <div>
    <NuxtLayout name="savings">
      <div
        class="w-full h-screen flex items-center justify-center"
        v-if="pending"
      >
        <Icon name="line-md:loading-twotone-loop" size="90" />
      </div>

      <div class="flex flex-col justify-center p-4 gap-5 text-[#003399]" v-else>
        <h3
          class="font-bold text-[1.5rem] flex items-center gap-2 pb-0 text-[#3861b4]"
          >Our Saving Plans
          <!-- <Icon name="clarity:coin-bag-line" size="20" /> -->
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <!-- not ready -->
          <!-- <div class="flex gap-3 flex-wrap justify-between">
            <div
              class="h-[3.5rem] text-[#3861b4] rounded flex items-center justify-center font-bold text-lg"
            >
              {{ formatToCurrency(Number(1000000), true, true, "NGN") }}
              Invested
            </div>
            <div
              class="h-[3.5rem] text-[#3861b4] rounded flex items-center justify-center font-bold text-lg"
            >
              {{ formatToCurrency(Number(1000), true, true, "NGN") }} Gained
            </div>
          </div> -->

          <div class="flex flex-col gap-3 divide-y border-t">
            <div
              class="flex gap-3 pt-2"
              v-for="plan in data"
              :key="plan.id"
              @click="async () => await navigateTo(getLinks(plan.save_type))"
            >
              <Icon
                :name="getIcons(plan.save_type)"
                size="40"
                color="#5e84d0"
              />

              <div class="flex items-center gap-2">
                <div class="flex flex-col">
                  <div class="flex flex-col">
                    <h4 class="text-base font-medium capitalize"
                      >{{ plan.saveDisplayName }}
                    </h4>

                    <!-- plan description -->
                    <!-- <p class="text-xs font-medium"
                      >Save a part of your earnings</p
                    > -->
                  </div>
                  <p class="font-bold text-sm text-[#3861b4]">
                    {{ plan.interest_rate }}% Interest
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import axiosinstance from "~/libs/axiosinstance";
import formatToCurrency from "../../utils/formatToCurrency";

const { $fetchToken, $getToken } = useNuxtApp();

const userToken = ref<string | null>(null);

watchEffect(() => {
  if (process.browser) {
    $fetchToken();

    userToken.value = $getToken();
  }
});

interface SavingsObject {
  id: number;
  save_type: string;
  interest_rate: string;
  interest_payment_time: string;
  saveDisplayName: string;
  plans?: Plan[];
}

interface Plan {
  id: number;
  description: string;
  short_name: string;
  interest_rate: string;
  added_incentive: string;
  plan_start_duration?: string;
  plan_end_duration?: string;
  duration_description: string;
  plan_duration_type: string;
  plan_continuous_days?: number;
}

const { data, pending, error } = useFetch<SavingsObject[]>(
  "https://kams.kolomoni.ng/api/savings/savings-plan",
  {
    method: "get",
    headers: {
      Authorization: "Bearer " + userToken.value,
    },
    key: "all-savings",
    server: false,
  }
);

watchEffect(async () => {
  try {
    // const data = axiosinstance.get("savings/savings-plan", {
    //   headers: {
    //     Authorization: "Bearer " + userToken.value,
    //   },
    // });
    // console.log(userToken.value);
    console.log(data.value);
    console.log(pending.value);
  } catch (error) {
    console.log(error);
  }
});

const getIcons = (save_type: string) => {
  if (save_type == "kolo_savings") {
    return "game-icons:piggy-bank";
  }
  if (save_type == "fixed_deposit") {
    return "game-icons:locked-chest";
  }
  if (save_type == "target_savings") {
    return "codicon:target";
  }
  if (save_type == "transact_and_save") {
    return "uil:transaction";
  } else {
    return "game-icons:piggy-bank";
  }
};

const getLinks = (save_type: string) => {
  if (save_type == "kolo_savings") {
    return "/savings/kolo";
  }
  if (save_type == "fixed_deposit") {
    return "/savings/fixed";
  }
  if (save_type == "target_savings") {
    return "/savings/target";
  }
  if (save_type == "transact_and_save") {
    return "/savings/transact-n-save";
  }
};
</script>

<style scoped></style>
