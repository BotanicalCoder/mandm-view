<template>
  <div
    class="h-18 w-[9.5rem] m-1 p-4 flex flex-col items-center gap-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-none focus:bg-none"
    @click="async () => navigate(link)"
  >
    <slot></slot>
    <p class="text-gray-500">{{ props.text }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  link: string;
  isExternal?: boolean;
}>();
const navigate = async (link: string) => {
  if (props.isExternal) {
    await navigateTo(link, {
      external: true,
    });
  } else {
    await navigateTo(link);
  }
};
</script>

<style scoped></style>
