<template>
    <div>
        <table class="w-full">
            <thead>
                <tr class="bg-[#ebebeb]">
                    <td class=" text-[#171717] font-[700] p-4 text-sm capitalize"> Category </td>
                    <td class=" text-[#171717] font-[700] p-4 text-sm capitalize"> Product </td>
                    <td class="text-[#171717] font-[700] p-4 text-sm capitalize"> Success Rate </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left text-xs font-medium p-4 border border-l-0 capitalize whitespace-nowrap">
                        Airtime
                    </td>
                    <td class="text-left text-xs font-bold p-4 capitalize border">
                        9Mobile
                    </td>
                    <td :class="['text-left text-xs font-bold p-4 border border-r-0', 'bg-[transparent] text-[#000000]']">
                        n/a
                    </td>


                </tr>

                <tr>
                    <td class="text-left text-xs font-medium p-4 border border-l-0 capitalize whitespace-nowrap">
                        Mobiledata
                    </td>
                    <td class="text-left text-xs font-bold p-4  border">
                        Airtel
                    </td>

                    <td :class="['text-left text-xs font-bold p-4 border border-r-0', 'bg-[#FF8331] text-[#FFFFFF]']">
                        64.8%
                    </td>
                </tr>

                <tr>
                    <td class="text-left text-xs font-medium p-4 border border-l-0 capitalize whitespace-nowrap">
                        Airtime
                    </td>
                    <td class="text-left text-xs font-bold p-4 capitalize border">
                        n/a
                    </td>
                    <td :class="['text-left text-xs font-bold p-4 border border-r-0', 'bg-[#1E9D3E] text-[#FFFFFF]']">
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