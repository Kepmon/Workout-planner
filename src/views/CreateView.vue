<template>
  <main>
    <div class="py-12">
      <need-sign-in text="create a workout" />

      <div v-if="isSignedIn === 'true'" class="flex flex-col justify-center">
        <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">Create new workout</h2>
        
        <the-form @change="addExerciseValues">
          <template #inputs>
            <div class="px-6">
              <the-input @focusout="isNameShown = true" v-model="workoutName" v-show="!isNameShown" type="text" placeholder="Workout name" width="w-full"/>
              <h3 v-show="isNameShown" class="text-xl text-center font-bold">{{ workoutName }}</h3>
            </div>

            <the-exercise v-for="exercise in addedExercises" :key="exercise" :img="exercise.img" :name="exercise.name" :sets="exercise.sets" :reps="exercise.reps" :weight="`${exercise.weight} ${exercise.unit}`" :rest="exercise.rest">
              <span v-for="muscle in exercise.muscles" :key="muscle" class="px-2 mr-1 last:mr-0 text-xs bg-white-color rounded-full">{{ muscle }}</span>
            </the-exercise>

            <div class="px-6">
              <div class="flex flex-col w-full">
                <div @click="areExercisesDisplayed = !areExercisesDisplayed" class="flex justify-between items-center my-8 px-4 py-2 bg-white rounded-full text-sm text-placeholder-color cursor-pointer max-[399px]:min-w-0">
                  Choose exercise 
                  <span><img src="/img/down-arrow-backup-2-svgrepo-com.svg" alt="Down arrow icon - click here to see all exercises" class="h-5"></span>
                </div>

                <div v-show="areExercisesDisplayed" class="mb-8">
                  <the-input @input="showSelectedExercises(exerciseName)" v-show="selectedExercise === ''" v-model="exerciseName" type="text" placeholder="Search for exercises..." class="mb-4 w-full" />
                  <ul class="px-2 max-h-96 overflow-y-auto">
                    <li @click="selectedExercise = exercise; addExerciseInfo()" v-for="exercise in exercisesToShow" :key="exercise.name" class="flex items-center mb-2 last:mb-0 border-2 border-black-color rounded-2xl text-sm overflow-hidden cursor-pointer max-[500px]:flex-col max-[500px]:py-4">
                      <img :src="exercise.img" alt="An exercise gif" class="w-[90px] max-[500px]:rounded-xl max-[500px]:mb-1 max-[500px]:w-[70px]">
                      <div class="flex flex-col gap-1 px-4 max-[500px]:items-center max-[500px]:gap-0">
                        <h4 class="my-2 font-bold text-[16px] max-[500px]:my-1 max-[500px]:text-center">{{ exercise.name }}</h4>
                        <p class="max-[500px]:mb-1">Muscle groups:</p>
                        <div class="flex flex-wrap gap-y-1 mb-2 max-[500px]:mb-0 max-[500px]:justify-center">
                          <span v-for="muscle in exercise.muscles" :key="muscle" class="px-2 mr-1 last:mr-0 text-xs bg-white-color rounded-full ">{{ muscle }}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="flex justify-between w-full max-[500px]:flex-col">
                <the-input v-model="exerciseData.sets" type="number" placeholder="Sets" name="sets" :key="exerciseData.sets" />
                <the-input v-model="exerciseData.reps" type="number" placeholder="Reps" name="reps" />
              </div>
              
              <div class="flex justify-between w-full max-[500px]:gap-x-4">
                <the-input v-model="exerciseData.weight" type="number" placeholder="Weight" name="weight" width="w-[300px]" class="max-[500px]:w-full"/>
  
                <div class="flex gap-2">
                  <label @click="kgValue=true; lbValue=false; addUnit()" for="kg" class="flex justify-center items-center text-sm text-placeholder-color h-9 w-9 p-2 rounded-full cursor-pointer" :class="{ 'bg-brown-color': kgValue, 'bg-white': !kgValue }">
                    kg
                    <the-input type="radio" name="unit" />
                  </label> 
                  
                  <label @click="kgValue=false; lbValue=true; addUnit()" for="lb" class="flex justify-center items-center text-sm text-placeholder-color h-9 w-9 p-2 rounded-full cursor-pointer" :class="{ 'bg-brown-color': lbValue, 'bg-white': !lbValue }">
                    lb
                    <the-input type="radio" name="unit" />
                  </label> 
                </div>
              </div>

              <the-input v-model="exerciseData.rest" name="rest" type="text" placeholder="Rest time" width="w-full" />
            </div>
          </template>

          <template #buttons>
            <div class="flex justify-between mt-8 px-6 mx-auto w-full">
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
import TheForm from '../components/shared/TheForm.vue'
import TheInput from '../components/shared/TheInput.vue'
import TheButton from '../components/shared/TheButton.vue'
import TheExercise from '../components/shared/TheExercise.vue'
import TheWorkout from '../components/shared/TheWorkout.vue'
import NeedSignIn from '../components/shared/NeedSignIn.vue'
import { mapState, mapActions } from 'pinia'
import { useExerciseStore } from '../stores/exercises'
import { useUserStore } from '../stores/user'

export default {
  name: 'CreateView',
  components: {
    TheForm,
    TheInput,
    TheButton,
    TheExercise,
    TheWorkout,
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
        rest: '',
      },
      addedExercises: []
    }
  },
  computed: {
    ...mapState(useExerciseStore, ['exercises', 'selectedExercises']),
    ...mapState(useUserStore, ['isSignedIn']),
    selectedUnit() {
      if (this.kgValue === true || this.lbValue === true) {
        return this.kgValue === true ? 'kg' : 'lb'
      }
    },
    exercisesToShow() {
      if (this.exerciseName === '') {
        if (this.selectedExercise !== '') {
          return this.exercises.filter(exercise => this.selectedExercise === exercise)
        }
        else {
          return this.exercises
        }
      }
      else {
        if (this.selectedExercise !== '') {
          return this.exercises.filter(exercise => this.selectedExercise === exercise)
        }
        else {
          return this.selectedExercises
        }
      }
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
      if (this.workoutName !== '' && Object.values(this.exerciseData).every(value => value !== '')) {
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
          rest: '',
        }
        this.areExercisesDisplayed = false
        this.selectedExercise = ''
      }
    },
    showName() {
      console.log(this.isNameShown);
    }
  }
}
</script>