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
  @apply max-[499px]:text-[16px] max-[499px]:py-2 max-[499px]:px-10
}
</style>
