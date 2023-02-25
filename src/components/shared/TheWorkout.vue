<template>
    <div>
        <h3 class="mb-8 text-2xl text-dark-violet font-bold max-[499px]:text-xl">Plan's name</h3>

        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TheWorkout'
}
</script>

<style scoped>
div {
  @apply flex flex-col items-center py-8 bg-regular-yellow rounded-[32px] max-[499px]:w-full;
}
</style>
