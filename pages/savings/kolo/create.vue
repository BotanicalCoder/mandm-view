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

          Create User
        </h3>

        <!-- fullname -->
        <input-text
          type="text"
          label="Full Name"
          placeholder="Full Name"
          v-model="koloSavings.fullname"
          :errorMsg="koloSavingsError.fullname"
          :required="true"
        />

        <!-- email -->
        <input-text
          type="email"
          label="Email"
          placeholder="Email"
          v-model="koloSavings.email"
          :errorMsg="koloSavingsError.email"
          :required="true"
        />

        <!-- amount -->
        <input-text
          type="number"
          label="Save Amount"
          placeholder="Enter Amount "
          v-model="koloSavings.creditamount"
          :errorMsg="koloSavingsError.creditamount"
          :required="true"
        />

        <!-- address -->
        <input-text
          label="Address"
          placeholder="Address"
          v-model="koloSavings.address"
          type="text"
          :errorMsg="koloSavingsError.address"
          :required="true"
        />

        <!-- debit source -->
        <input-single-select
          class="z-10"
          :options="[
            {
              label: 'Wallet',
              value: 'wallet',
            },
          ]"
          label="Debit source"
          v-model="koloSavings.debitsource"
          name="select-channel"
          z-index-parent=" z-30"
          z-index-child=" z-20"
          :errorMsg="koloSavingsError.debitsource"
        />

        <!-- phone number -->
        <input-text
          type="tel"
          pattern="^(?:(?:\+|0)?(?:234\s?)?0)([789]\d{2}|\d{3})[- ]?\d{3}[- ]?\d{3}$"
          label="Phone"
          placeholder="Enter Phone no. e.g 2348012345678 "
          v-model="koloSavings.phone"
          :errorMsg="koloSavingsError.phone"
          :required="true"
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
          {{ loading ? "Saving.." : "Save User" }}
        </button>
      </form>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import axiosinstance from "../../../libs/axiosinstance";
import { useMyAuthDataStore } from "../../../stores/authData";

const dataStore = useMyAuthDataStore();

const userToken = ref<string | null>(dataStore.token);

const $router = useRouter();
const goBack = () => $router.back();

const koloSavings = reactive({
  fullname: "",
  email: "",
  address: "",
  phone: "",
  creditamount: "",
  debitsource: {
    label: "Wallet",
    value: "wallet",
  },
  creation_source: "mobile",
  longitude: dataStore.longitude,
  latitude: dataStore.latitude,
});

const koloSavingsError = reactive({
  fullname: "",
  email: "",
  address: "",
  phone: "",
  creditamount: "",
  debitsource: "",
});

const loading = ref(false);

const validateForm = () => {
  koloSavingsError.fullname = "";
  koloSavingsError.email = "";
  koloSavingsError.address = "";
  koloSavingsError.phone = "";
  koloSavingsError.creditamount = "";
  koloSavingsError.debitsource = "";

  if (!koloSavings.fullname) {
    koloSavingsError.fullname = "Full name is required";
  } else if (!koloSavings.email) {
    koloSavingsError.email = "Email is required";
  } else if (!koloSavings.address) {
    koloSavingsError.address = "Address is required";
  } else if (!koloSavings.phone) {
    koloSavingsError.phone = "Phone is required";
  } else if (!koloSavings.creditamount) {
    koloSavingsError.creditamount = "Credit amount is required";
  } else if (!koloSavings.debitsource) {
    koloSavingsError.debitsource = "Debit source  is required";
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
      "savings/create-kolo-savings",
      {
        ...koloSavings,
        debitsource: koloSavings.debitsource.value,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      await navigateTo("/savings/kolo");
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
