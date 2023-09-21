<template>
  <div class="w-full px-4 pt-4">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between gap-4 items-center rounded-lg bg-orange-100 px-4 py-2 text-left text-sm font-medium text-gray-500 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
        @click="handleToggle(open)"
      >
        <p class="w-[80%]">{{ props.item.question }}</p>

        <Icon
          name="lucide:chevron-down"
          size="20"
          color="black"
          class="select-none w-8"
          :class="open ? 'rotate-180 transform' : ''"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
        <p>
          {{ props.item.answer }}
        </p>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import axiosinstance from "@/libs/axiosinstance";

const props = defineProps({
  item: { question: String, answer: String, id: Number },
});

const handleToggle = async (open) => {
  try {
    // console.log(open);

    // console.log("toggling");

    if (!open) {
      let res = await axiosinstance.post(`/faq/update-view`, {
        faqid: props.item.id,
      });

      console.log(res);
      if (res.data) {
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// watchEffect(() => console.log(props.item));
</script>
