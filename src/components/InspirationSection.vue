<template>
  <section class="py-16 px-8 w-screen text-center">
    <div class="flex flex-col items-center mx-auto max-w-1200">
        <h2 class="pb-12 text-3xl text-center font-bold tracking-widest max-[499px]:text-2xl">
            Need some inspiration?
        </h2>
        <p class="mb-8 text-2xl text-center max-[499px]:text-xl">
            {{ message }}
        </p>

        <div class="grid grid-cols-2 gap-8 max-[799px]:grid-cols-1">
            <the-workout v-for="workout in workouts" :key="workout" :title="workout.workout_name">
                <the-exercise
                    v-for="exercise in workout.exercises"
                    :key="exercise" :img="exercise.img"
                    :name="exercise.name" :sets="exercise.sets"
                    :reps="exercise.reps"
                    :weight="exercise.weight"
                    :rest="exercise.rest">
                    <span
                        v-for="muscle in exercise.muscles"
                        :key="muscle"
                        class="px-2 mr-1 last:mr-0 text-xs bg-white-color rounded-full">
                        {{ muscle }}
                    </span>
                </the-exercise>
            </the-workout>
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
import TheWorkout from './shared/TheWorkout.vue'
import TheExercise from './shared/TheExercise.vue'
import { supabase } from '../supabase'

export default {
  name: 'InspirationSection',
  components: {
    TheButton,
    TheWorkout,
    TheExercise
  },
  data() {
    return {
      workouts: [],
      isError: false
    }
  },
  computed: {
    message() {
      return this.isError ? 'Ooops, something went wrong when fetching data. Try refreshing the page.' : 'Take a look at other’s workouts below!'
    }
  },
  async mounted() {
    const fetchWorkouts = async () => {
      const response = await supabase.from('Workouts').select()
      if (response.error === null) {
        const { data } = response
    
        data.forEach((item) => {
          const { workout } = item
          this.workouts.push(workout)
        })

        this.isError = false
      } else {
        this.isError = true
      }
    }

    await fetchWorkouts()
  }
}
</script>

<style scoped>
.workout-title {
    @apply flex flex-col items-center py-8 bg-regular-yellow rounded-[32px] max-[499px]:w-full;
}
</style>
