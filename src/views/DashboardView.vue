<template>
  <main>
    <the-toast
      v-show="isToastShown"
      :text="toast.text"
      :background="toast.color"
    />

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
              <transition name="workout" appear mode="out-in">
                <div class="relative">
                    <img
                      @click="() => deleteWorkout(item.id)"
                      src="/img/bin-svgrepo-com.svg"
                      alt="Delete workout"
                      title="Delete this workout"
                      class="absolute top-3 right-3 w-8 p-2 cursor-pointer"
                    >
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
              </transition>
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
import TheToast from '../components/shared/TheToast.vue'
import { supabase } from '../supabase'

export default {
  name: 'DashboardView',
  components: {
    NeedSignIn,
    TheWorkout,
    TheExercise,
    TheButton,
    TheToast
  },
  data() {
    return {
      userName: '',
      userID: '',
      userWorkouts: [],
      isLoading: true,
      columnWidth: 0,
      isToastShown: false,
      isError: false
    }
  },
  computed: {
    ...mapState(useUserStore, ['isSignedIn']),
    startMessage() {
      return this.isLoading && this.userWorkouts.length === 0 ? 'Loading' : 'Looks empty here...'
    },
    toast() {
      if (this.isError) {
        return {
          text: 'Ooops, something went wrong. Try again.',
          color: 'bg-toast-error'
        }
      }
      return {
        text: 'The selected workout has been successfully deleted.',
        color: 'bg-toast-info'
      }
    }
  },
  methods: {
    async deleteWorkout(el) {
      const { data, error } = await supabase
        .from('Workouts')
        .delete()
        .select()
        .eq('id', el)

      if (data) {
        this.isError = false

        this.userWorkouts = this.userWorkouts.filter((workout) => workout.id !== el)
      }

      if (error) {
        this.isError = true
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      this.isToastShown = true

      setTimeout(() => {
        this.isToastShown = false
      }, 3500)
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
      this.userWorkouts = allUserWorkouts.map(({ workout: { workout_name, exercises }, id }) => ({ workout_name, exercises, id }))
      
      setTimeout(() => {
        this.columnWidth = 400
      }, 1)
      
      loader.hide()
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.workout-enter-from,
.workout-leave-to {
  @apply scale-0 opacity-0
}

.workout-enter-active,
.workout-leave-active {
  @apply transition-all duration-500
}
</style>
