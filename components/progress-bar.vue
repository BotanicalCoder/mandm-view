<template>
  <div class="bg-gray-700 h-[0.4rem] w-full rounded-xl">
    <div
      :class="[
        completionPercent
          ? `bg-green-700 h-full rounded-xl max-w-full`
          : `bg-green-700 h-full rounded-xl`,
      ]"
      :style="`width:${completionPercent ? completionPercent : '1'}%`"
    ></div>
  </div>
</template>

<script setup lang="ts">
const { goal, current } = defineProps<{
  goal: number;
  current: number;
}>();

const completionPercent = computed(() => {
  return (current / goal) * 100;
});

watchEffect(() => {
  console.log(current);
  console.log(goal);
  console.log(completionPercent.value);
});
</script>

<style scoped></style>
