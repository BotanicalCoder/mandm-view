<template>
  <div>
    <NuxtLayout name="savings">
      <div class="w-full h-screen flex items-center justify-center" v-if="pendingPlans">
        <Icon name="line-md:loading-twotone-loop" size="90" />
      </div>

      <form class="flex flex-col p-4 gap-4" @submit.prevent="savePlan" v-else>
        <h3 class="font-bold text-[1.5rem] flex items-center gap-2 pb-0 text-black">
          <Icon name="material-symbols:arrow-back-ios" size="20" color="black" class="cursor-pointer" @click="goBack" />

          Create Plan
        </h3>

        <!-- savings name -->
        <input-text type="text" label="Savings Name" placeholder="Savings Name" v-model="fixedSavings.savingsname"
          :errorMsg="fixedSavingsError.savingsname" :required="true" pattern="[A-Za-z \-]+" />

        <input-single-select class="z-10" :options="[
          {
            label: 'Wallet',
            value: 'Wallet',
          },
        ]" label="Debit Source" v-model="fixedSavings.debitsource" name="select-channel" z-index-parent=" z-40"
          z-index-child=" z-30" :errorMsg="fixedSavingsError.debitsource" />

        <input-text type="number" label="Debit Amount" placeholder="1000" v-model="fixedSavings.debitamount"
          :errorMsg="fixedSavingsError.debitamount" :required="true" />

        <input-single-select class="z-10" :options="plans" label="Plans " v-model="fixedSavings.fixedplans"
          name="select-plan" z-index-parent="
        z-30" z-index-child=" z-20" :errorMsg="fixedSavingsError.fixedplans" />

        <button
          class="border bg-[#3861b4] text-[white] rounded-lg w-full p-2 flex items-center justify-center gap-2 font-bold mb-0"
          type="submit">
          <Icon :name="loading ? 'line-md:loading-twotone-loop' : 'fluent:add-12-filled'
            " size="20" color="white" />
          {{ loading ? "Saving.." : "Save Plan" }}
        </button>
      </form>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";
import { toast } from "vue3-toastify";
import axiosinstance from "../../../libs/axiosinstance";
import { useMyAuthDataStore } from "../../../stores/authData";

const dataStore = useMyAuthDataStore();

const userToken = ref<string | null>(dataStore.token);
const plans = ref([]);

const $router = useRouter();
const goBack = () => $router.back();

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

const {
  data: plansData,
  pending: pendingPlans,
  error: plansError,
} = useFetch<SavingsObject[]>(
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

watchEffect(() => {

  if (plansData?.value?.length) {
    if (plansData?.value?.length > 0) {
      // @ts-ignore
      plans.value = plansData?.value
        ?.find((plan: SavingsObject) => plan?.save_type == "fixed_deposit")
        .plans?.map((plan: Plan) => ({
          label: plan.short_name,
          value: plan?.id,
        }));
    }
  }
});

const fixedSavings = reactive({
  savingsname: "",
  debitsource: {
    label: "Wallet",
    value: "wallet",
  },
  debitamount: "",
  fixedplans: {
    label: "",
    value: "",
  },
  creation_source: "mobile",
  longitude: dataStore.longitude,
  latitude: dataStore.latitude,
});

const fixedSavingsError = reactive({
  savingsname: "",
  debitsource: "",
  debitamount: "",
  fixedplans: "",
});

const loading = ref(false);

const validateForm = () => {
  fixedSavingsError.savingsname = "";
  fixedSavingsError.debitsource = "";
  fixedSavingsError.debitamount = "";
  fixedSavingsError.fixedplans = "";

  if (!fixedSavings.savingsname) {
    fixedSavingsError.savingsname = "Savings name is required";
    return false;
  } else if (!fixedSavings.debitsource.value) {
    fixedSavingsError.debitsource = "Debit Source is required";
    return false;
  } else if (!fixedSavings.debitamount) {
    fixedSavingsError.debitamount = "Debit Amount is required";
    return false;
  } else if (!fixedSavings.fixedplans.value) {
    fixedSavingsError.fixedplans = "Plan is required";
    return false;
  } else {
    return true;
  }
};

const savePlan = async () => {
  const isValid = validateForm();

  if (!isValid) {
    return;
  }
  loading.value = true;
  try {
    const { data } = await axiosinstance.post<{
      id: number;
      success: string;
      message: string;
      error?: string;
    }>(
      "savings/create-fixed-savings",
      {
        ...fixedSavings,
        fixedplans: fixedSavings.fixedplans.value + "",
        debitsource: fixedSavings.debitsource.value,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      }
    );


    if (data.success) {
      let successMsg = data.message || data.success;

      toast.success(successMsg, {
        onClose: async () => await navigateTo("/savings/fixed"),
      });
    } else {

      let errorMsg = data.message || data.error;

      return toast.error(errorMsg as string);

    }

    // await navigateTo("/savings/fixed");
  } catch (error) {
    console.log(error);
    // @ts-ignore
    console.log(error?.data.error);

    // @ts-ignore
    if (error?.data.error) {
      // @ts-ignore
      return toast.error(error?.data?.error);
    } else {
      // @ts-ignore
      return toast.error(error?.data?.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
