<template>
  <div>
    <NuxtLayout name="savings">
      <div class="flex flex-col p-4 gap-4">
        <h3
          class="font-bold text-[1.5rem] flex items-center gap-2 pb-0 text-[#3861b4]"
        >
          Create Target Savings
        </h3>
        <input-text
          label="Savings Name"
          placeholder="Savings Name"
          v-model="targetSavings.savingsname"
          :errorMsg="targetSavingsError.savingsname"
        />

        <input-single-select
          class="z-10"
          :options="[
            {
              label: 'Wallet',
              value: 'Wallet',
            },
          ]"
          label="Debit Source"
          v-model="targetSavings.debitsource"
          name="select-channel"
          z-index-parent=" z-30"
          z-index-child=" z-20"
          :errorMsg="targetSavingsError.debitsource"
        />

        <input-single-select
          class="z-10"
          :options="[
            {
              label: 'Daily',
              value: 'daily',
            },
            {
              label: 'Weekly',
              value: 'weekly',
            },
            {
              label: 'Monthly',
              value: 'monthly',
            },
          ]"
          label="Debit Frequency"
          v-model="targetSavings.debitfrequency"
          name="select-channel"
          z-index-parent=" z-20"
          z-index-child=" z-10"
          :errorMsg="targetSavingsError.debitfrequency"
        />

        <input-timepicker
          v-if="targetSavings.debitfrequency.value == 'daily'"
          v-model="targetSavings.debitfrequencytime"
          label="Debit Time"
          name="Debit Time"
          :errorMsg="targetSavingsError.debitfrequencytime"
        />

        <input-daypicker
          v-if="targetSavings.debitfrequency.value == 'monthly'"
          v-model="targetSavings.debitfrequencydate"
          label="Debit Day"
          name="Debit Day"
          :errorMsg="targetSavingsError.debitfrequencydate"
        />

        <input-single-select
          v-if="targetSavings.debitfrequency.value == 'weekly'"
          class="z-10"
          :options="[
            {
              label: 'Sunday',
              value: 'Sun',
            },
            {
              label: 'Monday',
              value: 'Mon',
            },
            {
              label: 'Tuesday',
              value: 'Tue',
            },
            {
              label: 'Wednesday',
              value: 'Wed',
            },
            {
              label: 'Thursday',
              value: 'Thu',
            },
            {
              label: 'Friday',
              value: 'Fri',
            },
            {
              label: 'Saturday',
              value: 'Sat',
            },
          ]"
          label="Debit Day"
          v-model="targetSavings.debitday"
          name="select-channel"
          z-index-parent=" z-20"
          z-index-child=" z-10"
          :errorMsg="targetSavingsError.debitday"
        />

        <input-text
          label="Debit Amount"
          placeholder="1000"
          v-model="targetSavings.debitamount"
          :errorMsg="targetSavingsError.debitamount"
        />

        <input-text
          label="Target Savings"
          placeholder="1000"
          v-model="targetSavings.targetsavings"
          :errorMsg="targetSavingsError.targetsavings"
        />

        <input-datepicker
          v-model="targetSavings.savetargetdate"
          label="Target Date"
          name="Target Date"
          :errorMsg="targetSavingsError.savetargetdate"
        />

        <button
          class="border border-[#3861b4] text-[#3861b4] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
          @click="savePlan"
        >
          <Icon
            :name="
              loading ? 'line-md:loading-twotone-loop' : 'fluent:add-12-filled'
            "
            size="20"
            color="#5e84d0"
          />
          {{ loading ? "Saving.." : "Save Plan" }}
        </button>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";
import { toast } from "vue3-toastify";
import axiosinstance from "../../../libs/axiosinstance";

const { $fetchToken, $getToken } = useNuxtApp();

const userToken = ref<string | null>(null);

watchEffect(() => {
  if (process.browser) {
    $fetchToken();

    userToken.value = $getToken();
  }
});

const targetSavings = reactive({
  savingsname: "",
  debitsource: {
    label: "Wallet",
    value: "wallet",
  },
  debitfrequency: {
    label: "Daily",
    value: "daily",
  },
  debitday: {
    label: "",
    value: "",
  },
  debitfrequencytime: {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes,
  },
  debitfrequencydate: new Date(),
  debitamount: "",
  targetsavings: "",
  savetargetdate: new Date(),
  creation_source: "mobile",
  longitude: "2039382",
  latitude: "08090932",
});

const targetSavingsError = reactive({
  savingsname: "",
  debitsource: "",
  debitfrequency: "",
  debitfrequencytime: "",
  debitfrequencydate: "",
  debitamount: "",
  targetsavings: "",
  savetargetdate: "",
});

const loading = ref(false);

const validateForm = () => {
  console.log(targetSavings);
  if (!targetSavings.savingsname) {
    targetSavingsError.savingsname = "Savings name is required";
    return false;
  } else if (!targetSavings.debitsource.value) {
    targetSavingsError.debitsource = "Debit Source is required";
    return false;
  } else if (!targetSavings.debitfrequency.value) {
    targetSavingsError.debitfrequency = "Debit Frequency is required";
    return false;
  } else if (
    targetSavings.debitfrequency.value == "weekly" &&
    !targetSavings.debitday.value
  ) {
    targetSavingsError.debitday = "Debit Day is required";
    return false;
  } else if (
    targetSavings.debitfrequency.value == "daily" &&
    !targetSavings.debitfrequencytime
  ) {
    targetSavingsError.debitfrequencytime = "Debit Frequency Time is required";
    return false;
  } else if (
    targetSavings.debitfrequency.value == "monthly" &&
    !targetSavings.debitfrequencydate
  ) {
    targetSavingsError.debitfrequencydate = "Debit Frequency Day is required";
    return false;
  } else if (!targetSavings.debitamount) {
    targetSavingsError.debitamount = "Debit Amount is required";
    return false;
  } else if (!targetSavings.targetsavings) {
    targetSavingsError.targetsavings = "Target Savings Amount is required";
    return false;
  } else if (!targetSavings.savetargetdate) {
    targetSavingsError.savetargetdate = "Save Target Date is required";
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
      success: boolean;
      message: string;
      id: number;
    }>(
      "/savings/create-target-savings",
      {
        ...targetSavings,
        debitfrequency: targetSavings.debitfrequency.value,
        debitfrequencytime:
          targetSavings.debitfrequency.value == "daily"
            ? targetSavings.debitfrequencytime.hours +
              ":" +
              targetSavings.debitfrequencytime.minutes
            : targetSavings.debitfrequency.value == "weekly"
            ? targetSavings.debitday.value
            : targetSavings.debitfrequency.value == "monthly"
            ? targetSavings.debitfrequencydate
            : null,
        debitsource: targetSavings.debitsource.value,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      }
    );

    console.log(data);

    if (data.success) {
      toast.success(data.message);
      await navigateTo("/savings/target");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    console.log(error?.data);
    toast.error(error?.data?.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
