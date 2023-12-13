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

  return `${day}/${month}/${year}`;
};

const intervalType = ref("");

const selectToday = (closePicker: any) => {
  handleChange([moment().format(), moment().format()]);
  intervalType.value = "1 day";
  closePicker();
};

const selectLast3Days = (closePicker: any) => {
  handleChange([moment().format(), moment().subtract(2, "d").format()]);

  intervalType.value = "3 days";

  closePicker();
};

const selectLast7Days = (closePicker: any) => {
  handleChange([moment().format(), moment().subtract(6, "d").format()]);

  intervalType.value = "7 days";

  closePicker();
};

const selectLast30Days = (closePicker: any) => {
  handleChange([moment().format(), moment().subtract(29, "d").format()]);

  intervalType.value = "30 days";

  closePicker();
};

const emits = defineEmits(["update:modelValue"]);

const handleChange = (e: any) => {
  emits("update:modelValue", e);
};

watchEffect(async () => {
  if (isMulti) {
    const dateDiff = moment(modelValue.value && modelValue.value[0]).diff(
      modelValue.value && modelValue.value[1],
      "d"
    );

    if (dateDiff == 0) {
      return (intervalType.value = "1 day");
    }
    if (dateDiff == 2) {
      return (intervalType.value = "3 days");
    }
    if (dateDiff == 6) {
      return (intervalType.value = "7 days");
    }
    if (dateDiff == 29) {
      return (intervalType.value = "30 days");
    } else {
      return (intervalType.value = "");
    }
  }
});
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
        :multi-calendars="$props.isMulti"
        :range="$props.isMulti"
        :keep-action-row="$props.isMulti"
        :min-date="new Date(Date.now())"
      >
        <template
          #action-row="{ internalModelValue, selectDate, closePicker }"
          v-if="$props.isMulti"
        >
          <div class="flex flex-wrap gap-2">
            <button
              class="w-fit px-3 py-1 rounded-[2rem] hover:bg-gray-100"
              :class="
                intervalType == '1 day'
                  ? ' text-white bg-[#3861b4] hover:text-black'
                  : 'text-black bg-white border border-black '
              "
              @click="() => selectToday(closePicker)"
            >
              1 Day
            </button>

            <button
              class="w-fit px-3 rounded-[2rem] hover:bg-gray-100"
              :class="
                intervalType == '3 days'
                  ? 'text-white bg-[#3861b4] hover:text-black'
                  : 'text-black bg-white border border-black '
              "
              @click="() => selectLast3Days(closePicker)"
            >
              3 Days
            </button>

            <button
              class="w-fit px-3 rounded-[2rem] hover:bg-gray-100"
              :class="
                intervalType == '7 days'
                  ? 'text-white bg-[#3861b4] hover:text-black'
                  : 'text-black bg-white border border-black'
              "
              @click="() => selectLast7Days(closePicker)"
            >
              7 Days
            </button>

            <button
              class="w-fit px-3 rounded-[2rem] hover:bg-gray-100"
              :class="
                intervalType == '30 days'
                  ? 'text-white bg-[#3861b4] hover:text-black'
                  : ' text-black bg-white border border-black'
              "
              @click="() => selectLast30Days(closePicker)"
            >
              30 Days
            </button>
          </div>
        </template>
      </VueDatePicker>
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
