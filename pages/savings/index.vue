<template>
  <div>
    <NuxtLayout name="savings">
      <div>
        <div
          class="w-full h-screen flex items-center justify-center"
          v-if="pending"
        >
          <Icon name="line-md:loading-twotone-loop" size="90" />
        </div>

        <div
          class="flex flex-col justify-center p-4 gap-5 text-[#003399]"
          v-else
        >
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
            <span> Saving Plans</span>
          </h3>

          <div
            v-if="error"
            class="w-full h-screen flex items-center justify-center"
          >
            <p class="text-black text-xl"> Something went wrong </p>
          </div>

          <div class="px-0 flex flex-col gap-3" v-else>
            <div class="flex flex-col gap-3 divide-y border-t">
              <div
                class="flex gap-3 pt-2 bg-[#ffffff] text-black p-2 rounded-lg"
                v-for="plan in data"
                :key="plan.id"
                @click="async () => await navigateTo(getLinks(plan.save_type))"
              >
                <Icon
                  :name="getIcons(plan.save_type)"
                  size="40"
                  color="#3861b4"
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
                    <p
                      class="font-medium text-sm text-black"
                      v-if="plan.interest_rate"
                    >
                      {{ plan.interest_rate }}% Interest
                    </p>
                  </div>
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
// import AuthClient from "~/components/auth.client.vue";
import { useMyAuthDataStore } from "../../stores/authData";

// import { useMyAuthDataStore } from "../stores/authData.ts";

const { $decryptKey, $encryptKey } = useNuxtApp();
const route = useRoute();
// const dataStore = useMyAuthDataStore();

const dataStore = useMyAuthDataStore();

const $router = useRouter();

watchEffect(() => {
  dataStore.setDataState(
    JSON.parse(
      // $decryptKey(route.query.data.replace(/-/g, "+").replace(/_/g, "/"))
      route?.query?.data
    )
  );
});

const goBack = () => $router.back();

const userToken = ref<string | null>(dataStore.token);

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
