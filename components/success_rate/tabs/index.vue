<template>
    <div class="w-full max-w-md py-2 sm:px-0">
        <TabGroup>
            <TabList class="flex space-x-1 rounded-xl bg-transparent p-1">
                <Tab v-for="category in headers" as="template" :key="category" v-slot="{ selected }">
                    <button :class="[
                        'w-full py-2.5 text-sm font-medium leading-5 outline-none focus:outline-none ',
                        selected
                            ? 'bg-white text-[#FF6600] border-b border-b-[#FF6600]'
                            : 'text-[#B8B8B8]',
                    ]">
                        {{ category }}
                    </button>
                </Tab>
            </TabList>

            <TabPanels class="mt-2 px-[0.5rem]">
                <TabPanel>
                    <success_rate-tabs-withdrawal-table />
                </TabPanel>

                <TabPanel>
                    <success_rate-tabs-transfer-table />
                </TabPanel>

                <TabPanel>
                    <success_rate-tabs-vas-table />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>
  
<script setup>
// import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const headers = [
    "Withdrawal",
    "Transfer",
    "VAS"
]


</script>
  