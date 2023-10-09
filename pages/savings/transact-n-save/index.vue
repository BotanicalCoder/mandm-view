<template>
  <div>
    <NuxtLayout name="savings">
      <div class="flex flex-col justify-center p-4 gap-1 text-[#003399]">
        <h3
          class="font-bold text-[1.5rem] flex items-center gap-2 pb-0 text-[#3861b4]"
        >
          Transact And Save
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <div class="flex gap-3 flex-wrap justify-between">
            <div
              class="h-[3rem] text-[#3861b4] rounded flex items-center justify-center font-bold text-lg"
            >
              {{ formatToCurrency(Number(1000000), true, true, "NGN") }}
              Invested
            </div>
            <div
              class="h-[3rem] text-[#3861b4] rounded flex items-center justify-center font-bold text-lg"
            >
              {{ formatToCurrency(Number(1000), true, true, "NGN") }} Gained
            </div>
          </div>

          <button
            class="border border-[#3861b4] text-[#3861b4] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-0"
            @click="async () => navigateTo('/savings/transact-n-save/create')"
          >
            <Icon name="fluent:add-12-filled" size="20" color="#5e84d0" />

            Create Plan
          </button>

          <div class="flex justify-between mt-2">
            <button
              @click="updateCurrTab('savings')"
              :class="[
                currTab == 'savings' ? 'border-b-4 border-b-[#003399] ' : '',
              ]"
              >Savings</button
            >
            <button
              @click="updateCurrTab('transactions')"
              :class="
                currTab == 'transactions'
                  ? 'border-b-4 border-b-[#003399] '
                  : ''
              "
              >Transactions</button
            >
          </div>
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex flex-col">
              <h4 class="text-base font-medium">Transact And Save </h4>
              <p class="text-xs font-medium">Save a part of your earnings</p>
            </div>

            <div class="flex flex-col">
              <h4 class="text-base font-medium">Tran </h4>
              <p class="text-xs font-medium">Save to meet your set goal</p>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import formatToCurrency from "../../utils/formatToCurrency";
const currTab = ref("savings");
const updateCurrTab = (tab: string) => {
  currTab.value = tab;
};
</script>

<style scoped></style>
