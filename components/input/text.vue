<template>
  <div class="flex flex-col gap-1">
    <label>
      {{ label }}
    </label>

    <input
      :required="required"
      :placeholder="placeholder"
      @input="handleChange"
      :value="modelValue"
      :pattern="pattern"
      :type="type || 'text'"
      class="border border-1 p-2 rounded-lg focus:border-[#3861b4] focus:outline-[#3861b4]"
    />

    <span v-if="errorMsg" class="text-xs text-red-500 italic">{{
      errorMsg
    }}</span>
  </div>
</template>

<script lang="ts" setup>
const { label, placeholder, modelValue, errorMsg, pattern, required } =
  defineProps<{
    label: string;
    placeholder: string;
    modelValue: string | number;
    required?: boolean;
    type?: string;
    pattern?: string;
    errorMsg?: string;
  }>();

const emits = defineEmits(["update:modelValue"]);

const handleChange = (e: Event) => {
  const target = <HTMLInputElement>e.target;
  emits("update:modelValue", target.value);
};
</script>

<style></style>
