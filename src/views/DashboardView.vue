<template>
  <main>
    <div class="py-12 px-8">
      <need-sign-in text="see your dashboard" />

      <div v-if="isSignedIn" class="flex flex-col items-center">
          <h2
            v-show="userWorkouts.length !== 0"
            class="mb-8 text-3xl text-center font-bold tracking-wider">
            Hello
            <span class="text-brown-color">{{ userName }}</span>,
            you can see your workouts below
          </h2>
          <h2
            v-show="userWorkouts.length === 0"
            class="mb-8 text-3xl text-center font-bold tracking-wider">
            {{ startMessage }}
          </h2>
          
          <masonry-wall :items="userWorkouts" :column-width="columnWidth" :gap="32">
            <template #default="{ item }">
                <div>
                  <the-workout
                    :title="item.workout_name"
                  >
                      <the-exercise
                        v-for="exercise in item.exercises"
                        :key="exercise" :img="exercise.img"
                        :name="exercise.name" :sets="exercise.sets"
                        :reps="exercise.reps"
                        :weight="exercise.weight"
                        :rest="exercise.rest"
                      >
                        <span
                        v-for="muscle in exercise.muscles"
                        :key="muscle"
                        class="px-2 mr-1 last:mr-0 text-xs bg-white-color rounded-full">
                        {{ muscle }}
                        </span>
                      </the-exercise>
                  </the-workout>
                </div>
            </template>
          </masonry-wall>

          <router-link :to="{ name: 'create' }">
            <the-button text="Add new workout" class="self-center mt-12" />
          </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '../stores/user'
import NeedSignIn from '../components/shared/NeedSignIn.vue'
import TheWorkout from '../components/shared/TheWorkout.vue'
import TheExercise from '../components/shared/TheExercise.vue'
import TheButton from '../components/shared/TheButton.vue'
import { supabase } from '../supabase'

export default {
  name: 'DashboardView',
  components: {
    NeedSignIn,
    TheWorkout,
    TheExercise,
    TheButton
  },
  data() {
    return {
      userName: '',
      userID: '',
      userWorkouts: [],
      isLoading: true,
      columnWidth: 0
    }
  },
  computed: {
    ...mapState(useUserStore, ['isSignedIn']),
    startMessage() {
      return this.isLoading && this.userWorkouts.length === 0 ? 'Loading' : 'Looks empty here...'
    }
  },
  async mounted() {
    if (this.isSignedIn) {
      const loader = this.$loading.show({
        backgroundColor: '#F7C873',
        canCancel: false,
        color: '#C96211',
        width: 80,
        height: 80,
        opacity: 1,
        loader: 'dots'
      })

      const { data: { user } } = await supabase.auth.getUser()

      const profile = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      if (!profile.error) {
        this.userName = profile.data.username
        this.userID = user.id
      }

      const { data } = await supabase
        .from('Workouts')
        .select()
      
      const allUserWorkouts = data.filter((item) => item.user_id === this.userID)
      allUserWorkouts.sort((a, b) => b.id - a.id)

      // eslint-disable-next-line max-len
      this.userWorkouts = allUserWorkouts.map(({ workout: { workout_name, exercises } }) => ({ workout_name, exercises }))
      
      setTimeout(() => {
        this.columnWidth = 400
      }, 1)
      
      loader.hide()
      this.isLoading = false
    }
  }
}
</script>

<style>
.workout-title {
  @apply flex flex-col items-center py-8 bg-regular-yellow rounded-[32px] max-[499px]:w-full;
}
</style>
