<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

const { name, label, errorMsg, modelValue, isMulti } = defineProps<{
  name: string;
  label: string;
  errorMsg: string;
  modelValue: string;
  isMulti?: boolean;
}>();
// const modelValue = defineModel<string | string[]>();

const format = (time: any) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

const emits = defineEmits(["update:modelValue"]);

const handleChange = (e: Event) => {
  emits("update:modelValue", e);
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="text-sm">{{ label }}</label>
    <p
      class="flex items-center w-full px-2 py-1 border border-gray-300 rounded-lg relative"
    >
      <VueDatePicker
        @update:model-value="handleChange"
        :model-value="modelValue"
        :format="format"
        hide-input-icon
        time-picker
      />

      <Icon name="ion:time-outline" size="20" color="#000000" />
    </p>
    <span v-if="$props.errorMsg" class="text-xs text-red-500 italic">{{
      $props.errorMsg
    }}</span>
  </div>
</template>

<style>
.dp__overlay_cell_active {
  background: #3861b4 !important;
}
.dp__active_date {
  background: #3861b4 !important;
}
.dp__active_date {
  border: none;
}
.dp__input {
  border: none;
}

.dp__range_start {
  background: #3861b4 !important;
}

.dp__range_end {
  background: #3861b4 !important;
}

.dp__menu {
  border-radius: 1rem;
  padding: 1rem;
}

.dp__today {
  border: 1px solid #3861b4;
}
</style>
