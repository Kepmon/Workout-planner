<template>
  <main>
    <div class="py-12">
      <need-sign-in text="see your dashboard" />

      <div v-if="isSignedIn === 'true'" class="flex flex-col justify-center">
          <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">See your workouts below</h2>

          <div class="flex flex-col items-center py-8 bg-regular-yellow rounded-[32px] max-[499px]:w-full">
              <h3 class="mb-8 text-2xl text-dark-violet font-bold max-[499px]:text-xl">Plan's name</h3>

              <the-exercise img="/img/barbell_squat.gif" name="Barbell full squat" muscle="Legs" sets="3" reps="5" weight="45 kg" rest="01:00" />
              <the-exercise img="/img/b_hip_thrust.gif" name="Barbell hip thrust" muscle="Glutes, Legs" sets="3" reps="8" weight="85 kg" rest="01:00" />
              <the-exercise img="/img/cable_pullldown.gif" name="Cable pulldown" muscle="Back" sets="3" reps="12" weight="25 kg" rest="01:00" />
              <the-exercise img="/img/assisted_dips.gif" name="Machine assisted dips" muscle="Chest, Triceps" sets="3" reps="10" weight="25 kg" rest="01:00" />
              <the-exercise img="/img/calf_raise.gif" name="Calf raises" muscle="Calfs" sets="3" reps="15" weight="75 kg" rest="01:00" />
              <the-exercise img="/img/ab_wheel.gif" name="Ab-wheel rollout" muscle="Abs" sets="3" reps="10" weight="none" rest="01:00" />
          </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '../stores/user'
import NeedSignIn from '../components/shared/NeedSignIn.vue'
import TheExercise from '../components/shared/TheExercise.vue'

export default {
  name: 'DashboardView',
  components: {
    NeedSignIn,
    TheExercise
  },
  computed: {
    ...mapState(useUserStore, ['isSignedIn'])
  }
}
</script>

<style>

</style>