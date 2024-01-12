<template>
    <div>
        <table class="w-full">
            <thead>
                <tr class="bg-[#ebebeb]">
                    <td class=" text-[#171717] font-[700] p-4 text-sm capitalize"> Bank </td>
                    <td class=" text-[#171717] font-[700] p-4 text-sm capitalize"> Success rate </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center text-xs font-medium p-4 border border-l-0 capitalize whitespace-nowrap">
                        First Bank of
                        Nigeria</td>
                    <td :class="['text-center text-xs font-bold p-4 border border-r-0', 'bg-[#FF3B30] text-[#FFFFFF]']">
                        45.68%</td>

                </tr>

                <tr>
                    <td class="text-center text-xs font-medium p-4 border border-l-0 capitalize whitespace-nowrap">
                        First Bank of
                        Nigeria
                    </td>

                    <td :class="['text-center text-xs font-bold p-4 border border-r-0', 'bg-[#FF8331] text-[#FFFFFF]']">
                        64.8%
                    </td>
                </tr>

                <tr>
                    <td class="text-center text-xs font-medium p-4 border border-l-0 capitalize whitespace-nowrap">
                        First Bank of
                        Nigeria</td>

                    <td :class="['text-center text-xs font-bold p-4 border border-r-0', 'bg-[#1E9D3E] text-[#FFFFFF]']">
                        74.8%
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>