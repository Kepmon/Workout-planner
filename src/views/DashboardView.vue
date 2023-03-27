<template>
  <main>
    <the-toast
      v-show="isToastShown"
      :text="toast.text"
      :background="toast.color"
    />

    <div class="py-12 px-8">
      <need-sign-in text="see your dashboard" />

      <div v-if="userStore.isSignedIn" class="flex flex-col items-center">
          <h2
            v-if="userWorkouts.length !== 0"
            class="mb-8 text-3xl text-center font-bold tracking-wider">
            Hello
            <span class="text-brown-color">{{ userName }}</span>,
            you can see your workouts below
          </h2>
          <h2
            v-if="userWorkouts.length === 0"
            class="mb-8 text-3xl text-center font-bold tracking-wider">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
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
                      :title="item.name"
                    >
                        <the-exercise
                          v-for="exercise in item.exercises"
                          :key="exercise" :img="exercise.img"
                          :name="exercise.name" :sets="exercise.sets"
                          :reps="exercise.reps"
                          :weight="exercise.weight"
                          :unit="exercise.unit"
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
            <the-button v-if="!isLoading" text="Add new workout" class="self-center mt-12" />
          </router-link>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { handleModal } from '../composables/handleModal'
import { supabase } from '../supabase'
import { Workout, WholeWorkout, WorkoutResponse, UserResponse } from '../api/types'
import NeedSignIn from '../components/shared/NeedSignIn.vue'
import TheWorkout from '../components/shared/TheWorkout.vue'
import TheExercise from '../components/shared/TheExercise.vue'
import TheButton from '../components/shared/TheButton.vue'
import TheToast from '../components/shared/TheToast.vue'

const userWorkouts = ref<Workout[]>([])
const isError = ref(false)

const toast = computed(() => {
  if (isError.value) {
    return {
      text: 'Ooops, something went wrong. Try again.',
      color: 'bg-toast-error'
    }
  }
  return {
    text: 'The selected workout has been successfully deleted.',
    color: 'bg-toast-info'
  }
})

const isToastShown = ref(false)
const deleteWorkout = async (el: number) => {
  const { data, error } = await supabase
  .from('Workouts')
  .delete()
  .eq('id', el) 
  .select() as WorkoutResponse
  
  if (data) {
    isError.value = false
    
    userWorkouts.value = userWorkouts.value.filter((workout) => workout.id !== el)
  }
  
  if (error) {
    isError.value = true
  }
  
  handleModal(isToastShown, true)
}

const userName = ref('')
const userID = ref('')
const isLoading = ref(true)
const columnWidth = ref(0)
const userStore = useUserStore()
const loadUserWorkouts = async () => {
  if (userStore.isSignedIn) {
    const { data: { user } }: { data: UserResponse['data'] } = await supabase.auth.getUser() as UserResponse

    const profile = await supabase
      .from('profiles')
      .select('username')
      .eq('user_id', user.id)
      .single()

    if (!profile.error) {
      userName.value = profile.data.username
      userID.value = user.id
    }

    const { data } = await supabase
      .from('Workouts')
      .select() as WorkoutResponse
    
    if (data !== null) {
      const allWorkouts: WholeWorkout[] = data.filter((item: WholeWorkout) => item.user_id === userID.value)
      allWorkouts.sort((a, b) => b.id - a.id)
  
      userWorkouts.value = allWorkouts.map(
        ({ workout: { name, exercises }, id }) => ({ name, exercises, id })
      )
      
      setTimeout(() => {
        columnWidth.value = 400
      }, 1)
      
      isLoading.value = false
    }
  }
}

onMounted(loadUserWorkouts)
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

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #C96211;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
