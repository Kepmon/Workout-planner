<template>
  <section class="py-16 px-8 w-screen text-center">
    <div class="flex flex-col items-center mx-auto max-w-1200">
        <h2 class="pb-12 text-3xl text-center font-bold tracking-widest max-[499px]:text-2xl">Need some inspiration?</h2>
        <p class="mb-8 text-2xl text-center max-[499px]:text-xl">Take a look at other’s workouts below!</p>

        <div class="flex flex-col items-center py-8 bg-regular-yellow rounded-[32px] max-[499px]:w-full">
            <h3 class="mb-8 text-2xl text-dark-violet font-bold max-[499px]:text-xl">Plan's name</h3>

            <the-exercise img="/img/barbell_squat.gif" name="Barbell full squat" muscle="Legs" sets="3" reps="5" weight="45 kg" rest="01:00" />
            <the-exercise img="/img/b_hip_thrust.gif" name="Barbell hip thrust" muscle="Glutes, Legs" sets="3" reps="8" weight="85 kg" rest="01:00" />
            <the-exercise img="/img/cable_pullldown.gif" name="Cable pulldown" muscle="Back" sets="3" reps="12" weight="25 kg" rest="01:00" />
            <the-exercise img="/img/assisted_dips.gif" name="Machine assisted dips" muscle="Chest, Triceps" sets="3" reps="10" weight="25 kg" rest="01:00" />
            <the-exercise img="/img/calf_raise.gif" name="Calf raises" muscle="Calfs" sets="3" reps="15" weight="75 kg" rest="01:00" />
            <the-exercise img="/img/ab_wheel.gif" name="Ab-wheel rollout" muscle="Abs" sets="3" reps="10" weight="none" rest="01:00" />
        </div>

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
import TheExercise from './shared/TheExercise.vue'
import TheWorkout from './shared/TheWorkout.vue'

export default {
    name: 'InspirationSection',
    components: {
        TheButton,
        TheExercise,
        TheWorkout
    }

}
</script>

<style>

</style>