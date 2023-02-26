<template>
  <transition name="toast">
    <p :class="background" class="z-10">{{ text }}</p>
  </transition>
</template>

<script>
export default {
  name: 'TheToast',
  props: ['text', 'background']
}
</script>

<style scoped>
p {
  @apply absolute top-12 py-11 px-20 rounded-3xl;
  @apply max-[500px]:py-10 max-[500px]:px-4 max-[400px]:text-sm max-[400px]:px-4 max-[400px]:py-8;
  @apply max-[350px]:text-xs max-[350px]:px-3;
}

.toast-enter-from,
.toast-leave-to {
  @apply opacity-0 -translate-y-40;
}

.toast-enter-active,
.toast-leave-active {
  @apply transition-all duration-500;
}
</style>
