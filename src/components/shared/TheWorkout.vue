<template>
  <div class="max-w-[450px] max-[300px]:max-w-[150px]">
    <h3 class="mb-8 text-2xl text-dark-violet font-bold max-[499px]:text-xl">
      {{ title }}
    </h3>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped>
div {
  @apply flex flex-col items-center py-8 bg-regular-yellow rounded-[32px];
}
</style>
