<template>
  <section class="py-16 px-8 w-screen text-center">
    <div class="flex flex-col items-center mx-auto max-w-1200">
        <h2 class="pb-12 text-3xl text-center font-bold tracking-widest max-[499px]:text-2xl">Need some inspiration?</h2>
        <p class="mb-8 text-2xl text-center max-[499px]:text-xl">Take a look at other’s workouts below!</p>

        <the-workout />

        <div class="mt-20">
            <router-link :to="{ name: 'create' }">
                <the-button text="Create your own workout" />
            </router-link>
        </div>
    </div>
  </section>
</template>

<script>
import TheButton from './shared/TheButton.vue'
import TheWorkout from './shared/TheWorkout.vue'

export default {
    name: 'InspirationSection',
    components: {
        TheButton,
        TheWorkout
    }

}
</script>

<style>

</style>