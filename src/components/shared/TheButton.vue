<template>
  <button>
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String
  }
})
</script>

<style scoped>
button {
  @apply bg-brown-color py-3 px-8 text-lg font-bold rounded-full shadow-3xl hover:bg-button-hover;
  @apply transition-all duration-300;
  @apply max-[500px]:text-sm max-[500px]:py-2 max-[500px]:px-5 max-[500px]:w-[140px];
}
</style>
