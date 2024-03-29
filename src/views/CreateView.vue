<template>
  <main>
    <the-toast
      v-show="isToastShown"
      :text="toast.text"
      :background="toast.color"
    />

    <div class="py-12">
      <need-sign-in text="create a workout" />

      <div v-if="userStore.isSignedIn" class="flex flex-col justify-center">
        <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">
          Create new workout
        </h2>

        <the-form @change="addExerciseValues">
          <template #inputs>
            <div class="px-6">
              <the-input
                v-show="!isNameShown"
                v-model="workoutName"
                type="text"
                placeholder="Workout name"
                class="text w-full"
                :condition="errors.exerciseName.conditions"
                :error-text="errors.exerciseName.text"
                @focusout="displayWorkoutTitle"
              />
              <transition name="title">
                <h3 v-show="isNameShown" class="text-xl text-center font-bold">
                  {{ workoutName }}
                </h3>
              </transition>
            </div>

            <transition-group name="exercise">
              <the-exercise
                v-for="exercise in addedExercises"
                :key="exercise.name"
                :img="exercise.img"
                :name="exercise.name"
                :sets="exercise.sets"
                :reps="exercise.reps"
                :weight="`${exercise.weight} ${exercise.unit}`"
                unit=""
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
            </transition-group>

            <div class="px-6">
              <div class="flex flex-col w-full">
                <div
                  class="choose-exercise"
                  @click="areExercisesDisplayed = !areExercisesDisplayed"
                >
                  Choose exercise
                  <span>
                    <transition name="arrow">
                      <img
                        src="/img/down-arrow-backup-2-svgrepo-com.svg"
                        alt="Down arrow icon - click here to see all exercises"
                        class="h-3 transition duration-500"
                        :class="{ 'rotate-180': areExercisesDisplayed }"
                      />
                    </transition>
                  </span>
                </div>

                <transition name="exercises">
                  <div v-show="areExercisesDisplayed">
                    <the-input
                      v-show="selectedExercise == null"
                      v-model="exerciseName"
                      type="text"
                      placeholder="Search for exercises..."
                      class="text mt-8 mb-4 w-full"
                      @input="showSelectedExercises(exerciseName)"
                    />

                    <transition-group
                      tag="ul"
                      name="list"
                      mode="out-in"
                      class="px-2 max-h-96 overflow-y-auto"
                    >
                      <li
                        v-for="exercise in exercisesToShow"
                        :key="exercise.name"
                        class="exercise-to-select"
                        :class="{ 'mt-8': selectedExercise != null }"
                        @click.capture="() => addExerciseInfo(exercise)"
                      >
                        <img
                          v-show="selectedExercise != null"
                          src="/img/close-square-svgrepo-com.svg"
                          alt="remove this exercise"
                          class="absolute right-2 h-8"
                          @click="selectedExercise = null"
                        />
                        <img
                          :src="exercise.img"
                          alt="An exercise gif"
                          class="exercise-img"
                        />
                        <div class="exercise-description">
                          <h4 class="exercise-title">
                            {{ exercise.name }}
                          </h4>
                          <p class="max-[500px]:mb-1">Muscle groups:</p>
                          <div class="exercise-muscles">
                            <span
                              v-for="muscle in exercise.muscles"
                              :key="muscle"
                              class="px-2 mr-1 last:mr-0 text-xs bg-white-color rounded-full"
                            >
                              {{ muscle }}
                            </span>
                          </div>
                        </div>
                      </li>
                    </transition-group>
                  </div>
                </transition>
                <div class="mb-2 relative">
                  <transition name="error">
                    <p
                      v-show="isExerciseSubmitted && selectedExercise == null"
                      class="mt-1 ml-2 absolute text-xs text-red-700 font-bold"
                    >
                      You need to choose an exercise.
                    </p>
                  </transition>
                </div>
              </div>

              <div
                class="flex justify-between mt-8 w-full max-[500px]:flex-col"
              >
                <the-input
                  v-model="exerciseData.sets"
                  type="number"
                  placeholder="Sets"
                  name="sets"
                  class="text w-full"
                  :condition="errors.sets.conditions"
                  :error-text="errors.sets.text"
                />
                <the-input
                  v-model="exerciseData.reps"
                  type="number"
                  placeholder="Reps"
                  name="reps"
                  class="text w-full"
                  :condition="errors.reps.conditions"
                  :error-text="errors.reps.text"
                />
              </div>

              <div class="flex justify-between w-full max-[500px]:gap-x-4">
                <the-input
                  v-model="exerciseData.weight"
                  type="number"
                  placeholder="Weight"
                  name="weight"
                  class="text w-[290px] max-[500px]:w-28"
                  :condition="errors.weight.conditions"
                  :error-text="errors.weight.text"
                />

                <div class="flex gap-2">
                  <label
                    for="kg"
                    class="exercise-unit"
                    :class="{ 'bg-brown-color': kgValue, 'bg-white': !kgValue }"
                    @click="
                      kgValue = true;
                      lbValue = false;
                      addUnit();
                    "
                  >
                    kg
                    <the-input type="radio" name="unit" class="radio" />
                  </label>

                  <label
                    for="lb"
                    class="exercise-unit"
                    :class="{ 'bg-brown-color': lbValue, 'bg-white': !lbValue }"
                    @click="
                      kgValue = false;
                      lbValue = true;
                      addUnit();
                    "
                  >
                    lb
                    <the-input type="radio" name="unit" class="radio" />
                  </label>
                </div>
              </div>

              <the-input
                v-model="exerciseData.rest"
                name="rest"
                type="text"
                placeholder="Rest time"
                class="text w-full"
                :condition="errors.rest.conditions"
                :error-text="errors.rest.text"
              />
            </div>
          </template>

          <template #buttons>
            <div class="buttons-box">
              <the-button text="Add exercise" @click.prevent="handleSumbit" />
              <the-button text="Add workout" @click.prevent="submitWorkout" />
            </div>
          </template>
        </the-form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { handleModal } from "../composables/handleModal";
import { supabase } from "../supabase";
import {
  Exercise,
  WholeExercise,
  SupabaseResponse,
  UserResponse,
} from "../api/types";
import TheForm from "../components/shared/TheForm.vue";
import TheInput from "../components/shared/TheInput.vue";
import TheButton from "../components/shared/TheButton.vue";
import TheExercise from "../components/shared/TheExercise.vue";
import NeedSignIn from "../components/shared/NeedSignIn.vue";
import TheToast from "../components/shared/TheToast.vue";

const exercises = ref<Exercise[]>([]);
const workoutName = ref("");
const exerciseName = ref("");
const selectedExercise: Ref<Exercise | null> = ref(null);
const exerciseData = ref<Exercise>({
  name: "",
  img: "",
  muscles: [],
  sets: "",
  reps: "",
  weight: "",
  unit: "",
  rest: "",
});
const addedExercises = ref<Exercise[]>([]);
const isExerciseSubmitted = ref(false);
const isToastShown = ref(false);
const isInsertionError = ref(false);

const kgValue = ref(false);
const lbValue = ref(false);
const selectedUnit = computed(() => {
  if (kgValue.value === true || lbValue.value === true) {
    return kgValue.value === true ? "kg" : "lb";
  }
  return "";
});

const exercisesToShow = computed(() => {
  const selectedExercises = showSelectedExercises(exerciseName.value);

  if (exerciseName.value === "") {
    if (selectedExercise.value != null) {
      return exercises.value.filter(
        (exercise) => selectedExercise.value === exercise
      );
    }

    return exercises.value;
  }

  if (selectedExercise.value != null) {
    return exercises.value.filter(
      (exercise) => selectedExercise.value === exercise
    );
  }

  return selectedExercises;
});

const errors = computed(() => {
  const getErrorValue = (name: string) => `The "${name}" value is required.`;

  return {
    exerciseName: {
      conditions: isExerciseSubmitted.value && workoutName.value === "",
      text: getErrorValue("Workout name"),
    },
    sets: {
      conditions: isExerciseSubmitted.value && exerciseData.value.sets === "",
      text: getErrorValue("Sets"),
    },
    reps: {
      conditions: isExerciseSubmitted.value && exerciseData.value.reps === "",
      text: getErrorValue("Reps"),
    },
    weight: {
      conditions:
        isExerciseSubmitted.value &&
        (exerciseData.value.weight === "" || exerciseData.value.unit === ""),
      text:
        exerciseData.value.weight === ""
          ? getErrorValue("Weight")
          : getErrorValue("Unit"),
    },
    rest: {
      conditions: isExerciseSubmitted.value && exerciseData.value.rest === "",
      text: getErrorValue("Rest time"),
    },
  };
});

const toast = computed(() => {
  if (!isInsertionError.value) {
    return {
      text: "Your workout has been added. Let's see it on your dashboard.",
      color: "bg-toast-info",
    };
  }

  if (isInsertionError.value || addedExercises.value.length === 0) {
    return {
      text: "You need to add at least one exercise.",
      color: "bg-toast-error",
    };
  }

  return {
    text: "Ooops, something went wrong. Try again.",
    color: "bg-toast-error",
  };
});

const showSelectedExercises = (value: string) => {
  return exercises.value.filter((exercise) =>
    exercise.name.toLowerCase().includes(value)
  );
};

const isNameShown = ref(false);
const displayWorkoutTitle = () => {
  if (workoutName.value === "") {
    return;
  }
  isNameShown.value = true;
};

const addExerciseValues = (e: { target: HTMLInputElement }) => {
  const key = e.target.name as keyof Exercise;
  const val = e.target.value;
  if (key !== "unit" && key !== "muscles") {
    exerciseData.value[key] = val;
  }
};

const addExerciseInfo = (exercise: Exercise) => {
  selectedExercise.value = exercise;
  exerciseData.value.name = exercise.name;
  exerciseData.value.img = exercise.img;
  exerciseData.value.muscles = exercise.muscles;
};

const addUnit = () => {
  exerciseData.value.unit = selectedUnit.value;
};

const areExercisesDisplayed = ref(false);
const handleSumbit = () => {
  if (
    workoutName.value !== "" &&
    Object.values(exerciseData.value).every((value) => value !== "")
  ) {
    addedExercises.value.push(exerciseData.value);
    exerciseName.value = "";
    exerciseData.value = {
      name: "",
      img: "",
      muscles: [],
      sets: "",
      reps: "",
      weight: "",
      unit: selectedUnit.value,
      rest: "",
    };
    isExerciseSubmitted.value = false;
    areExercisesDisplayed.value = false;
    selectedExercise.value = null;
  } else {
    isExerciseSubmitted.value = true;
  }
};

const router = useRouter();
const submitWorkout = async () => {
  if (addedExercises.value.length !== 0) {
    const {
      data: { user },
    }: { data: UserResponse["data"] } =
      (await supabase.auth.getUser()) as UserResponse;
    const { data } = await supabase
      .from("Workouts")
      .insert([
        {
          workout: {
            name: workoutName.value,
            exercises: addedExercises.value,
          },
          user_id: user.id,
        },
      ])
      .select();

    if (data) {
      isInsertionError.value = false;
      setTimeout(() => {
        router.push({ name: "dashboard" });
      }, 3500);
    } else {
      isInsertionError.value = true;
    }
  } else {
    isInsertionError.value = true;
  }

  handleModal(isToastShown, true);
};

const userStore = useUserStore();
const fetchExercises = async () => {
  if (userStore.isSignedIn) {
    const response = (await supabase
      .from("Exercises")
      .select()) as SupabaseResponse<WholeExercise>;

    if (response.error == null) {
      const { data }: { data: SupabaseResponse<WholeExercise>["data"] } =
        response;

      if (data != null) {
        exercises.value = data.map(({ exercise: { muscles, img, name } }) => ({
          muscles,
          img,
          name,
        }));
        return;
      }
    }
  }

  handleModal(isToastShown, true);
};

onMounted(fetchExercises);
</script>

<style scoped>
.choose-exercise {
  @apply flex justify-between items-center mt-8 px-4 py-2 bg-white rounded-full;
  @apply text-sm text-placeholder-color cursor-pointer max-[399px]:min-w-0;
}

.exercise-to-select {
  @apply flex items-center mb-2 last:mb-0 border-2 border-black-color relative rounded-2xl text-sm;
  @apply overflow-hidden cursor-pointer max-[500px]:flex-col max-[500px]:py-4;
}

.exercise-img {
  @apply w-[90px] max-[500px]:rounded-xl max-[500px]:mb-1 max-[500px]:w-[70px];
}

.exercise-description {
  @apply flex flex-col gap-1 px-4 max-[500px]:items-center max-[500px]:gap-0;
}

.exercise-title {
  @apply my-2 font-bold text-[16px] max-[500px]:my-1 max-[500px]:text-center;
}

.exercise-muscles {
  @apply flex flex-wrap gap-y-1 mb-2 max-[500px]:mb-0 max-[500px]:justify-center;
}

.exercise-unit {
  @apply flex justify-center items-center text-sm text-placeholder-color h-9 w-9 p-2;
  @apply rounded-full cursor-pointer;
  @apply max-[300px]:w-8 max-[300px]:h-8 max-[300px]:translate-y-1;
}

.buttons-box {
  @apply flex justify-between mt-8 px-6 mx-auto w-full;
  @apply max-[500px]:flex-col max-[500px]:items-center max-[500px]:gap-y-4;
}

.title-enter-from {
  @apply opacity-0 scale-50;
}

.exercise-enter-from {
  @apply opacity-0 scale-50;
}

.exercises-enter-from {
  @apply opacity-0 -translate-y-5;
}

.exercises-leave-to {
  @apply opacity-0;
}

.title-enter-active,
.exercises-enter-active,
.exercise-enter-active {
  @apply transition-all duration-500;
}

.exercises-leave-active {
  @apply transition-opacity duration-300;
}

.list-enter-from {
  @apply opacity-0 -translate-y-5;
}

.list-enter-active {
  @apply transition-all duration-300;
}
</style>
