<template>
  <div>
    <NuxtLayout name="savings">
      <form class="flex flex-col p-4 gap-4" @submit.prevent="savePlan">
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

          Create Plan
        </h3>

        <!-- savings name -->
        <input-text
          type="text"
          label="Savings Name"
          placeholder="Savings Name"
          v-model="targetSavings.savingsname"
          :errorMsg="targetSavingsError.savingsname"
          :required="true"
          pattern="[A-Za-z \-]+"
        />

        <!-- debit source -->
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

        <!-- debit frequency -->
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

        <!-- debit time -->
        <input-timepicker
          v-if="targetSavings.debitfrequency.value == 'daily'"
          v-model="targetSavings.debitfrequencytime"
          label="Debit Time"
          name="Debit Time"
          :errorMsg="targetSavingsError.debitfrequencytime"
        />

        <!-- debit date per month -->
        <input-daypicker
          v-if="targetSavings.debitfrequency.value == 'monthly'"
          v-model="targetSavings.debitfrequencydate"
          label="Debit Day"
          name="Debit Day"
          :errorMsg="targetSavingsError.debitfrequencydate"
        />

        <!-- debit frequency -->
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
          :errorMsg="targetSavingsError.debitfrequencydate"
        />

        <!-- debit amount -->
        <input-text
          type="number"
          label="Debit Amount"
          placeholder="1000"
          v-model="targetSavings.debitamount"
          :errorMsg="targetSavingsError.debitamount"
          :required="true"
        />

        <input-text
          type="number"
          label="Target Savings"
          placeholder="1000"
          v-model="targetSavings.targetsavings"
          :errorMsg="targetSavingsError.targetsavings"
          :required="true"
        />

        <!-- target savings date -->
        <input-datepicker
          v-model="targetSavings.savetargetdate"
          label="Target Date"
          name="Target Date"
          :errorMsg="targetSavingsError.savetargetdate"
        />

        <button
          class="border bg-[#3861b4] text-[white] rounded-lg w-full p-2 flex items-center justify-center gap-2 font-bold mb-0"
          type="submit"
        >
          <Icon
            :name="
              loading ? 'line-md:loading-twotone-loop' : 'fluent:add-12-filled'
            "
            size="20"
            color="white"
          />
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

const $router = useRouter();
const goBack = () => $router.back();

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
    hours: "",
    minutes: "",
  },
  debitfrequencydate: "",
  debitamount: "",
  targetsavings: "",
  savetargetdate: "",
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
    targetSavingsError.debitfrequencydate = "Debit Day is required";
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

  let debitFrequency;

  if (targetSavings.debitfrequency.value == "daily") {
    debitFrequency = moment(targetSavings.debitfrequencytime.hours).format(
      "HH:mm"
    );
  } else if (targetSavings.debitfrequency.value == "weekly") {
    debitFrequency = targetSavings.debitday.value;
  } else if (targetSavings.debitfrequency.value == "monthly") {
    targetSavings.debitfrequencydate != ""
      ? targetSavings.debitfrequencydate.getDate()
      : null;
  } else {
    null;
  }

  try {
    const { data } = await axiosinstance.post<{
      success: boolean;
      message: string;
      id: number;
    }>(
      "savings/create-target-savings",
      {
        ...targetSavings,
        debitfrequency: targetSavings.debitfrequency.value,
        debitfrequencytime: debitFrequency,
        debitsource: targetSavings.debitsource.value,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      }
    );

    if (data.success) {
      toast.success(data.message, {
        onClose: async () => await navigateTo("/savings/target"),
      });
    } else {
      toast.error(data.message);
    }
    // await navigateTo("/savings/target");
  } catch (error) {
    console.log(error);
    // @ts-ignore
    console.log(error?.data);
    // @ts-ignore
    toast.error(error?.data?.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
