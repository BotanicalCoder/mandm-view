<template>
  <div>
    <NuxtLayout name="savings">
      <div class="flex flex-col justify-center p-4 gap-1 text-[#003399]">
        <h3
          class="font-bold text-[1.5rem] flex items-center gap-2 pb-0 text-[#3861b4]"
        >
          Create Plan
        </h3>

        <div class="px-0 flex flex-col gap-3">
          <button
            class="border border-[#3861b4] text-[#3861b4] rounded-lg w-fit p-2 flex items-center gap-2 font-bold mb-2"
          >
            <Icon name="fluent:add-12-filled" size="20" color="#5e84d0" />

            Save
          </button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import formatToCurrency from "../../utils/formatToCurrency";
</script>

<style scoped></style>
