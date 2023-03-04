<template>
    <div class="max-w-[450px]">
        <h3 class="mb-8 text-2xl text-dark-violet font-bold max-[499px]:text-xl">{{ title }}</h3>

        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TheWorkout',
  props: ['title']
}
</script>

<style scoped>
div {
  @apply flex flex-col items-center py-8 bg-regular-yellow rounded-[32px] max-[499px]:w-full;
}
</style>
