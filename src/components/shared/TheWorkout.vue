<template>
    <div class="flex flex-col items-center py-8 bg-regular-yellow rounded-[32px] max-[499px]:w-full">
        <h3 class="mb-8 text-2xl text-dark-violet font-bold max-[499px]:text-xl">Plan's name</h3>

        <slot></slot>
    </div>
</template>

<script>
import TheExercise from './TheExercise.vue'

export default {
    name: 'TheWorkout',
    props: ['name'],
    components: {
        TheExercise
    }
}
</script>