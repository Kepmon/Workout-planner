<template>
  <button>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'TheButton',
  props: ['text']
}
</script>
<style scoped>
button {
  @apply bg-brown-color py-3 px-8 text-lg font-bold rounded-full shadow-3xl;
  @apply max-[500px]:text-sm max-[500px]:py-2 max-[500px]:px-5 max-[500px]:w-[140px]
}
</style>
