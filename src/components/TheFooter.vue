<template>
  <p>
    Copyright &copy; SmartGym &nbsp;
    <span>{{ year }}</span>
  </p>
</template>

<script setup lang="ts">
import { ref } from "vue";

const year = ref(new Date().getFullYear());
</script>

<style scoped>
p {
  @apply flex items-center justify-center px-6 bg-dark-yellow w-screen h-24 text-center;
  @apply max-[499px]:text-sm;
}
</style>
