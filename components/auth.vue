<template>
  <div>
    <p>{{ androidVariable }}</p>
  </div>
</template>

<script lang="ts" setup>
let respon = ref("");
let win = ref();
const androidVariable = ref("");

onMounted((data) => {
  console.log(data)
  if (process.client) {
    // Access the variable from Android
    if (window.Android && window.Android.getVariable) {
      androidVariable.value = window.Android.getVariable();
    } else {
      androidVariable.value = "Android interface or method not available.";
    }
  }
});
</script>

<style></style>
