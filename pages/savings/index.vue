<template>
  <div>
    <NuxtLayout name="savings">
      <div class="flex flex-col justify-center p-4 gap-4 text-[#003399]">
        <h3
          class="font-bold text-[1.5rem] flex items-center gap-2 pb-1 text-[#3861b4]"
          >Here's how you save with us
          <!-- <Icon name="clarity:coin-bag-line" size="20" /> -->
        </h3>

        <div class="px-2 flex flex-col gap-2">
          <div class="flex gap-3 flex-wrap justify-between">
            <div
              class="w-full h-[3.5rem] bg-[#3861b4] rounded text-white flex items-center justify-center"
            >
              {{ formatToCurrency(Number(1000000), true, true, "NGN") }}
              Invested
            </div>
            <div
              class="w-full h-[3.5rem] bg-[#3861b4] rounded text-white flex items-center justify-center"
            >
              {{ formatToCurrency(Number(1000), true, true, "NGN") }} Gained
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex gap-2 p-2 rounded">
              <Icon name="codicon:target" size="40" color="#5e84d0" />

              <div class="flex items-center gap-2">
                <div class="flex flex-col">
                  <div class="flex flex-col">
                    <h4 class="text-base font-medium">Transact And Save </h4>
                    <p class="text-xs font-medium"
                      >Save a part of your earnings</p
                    >
                  </div>
                  <p class="font-bold text-sm text-[#3861b4]">
                    {{ formatToCurrency(Number(0), false, true, "NGN") }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex gap-2 p-1">
              <Icon name="game-icons:locked-chest" size="40" color="#5e84d0" />

              <div class="flex items-center gap-2">
                <div class="flex flex-col">
                  <div class="flex flex-col">
                    <h4 class="text-base font-medium">Fixed Savings </h4>
                    <p class="text-xs font-medium">Save for a fixed period</p>
                  </div>
                  <p class="font-bold text-sm text-[#3861b4]">
                    {{ formatToCurrency(Number(0), false, true, "NGN") }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex gap-2 p-1">
              <Icon name="game-icons:piggy-bank" size="40" color="#5e84d0" />

              <div class="flex items-center gap-2">
                <div class="flex flex-col">
                  <div class="flex flex-col">
                    <h4 class="text-base font-medium">Ajo Savings </h4>
                    <p class="text-xs font-medium">
                      Run an Ajo from your pos
                    </p>
                  </div>
                  <p class="font-bold text-sm text-[#3861b4]">
                    {{ formatToCurrency(Number(0), false, true, "NGN") }}
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
// import { Icon } from "#components";
import target_savings from "../../assets/lottie/target_savings.json";
import formatToCurrency from "../../utils/formatToCurrency";
</script>

<style scoped></style>
