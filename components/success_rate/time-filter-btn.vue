<template>
    <div class="" :class="['rounded-[2.375rem] h-[2.438rem] py-[0.625rem] px-[1.125rem] flex items-center', text === activeText ? 'bg-[#003399] text-[#F2F2F2]' :
        'bg-transparent text-[#B8B8B8] font-[600] ']" @click="updateActiveFilter(text)">
        {{ text }}
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits<{
    (e: 'updateFilter', text: string): void
}>()

function updateActiveFilter(text: string) {
    emit('updateFilter', text);
}

const { text, activeText } = defineProps<{ text: string, activeText: string }>()

</script>

<style scoped></style>