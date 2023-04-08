<template>
  <section class="py-16 px-8 w-screen text-center">
    <div class="flex flex-col items-center mx-auto max-w-1200">
      <h2
        class="pb-12 text-3xl text-center font-bold tracking-widest max-[499px]:text-2xl"
      >
        Need some inspiration?
      </h2>
      <p class="mb-8 text-2xl text-center max-[499px]:text-xl">
        {{ message }}
      </p>

      <div
        class="flex justify-between w-full gap-x-10 max-[500px]:gap-6 max-[400px]:gap-4"
      >
        <img
          class="w-8 cursor-pointer max-[500px]:w-5"
          src="/img/chevrons-left-alt-svgrepo-com.svg"
          alt="previous workout"
          @click="previousSlide"
        />
        <transition-group name="workout">
          <the-workout
            v-for="workout in currentWorkout"
            :key="workout.name"
            :title="workout.name"
          >
            <the-exercise
              v-for="exercise in workout.exercises"
              :key="exercise.name"
              :img="exercise.img"
              :name="exercise.name"
              :sets="exercise.sets"
              :reps="exercise.reps"
              :weight="exercise.weight"
              :unit="exercise.unit"
              :rest="exercise.rest"
            >
              <span
                v-for="muscle in exercise.muscles"
                :key="muscle"
                class="px-2 mr-1 last:mr-0 text-xs bg-white-color rounded-full"
              >
                {{ muscle }}
              </span>
            </the-exercise>
          </the-workout>
        </transition-group>
        <img
          class="w-8 cursor-pointer max-[500px]:w-5"
          src="/img/chevrons-right-alt-svgrepo-com.svg"
          alt="next workout"
          @click="nextSlide"
        />
      </div>

      <div class="mt-20">
        <router-link :to="{ name: 'create' }">
          <the-button text="Create your own workout" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import TheButton from "./shared/TheButton.vue";
import TheWorkout from "./shared/TheWorkout.vue";
import TheExercise from "./shared/TheExercise.vue";
import { supabase } from "../supabase";
import { Workout, WholeWorkout, SupabaseResponse } from "../api/types";

const workouts = ref<Workout[]>([]);
const isError = ref(false);
const message = computed(() =>
  isError.value
    ? "Ooops, something went wrong when fetching data. Try refreshing the page."
    : "Take a look at others' workouts below!"
);

const fetchWorkouts = async () => {
  const response = (await supabase
    .from("Workouts")
    .select()) as SupabaseResponse<WholeWorkout>;

  if (response.error == null) {
    const { data }: { data: SupabaseResponse<WholeWorkout>["data"] } = response;

    if (data != null) {
      workouts.value = data.map(({ workout: { name, exercises } }) => ({
        name,
        exercises,
      }));
    }

    isError.value = false;
  } else {
    isError.value = true;
  }
};

onMounted(fetchWorkouts);

const slideIndex = ref(0);
const currentWorkout = computed(() =>
  workouts.value.filter(
    (workout) => workout === workouts.value[slideIndex.value]
  )
);

const nextSlide = () => {
  slideIndex.value += 1;

  if (!workouts.value[slideIndex.value]) {
    slideIndex.value = 0;
  }
};

const previousSlide = () => {
  slideIndex.value -= 1;

  if (!workouts.value[slideIndex.value]) {
    slideIndex.value = workouts.value.length - 1;
  }
};
</script>

<style scoped>
.workout-title {
  @apply flex flex-col items-center py-8 bg-regular-yellow rounded-[32px] max-[499px]:w-full;
}

.workout-enter-from {
  @apply translate-x-32 opacity-0;
}

.workout-enter-active {
  @apply transition-all duration-500;
}
</style>
