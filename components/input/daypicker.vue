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

const format = (date: any) => {
  if (isMulti) {
    const day1 = date[0].getDate();
    const month1 = date[0].getMonth() + 1;
    const year1 = date[0].getFullYear();

    const day2 = date[1].getDate();
    const month2 = date[1].getMonth() + 1;
    const year2 = date[1].getFullYear();

    return `${day1}/${month1}/${year1} - ${day2}/${month2}/${year2}`;
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}`;
};

const intervalType = ref("");

const emits = defineEmits(["update:modelValue"]);

const handleChange = (e: any) => {
  emits("update:modelValue", e);
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="text-sm">{{ label }}</label>
    <p
      class="flex items-center w-full px-2 py-1 border border-gray-300 rounded-lg relative bg-white"
    >
      <VueDatePicker
        @update:model-value="handleChange"
        :model-value="modelValue"
        :enable-time-picker="false"
        :clearable="false"
        :format="format"
        hide-input-icon
        auto-apply
        disable-month-year-select
      />

      <!-- <component :is="CalendarIcon" class="w-5 h-5 text-gray-500" /> -->
      <Icon name="solar:calendar-outline" size="20" color="#000000" />
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
