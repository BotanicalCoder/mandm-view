<template>
  <div>
    <NuxtLayout name="savings">
      <div class="flex flex-col p-4 gap-4">
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

          Create plan
        </h3>
        <input-text
          label="Savings Name"
          placeholder="Savings Name"
          v-model="transactNSave.savingsname"
          :errorMsg="transactNSaveError.savingsname"
        />

        <input-single-select
          class="z-10"
          :options="[
            {
              label: 'Fixed',
              value: 'fixed',
            },
            {
              label: 'Percentage',
              value: 'percentage',
            },
          ]"
          label="Deduction type"
          v-model="transactNSave.deductiontype"
          name="select-channel"
          z-index-parent=" z-30"
          z-index-child=" z-20"
          :errorMsg="transactNSaveError.deductiontype"
        />

        <input-text
          label="Save Amount"
          :placeholder="
            transactNSave.deductiontype.value == 'fixed' ? '1000' : '100%'
          "
          v-model="transactNSave.saveamount"
          :errorMsg="transactNSaveError.saveamount"
        />

        <input-multi-select
          class="z-10"
          :options="[
            {
              label: 'Withdrawal',
              value: 'withdrawal',
            },
            {
              label: 'Transfer',
              value: 'transfer',
            },
            {
              label: 'Vas',
              value: 'vas',
            },
            {
              label: 'Inward',
              value: 'inward',
            },
          ]"
          label="Transactions"
          v-model="transactNSave.transactions"
          name="select-transactions"
          z-index-parent=" z-30"
          z-index-child=" z-20"
          :errorMsg="transactNSaveError.transactions"
        />

        <button
          class="border bg-[#3861b4] text-[white] rounded-lg w-full p-2 flex items-center justify-center gap-2 font-bold mb-0"
          @click="savePlan"
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
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
// import moment from "moment";
import { toast } from "vue3-toastify";
import axiosinstance from "../../../libs/axiosinstance";
import { useMyAuthDataStore } from "../../../stores/authData";

const dataStore = useMyAuthDataStore();

const userToken = ref<string | null>(dataStore.token);

const $router = useRouter();
const goBack = () => $router.back();

const transactNSave = reactive({
  savingsname: "",
  deductiontype: {
    label: "Fixed",
    value: "fixed",
  },
  transactions: [],
  saveamount: "",
  creation_source: "mobile",
  longitude: dataStore.longitude,
  latitude: dataStore.latitude,
});

const transactNSaveError = reactive({
  savingsname: "",
  transactions: "",
  saveamount: "",
  deductiontype: "",
});

const loading = ref(false);

const validateForm = () => {
  transactNSaveError.savingsname = "";
  transactNSaveError.transactions = "";
  transactNSaveError.saveamount = "";
  transactNSaveError.deductiontype = "";
  if (!transactNSave.savingsname) {
    transactNSaveError.savingsname = "Savings name is required";
  } else if (transactNSave.transactions.length < 1) {
    transactNSaveError.transactions = "Transactions is required";
  } else if (!transactNSave.saveamount) {
    transactNSaveError.saveamount = "Savings amount is required";
  } else if (!transactNSave.deductiontype) {
    transactNSaveError.deductiontype = "Deduction type  is required";
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
      "savings/create-transact-and-save",
      {
        ...transactNSave,
        deductiontype: transactNSave.deductiontype.value,
        transactions: transactNSave.transactions.map((trns: any) => trns.value),
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
      await navigateTo("/savings/transact-n-save");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    //@ts-ignore
    console.log(error?.data);
    //@ts-ignore
    toast.error(error?.data?.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
