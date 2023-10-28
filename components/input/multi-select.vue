<template>
  <div :class="'mx-auto w-[99%] relative' + props.zIndexParent">
    <label :for="props.name" class="block text-sm text-gray-700"
      >{{ props.label }}
    </label>
    <Combobox
      :model-value="props.modelValue"
      @update:model-value="handleChange"
      multiple
    >
      <ul v-if="props.modelValue.length > 0">
        <li
          v-for="(item, index) in props.modelValue"
          :key="item?.value"
          class="bg-[#3861b4] m-1 p-1 rounded-md text-sm text-white flex justify-between items-center"
        >
          {{ item?.label }}
          <Icon
            :name="'system-uicons:close'"
            size="20"
            color="white"
            @click="() => unselectSelected(index)"
          />
        </li>
      </ul>

      <ComboboxButton
        :class="
          'relative w-full cursor-default h-12 rounded-lg bg-white py-2  text-left focus:outline-none focus-visible:border-none focus-visible:ring-none focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm' +
          props.zIndexChild
        "
      >
        <ComboboxInput
          class="w-full rounded-md border-none py-2 pl-2 pr-10 text-sm text-gray-900 focus:ring-none outline-none"
          :displayValue="(item) => item?.label"
          @change="query = $event.target.value"
        />

        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <Icon name="uiw:down" size="20" />
        </span>
      </ComboboxButton>

      <ComboboxOptions :key="item?.value" :value="item" class="bg-white p-2">
        <ComboboxOption
          v-for="item in filteredSelectItems"
          :key="item?.value"
          :value="item"
          class="p-1"
        >
          {{ item.label }}
        </ComboboxOption>
      </ComboboxOptions>
    </Combobox>

    <span v-if="props.errorMsg" class="text-xs text-red-500 italic">{{
      props.errorMsg
    }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/vue";

const open = ref(true);

// const selected = ref([]);

const unselectSelected = (id) => {
  props.modelValue.splice(id, 1);
};

let query = ref("");

const props = defineProps({
  label: String,
  options: Array,
  placeholder: String,
  name: String,
  modelValue: Object,
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

// http://localhost:3000/savings?data={%22tid%22:%222057Q3G3%22,%22token%22:%22eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNyIsImp0aSI6ImVjYTNjNjgyMjA2N2RmYzI1MTg5ZmI4MTY0MTUwOTMyNmZjMjcxNzJkZTJhZjBiMjlkNWZhNGIxODcwZjk4MzE4MTViYzdiYjU1YjJjMjMyIiwiaWF0IjoxNjk4NDMxNTc4Ljc1ODQwNCwibmJmIjoxNjk4NDMxNTc4Ljc1ODQwNywiZXhwIjoxNzMwMDUzOTc4Ljc1NzE5MSwic3ViIjoiNzE0MjEiLCJzY29wZXMiOlsiKiJdfQ.jpcnyi56TON9_rQpyn65vEdgPtepjYgiClgULc17nN709DugnB-KwzYxHbp6SGamNipDm2msYEzArh2rqdUTzzf1TediWI8GfeKOS-8IXEw_7Ey62uSoP3lpCZfjePuyTWDeAPNHGP1S7CQ8ZGAsq9lPAMO9Hqv6SdsXrIXH0ZqC7oOfvXSULFaI6l5qnPFqsd18W9KmgoGYeMzFvNEnH3XdyxQODrl1y0xoyn1wHq2rB8SbOtH6kBPOT6qDgmO499xXDUdGD8dIzeHmXxpt9mJdtKXZhw283ltGZrJg1NLpdRJ6m2G21H2c9SrKZgKRL2DRJGdmE-WY7Qq3DTcPY47JviqXEHKyKZio88D28xvUzcoyE8St-orK1Lwl_AJbPqwKfr_8a9oGIQUEupAIdiu1YjnVsCjPGfEkyDV6ONmFkwcOaqCwNy4hztAK2ylDT5F4-QDuiHsFoYHqoIyYeJZOIWyI-Oz25ay-ryUExnNYXuBIPHUpeYx60l64dLvELesxPuzQIIiA0taNpLyYNuywYw9JypjaznuxGg03TWcigX0lz6F3E8kgn8OLugSKygSid3VonUPVBlHkawsuwG88V_HhMxGHlBH1oGo5XTtcjMxe2OlnogmHKuEYppw4Sz2FG_o0rOC1CxYM3VWBqbp1zzoKsJSeXHdOG9xLVHA%22,%22longitude%22:%22237464.13%22,%22latitude%22:%2210928.26%22}
</script>
