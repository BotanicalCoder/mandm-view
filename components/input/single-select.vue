<template>
  <div :class="'mx-auto w-[99%] relative' + props.zIndexParent">
    <label :for="props.name" class="block text-sm text-gray-700"
      >{{ props.label }}
    </label>
    <Combobox
      :model-value="props.modelValue"
      @update:model-value="handleChange"
    >
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus-within:border-[#3861b4] focus:outline-[#3861b4] focus-visible:ring-none focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3861b4] sm:text-sm"
        >
          <ComboboxButton
            :class="
              'relative w-full cursor-default h-12 rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-none focus-visible:ring-none focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm' +
              props.zIndexChild
            "
          >
            <ComboboxInput
              class="w-full border-none py-2 pl-0 pr-10 text-sm leading-5 text-gray-900 focus:ring-none outline-none"
              :displayValue="(item) => item.label"
              @change="query = $event.target.value"
            />

            <span
              class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <Icon name="uiw:down" size="20" />
            </span>
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredSelectItems.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="item in filteredSelectItems"
              as="template"
              :key="item.value"
              :value="item"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-white text-black': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{
                    'font-medium': item.label == props.modelValue.label,
                    'font-normal': item.label != props.modelValue.label,
                  }"
                >
                  {{ item.label }}
                </span>
                <span
                  v-if="item.label == props.modelValue.label"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-black': active, 'text-black': !active }"
                >
                  <Icon name="uiw:check" size="20" color="#00000" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
    <span v-if="props.errorMsg" class="text-xs text-red-500 italic">{{
      props.errorMsg
    }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
// import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";

let query = ref("");

const props = defineProps({
  label: String,
  options: Array,
  placeholder: String,
  name: String,
  modelValue: Object,
  // updateModelValue: Function,
  zIndex: String,
  zIndexParent: String,
  zIndexChild: String,
  errorMsg: String,
});

let filteredSelectItems = computed(() =>
  query.value === ""
    ? props.options.slice(0, 20)
    : props.options.filter((selectItem) =>
        selectItem.label
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const emits = defineEmits(["update:modelValue"]);

const handleChange = (e) => {
  emits("update:modelValue", e);
};
</script>
