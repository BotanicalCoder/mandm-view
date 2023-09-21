<script setup lang="ts">
function onClickHandler(page: number) {
  emit("clickHandler", page);
}

const props = defineProps<{
  currentPage: number;
  totalItems: number;
}>();

const emit = defineEmits(["clickHandler"]);
</script>

<template>
  <div class="my-6 mx-auto w-full">
    <vue-awesome-paginate
      :total-items="props.totalItems"
      :items-per-page="3"
      :max-pages-shown="3"
      v-model="props.currentPage"
      :on-click="onClickHandler"
      :show-breakpoint-buttons="false"
      :hide-prev-next-when-ends="true"
    />
  </div>
</template>

<style>
.pagination-container {
  display: flex !important;
  column-gap: 10px;
  padding: 0rem;
  align-content: center;
  justify-content: center;
  margin: 0 auto;
}
.paginate-buttons {
  height: 2rem;
  width: 2rem;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: white;
  border: 1px solid white;
  color: black;
}
.paginate-buttons:hover {
  background-color: #f6f6f6;
}
.active-page {
  background-color: #ff791f;
  border: 1px solid #ff791f;
  color: white;
}
.active-page:hover {
  background-color: #ff791f;
}
</style>
