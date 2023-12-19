<template>
  <div>
    <NuxtLayout name="savings">
      <form class="flex flex-col p-4 gap-4" @submit.prevent="creditUser">
        <h3 class="font-bold text-[1.5rem] flex items-center gap-2 pb-0 text-black">
          <Icon name="material-symbols:arrow-back-ios" size="20" color="black" class="cursor-pointer" @click="goBack" />

          Credit User
        </h3>

        <input-text type="number" label="Amount" placeholder="Enter amount no. " v-model="koloSavings.amount"
          :errorMsg="koloSavingsError.amount" :required="true" />

        <button
          class="border bg-[#3861b4] text-[white] rounded-lg w-full p-2 flex items-center justify-center gap-2 font-bold mb-0"
          type="submit">
          <Icon :name="loading ? 'line-md:loading-twotone-loop' : 'fluent:add-12-filled'
            " size="20" color="white" />
          {{ loading ? "Making transfer.." : "Make transfer" }}
        </button>
      </form>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import axiosinstance from "../../../../../libs/axiosinstance";
import { useMyAuthDataStore } from "../../../../../stores/authData";

const params = useRoute().params;

const dataStore = useMyAuthDataStore();

const userToken = ref<string | null>(dataStore.token);

const $router = useRouter();
const goBack = () => $router.back();

// @ts-ignore
const { userid } = params;

const koloSavings = reactive({
  amount: "",
  transfer_type: "credit",
  credit: "true",
});

const koloSavingsError = reactive({
  amount: "",
});

const loading = ref(false);

const validateForm = () => {
  koloSavingsError.amount = "";

  if (!koloSavings.amount) {
    koloSavingsError.amount = "Amount  is required";
  } else {
    return true;
  }
};

const creditUser = async () => {
  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  loading.value = true;

  try {
    const { data } = await axiosinstance.post<{
      id: number;
      success: boolean;
      message: string;
      error?: string;
    }>(
      "savings/create-koloajo-operations",
      {
        ...koloSavings,
        user_id: +userid,
        creation_source: "mobile",
        longitude: dataStore.longitude,
        latitude: dataStore.latitude,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken.value,
        },
      }
    );

    if (data.success) {
      let successMsg = data.message || data.success;

      toast.success(successMsg as string, {
        onClose: async () => await navigateTo("/savings/kolo"),
      });
    } else {
      let errorMsg = data.message || data.error;

      toast.error(errorMsg as string);
    }

    // await navigateTo("/savings/kolo");
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
