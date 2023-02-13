<template>
  <main>
    <div class="py-12">
      <need-sign-in text="create a workout" />

      <div v-if="isSignedIn === 'true'" class="flex flex-col justify-center">
        <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">Create new workout</h2>

        <the-form @change="addExerciseValues">
          <template #inputs>
            <div class="px-6">
              <the-input
                @focusout="isNameShown = true"
                v-model="workoutName"
                v-show="!isNameShown"
                type="text"
                placeholder="Workout name"
                width="w-full"
                :keyValue="workoutName"
                keyName="workout name"
                :formSubmitted="isFormSubmitted"
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
                :rest="exercise.rest">
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
                      class="h-5 transition duration-500"
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
                    class="mt-8 mb-4 w-full"
                    />
                    
                    <ul name="list" class="px-2 max-h-96 overflow-y-auto">
                      <li
                        @click="selectedExercise = exercise;
                        addExerciseInfo()" v-for="exercise in exercisesToShow"
                        :key="exercise.name"
                        class="exercise-to-select"
                        :class="{'mt-8': selectedExercise !== ''}"
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
                    </ul>
                  </div>
                </transition>
                <!-- eslint-disable-next-line max-len -->
                <p v-show="isFormSubmitted && selectedExercise === ''" class="mt-1 ml-2 text-xs text-red-700 font-bold">
                  You need to choose an exercise.
                </p>
              </div>

              <div class="flex justify-between mt-8 w-full max-[500px]:flex-col">
                <the-input
                  v-model="exerciseData.sets"
                  type="number"
                  placeholder="Sets"
                  name="sets"
                  :keyValue="exerciseData.sets"
                  :keyName="Object.keys(exerciseData)[3]"
                  :formSubmitted="isFormSubmitted"
                />
                <the-input
                  v-model="exerciseData.reps"
                  type="number"
                  placeholder="Reps"
                  name="reps"
                  :keyValue="exerciseData.reps"
                  :keyName="Object.keys(exerciseData)[4]"
                  :formSubmitted="isFormSubmitted"
                />
              </div>

              <div class="flex justify-between w-full max-[500px]:gap-x-4">
                <the-input
                  v-model="exerciseData.weight"
                  type="number"
                  placeholder="Weight"
                  name="weight"
                  class="min-[500px]:w-[300px]"
                  :keyValueOne="exerciseData.weight"
                  :keyValueTwo="exerciseData.unit"
                  :formSubmitted="isFormSubmitted"
                />

                <div class="flex gap-2">
                  <label
                    @click="kgValue=true; lbValue=false; addUnit()"
                    for="kg"
                    class="exercise-unit"
                    :class="{ 'bg-brown-color': kgValue, 'bg-white': !kgValue }">
                    kg
                    <the-input type="radio" name="unit" />
                  </label>

                  <label
                    @click="kgValue=false; lbValue=true; addUnit()"
                    for="lb"
                    class="exercise-unit"
                    :class="{ 'bg-brown-color': lbValue, 'bg-white': !lbValue }">
                    lb
                    <the-input type="radio" name="unit" />
                  </label>
                </div>
              </div>

              <the-input
                v-model="exerciseData.rest"
                name="rest"
                type="text"
                placeholder="Rest time"
                width="w-full"
                :keyValue="exerciseData.rest"
                :keyName="Object.keys(exerciseData)[7]"
                :formSubmitted="isFormSubmitted"
              />
            </div>
          </template>

          <template #buttons>
            <div class="buttons-box">
              <the-button @click.prevent="handleSumbit()" text="Add exercise"/>
              <router-link :to="{ name: 'dashboard' }">
                <the-button text="Add workout"/>
              </router-link>
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
import { useExerciseStore } from '../stores/exercises'
import { useUserStore } from '../stores/user'

export default {
  name: 'CreateView',
  components: {
    TheForm,
    TheInput,
    TheButton,
    TheExercise,
    NeedSignIn
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
      isFormSubmitted: false
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
    }
  },
  methods: {
    ...mapActions(useExerciseStore, ['showSelectedExercises']),
    addExerciseValues(e) {
      this.exerciseData[e.target.name] = e.target.value
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
        this.isFormSubmitted = false
        this.areExercisesDisplayed = false
        this.selectedExercise = ''
      } else {
        this.isFormSubmitted = true
      }
    }
  }
}
</script>

<style scoped>
.choose-exercise {
@apply flex justify-between items-center mt-8 px-4 py-2 bg-white rounded-full;
@apply text-sm text-placeholder-color cursor-pointer max-[399px]:min-w-0
}

.exercise-to-select {
  @apply flex items-center mb-2 last:mb-0 border-2 border-black-color rounded-2xl text-sm;
  @apply overflow-hidden cursor-pointer max-[500px]:flex-col max-[500px]:py-4
}

.exercise-img {
  @apply w-[90px] max-[500px]:rounded-xl max-[500px]:mb-1 max-[500px]:w-[70px]
}

.exercise-description {
  @apply flex flex-col gap-1 px-4 max-[500px]:items-center max-[500px]:gap-0
}

.exercise-title {
  @apply my-2 font-bold text-[16px] max-[500px]:my-1 max-[500px]:text-center
}

.exercise-muscles {
  @apply flex flex-wrap gap-y-1 mb-2 max-[500px]:mb-0 max-[500px]:justify-center
}

.exercise-unit {
  @apply flex justify-center items-center text-sm text-placeholder-color h-9 w-9 p-2;
  @apply rounded-full cursor-pointer
}

.buttons-box {
  @apply flex justify-between mt-8 px-6 mx-auto w-full;
  @apply max-[500px]:flex-col max-[500px]:items-center max-[500px]:gap-y-4
}

.title-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.exercise-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.exercises-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.exercises-leave-to {
  opacity: 0;
}

.title-enter-active,
.exercises-enter-active,
.exercise-enter-active {
  transition: opacity .5s, transform .5s;
}

.exercises-leave-active {
  transition: opacity .2s;
}
</style>
