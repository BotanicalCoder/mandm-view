<template>
  <div class="flex flex-col gap-1">
    <label>
      {{ label }}
    </label>

    <input
      type="text"
      :placeholder="placeholder"
      @input="handleChange"
      :value="modelValue"
      class="border border-1 p-2 rounded-lg focus:border-[#3861b4] focus:outline-[#3861b4]"
    />

    <span v-if="errorMsg" class="text-xs text-red-500 italic">{{
      errorMsg
    }}</span>
  </div>
</template>

<script lang="ts" setup>
const { label, placeholder, modelValue, errorMsg } = defineProps<{
  label: string;
  placeholder: string;
  modelValue: string | number;
  errorMsg?: string;
}>();

const emits = defineEmits(["update:modelValue"]);

const handleChange = (e: Event) => {
  const target = <HTMLInputElement>e.target;
  emits("update:modelValue", target.value);
};
</script>

<style></style>
