<template>
  <main>
    <the-toast
      v-show="isToastShown"
      :text="toast.text"
      :background="toast.color"
    />

    <div class="py-12">
      <need-sign-in text="create a workout" />

      <div v-if="isSignedIn" class="flex flex-col justify-center">
        <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">Create new workout</h2>

        <the-form @change="addExerciseValues">
          <template #inputs>
            <div class="px-6">
              <the-input
                @focusout="displayWorkoutTitle"
                v-model="workoutName"
                v-show="!isNameShown"
                type="text"
                placeholder="Workout name"
                class="text w-full"
                :conditions="errors.exerciseName.conditions"
                :errorText="errors.exerciseName.text"
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
                :key="exercise" :img="exercise.img"
                :name="exercise.name"
                :sets="exercise.sets"
                :reps="exercise.reps"
                :weight="`${exercise.weight} ${exercise.unit}`"
                :rest="exercise.rest"
              >
                <span
                  v-for="muscle in exercise.muscles"
                  :key="muscle"
                  class="px-2 mr-1 last:mr-0 text-xs bg-white-color rounded-full">
                  {{ muscle }}
                </span>
              </the-exercise>
            </transition-group>

            <div class="px-6">
              <div class="flex flex-col w-full">
                <div
                @click="areExercisesDisplayed = !areExercisesDisplayed"
                class="choose-exercise">
                  Choose exercise
                  <span>
                    <transition name="arrow">
                      <img
                      src="/img/down-arrow-backup-2-svgrepo-com.svg"
                      alt="Down arrow icon - click here to see all exercises"
                      class="h-3 transition duration-500"
                      :class="{'rotate-180': areExercisesDisplayed}"
                      >
                    </transition>
                  </span>
                </div>

                <transition name="exercises">
                  <div v-show="areExercisesDisplayed">
                    <the-input @input="showSelectedExercises(exerciseName)"
                    v-show="selectedExercise === ''"
                    v-model="exerciseName"
                    type="text"
                    placeholder="Search for exercises..."
                    class="text mt-8 mb-4 w-full"
                    />
                    
                    <transition-group tag="ul" name="list" mode="out-in"
                    class="px-2 max-h-96 overflow-y-auto">
                        <li
                          @click.capture="selectedExercise = exercise; addExerciseInfo()"
                          v-for="exercise in exercisesToShow"
                          :key="exercise.name"
                          class="exercise-to-select"
                          :class="{'mt-8': selectedExercise !== ''}"
                        >
                          
                          <img
                          v-show="selectedExercise !== ''"
                          @click="selectedExercise = ''"
                          src="/img/close-square-svgrepo-com.svg"
                          alt="remove this exercise"
                          class="absolute right-2 h-8"
                          >
                          <img
                            :src="exercise.img"
                            alt="An exercise gif"
                            class="exercise-img"
                          >
                          <div class="exercise-description">
                            <h4 class="exercise-title">
                              {{ exercise.name }}
                            </h4>
                            <p class="max-[500px]:mb-1">Muscle groups:</p>
                            <div class="exercise-muscles">
                              <span
                                v-for="muscle in exercise.muscles"
                                :key="muscle"
                                class="px-2 mr-1 last:mr-0 text-xs bg-white-color rounded-full ">
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
                        v-show="isExerciseSubmitted && selectedExercise === ''"
                        class="mt-1 ml-2 absolute text-xs text-red-700 font-bold">
                        You need to choose an exercise.
                      </p>
                    </transition>
                  </div>
              </div>

              <div class="flex justify-between mt-8 w-full max-[500px]:flex-col">
                <the-input
                  v-model="exerciseData.sets"
                  type="number"
                  placeholder="Sets"
                  name="sets"
                  class="text w-full"
                  :conditions="errors.sets.conditions"
                  :errorText="errors.sets.text"
                />
                <the-input
                  v-model="exerciseData.reps"
                  type="number"
                  placeholder="Reps"
                  name="reps"
                  class="text w-full"
                  :conditions="errors.reps.conditions"
                  :errorText="errors.reps.text"
                />
              </div>

              <div class="flex justify-between w-full max-[500px]:gap-x-4">
                <the-input
                  v-model="exerciseData.weight"
                  type="number"
                  placeholder="Weight"
                  name="weight"
                  class="text w-[290px] max-[400px]:w-28"
                  :conditions="errors.weight.conditions"
                  :errorText="errors.weight.text"
                />

                <div class="flex gap-2">
                  <label
                    @click="kgValue=true; lbValue=false; addUnit()"
                    for="kg"
                    class="exercise-unit"
                    :class="{ 'bg-brown-color': kgValue, 'bg-white': !kgValue }">
                    kg
                    <the-input type="radio" name="unit" class="radio"/>
                  </label>

                  <label
                    @click="kgValue=false; lbValue=true; addUnit()"
                    for="lb"
                    class="exercise-unit"
                    :class="{ 'bg-brown-color': lbValue, 'bg-white': !lbValue }">
                    lb
                    <the-input type="radio" name="unit" class="radio"/>
                  </label>
                </div>
              </div>

              <the-input
                v-model="exerciseData.rest"
                name="rest"
                type="text"
                placeholder="Rest time"
                class="text w-full"
                :conditions="errors.rest.conditions"
                :errorText="errors.rest.text"
              />
            </div>
          </template>

          <template #buttons>
            <div class="buttons-box">
              <the-button @click.prevent="handleSumbit()" text="Add exercise"/>
              <the-button @click.prevent="submitWorkout()" text="Add workout"/>
            </div>
          </template>
        </the-form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import TheForm from '../components/shared/TheForm.vue'
import TheInput from '../components/shared/TheInput.vue'
import TheButton from '../components/shared/TheButton.vue'
import TheExercise from '../components/shared/TheExercise.vue'
import NeedSignIn from '../components/shared/NeedSignIn.vue'
import TheToast from '../components/shared/TheToast.vue'
import { useExerciseStore } from '../stores/exercises'
import { useUserStore } from '../stores/user'
import { supabase } from '../supabase'

export default {
  name: 'CreateView',
  components: {
    TheForm,
    TheInput,
    TheButton,
    TheExercise,
    NeedSignIn,
    TheToast
  },
  data() {
    return {
      workoutName: '',
      exerciseName: '',
      isNameShown: false,
      areExercisesDisplayed: false,
      selectedExercise: '',
      kgValue: false,
      lbValue: false,
      exerciseData: {
        name: '',
        img: '',
        muscles: '',
        sets: '',
        reps: '',
        weight: '',
        unit: '',
        rest: ''
      },
      addedExercises: [],
      isExerciseSubmitted: false,
      isToastShown: false,
      isInsertionError: false
    }
  },
  computed: {
    ...mapState(useExerciseStore, ['exercises']),
    ...mapState(useUserStore, ['isSignedIn']),
    selectedUnit() {
      if (this.kgValue === true || this.lbValue === true) {
        return this.kgValue === true ? 'kg' : 'lb'
      }
      return ''
    },
    exercisesToShow() {
      const selectedExercises = this.showSelectedExercises(this.exerciseName)
      
      if (this.exerciseName === '') {
        if (this.selectedExercise !== '') {
          return this.exercises.filter((exercise) => this.selectedExercise === exercise)
        }

        return this.exercises
      }

      if (this.selectedExercise !== '') {
        return this.exercises.filter((exercise) => this.selectedExercise === exercise)
      }

      return selectedExercises
    },
    errors() {
      const getErrorValue = (name) => `The "${name}" value is required.`

      return {
        exerciseName: {
          conditions: this.isExerciseSubmitted && this.workoutName === '',
          text: getErrorValue('Workout name')
        },
        sets: {
          conditions: this.isExerciseSubmitted && this.exerciseData.sets === '',
          text: getErrorValue('Sets')
        },
        reps: {
          conditions: this.isExerciseSubmitted && this.exerciseData.reps === '',
          text: getErrorValue('Reps')
        },
        weight: {
          conditions: this.isExerciseSubmitted && (this.exerciseData.weight === '' || this.exerciseData.unit === ''),
          text: (this.exerciseData.weight === '' ? getErrorValue('Weight') : getErrorValue('Unit'))
        },
        rest: {
          conditions: this.isExerciseSubmitted && this.exerciseData.rest === '',
          text: getErrorValue('Rest time')
        }
      }
    },
    toast() {
      if (!this.isInsertionError) {
        return {
          text: "Your workout has been added. Let's see it on your dashboard.",
          color: 'bg-toast-info'
        }
      }

      if (this.isInsertionError || this.addedExercises.length === 0) {
        return {
          text: 'You need to add at least one exercise.',
          color: 'bg-toast-error'
        }
      }

      return {
        text: 'Ooops, something went wrong. Try again.',
        color: 'bg-toast-error'
      }
    }
  },
  methods: {
    ...mapActions(useExerciseStore, ['showSelectedExercises']),
    displayWorkoutTitle() {
      if (this.workoutName === '') {
        return
      }
      this.isNameShown = true
    },
    addExerciseValues(e) {
      if (this.exerciseData[e.target.name]) {
        this.exerciseData[e.target.name] = e.target.value
      }
    },
    addExerciseInfo() {
      if (this.selectedExercise !== '') {
        this.exerciseData.name = this.selectedExercise.name
        this.exerciseData.img = this.selectedExercise.img
        this.exerciseData.muscles = this.selectedExercise.muscles
      }
    },
    addUnit() {
      this.exerciseData.unit = this.selectedUnit
    },
    checkEmpty(label) {
      return `The "${label}" value is required.`
    },
    handleSumbit() {
      if (this.workoutName !== '' && Object.values(this.exerciseData).every((value) => value !== '')) {
        this.addedExercises.push(this.exerciseData)
        this.exerciseName = ''
        this.exerciseData = {
          name: '',
          img: '',
          muscles: '',
          sets: '',
          reps: '',
          weight: '',
          unit: this.selectedUnit,
          rest: ''
        }
        this.isExerciseSubmitted = false
        this.areExercisesDisplayed = false
        this.selectedExercise = ''
      } else {
        this.isExerciseSubmitted = true
      }
    },
    async submitWorkout() {
      if (this.addedExercises.length !== 0) {
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
          .from('Workouts')
          .insert([
            {
              workout: {
                workout_name: this.workoutName,
                exercises: this.addedExercises
              },
              user_id: user.id
            }
          ])
          .select()
    
        if (data) {
          this.isInsertionError = false
          setTimeout(() => {
            this.$router.push({ name: 'dashboard' })
          }, 3500)
        } else if (error) {
          this.isInsertionError = true
        }
      } else {
        this.isInsertionError = true
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      this.isToastShown = true
      
      setTimeout(() => {
        this.isToastShown = false
      }, 3000)
    }
  }
}
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
