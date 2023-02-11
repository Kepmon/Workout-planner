/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia'

export const useExerciseStore = defineStore('exercises', {
  state: () => ({
    exercises: [
      {
        name: 'Ab wheel rollout',
        img: '/img/ab_wheel.gif',
        muscles: ['Core', 'Abs']
      },
      {
        name: 'Assisted chest dips',
        img: '/img/assisted_dips.gif',
        muscles: ['Chest', 'Triceps']
      },
      {
        name: 'Assisted pull-ups',
        img: '/img/m_a_pullup.gif',
        muscles: ['Back', 'Upperback', 'Lats', 'Biceps']
      }, {
        name: 'Barbell bent over row',
        img: '/img/barbell_row.gif',
        muscles: ['Back', 'Upperback', 'Lats']
      },
      {
        name: 'Barbell hip thrust',
        img: '/img/b_hip_thrust.gif',
        muscles: ['Glutes', 'Legs']
      },
      {
        name: 'Barbell squat',
        img: '/img/barbell_squat.gif',
        muscles: ['Legs', 'Quadriceps']
      },
      {
        name: 'Bulgarian split squat',
        img: '/img/bulgarian_squat.gif',
        muscles: ['Legs', 'Quadriceps', 'Glutes']
      },
      {
        name: 'Cable biceps curl',
        img: '/img/cable_biceps_curl.gif',
        muscles: ['Biceps']
      },
      {
        name: 'Cable pulldown',
        img: '/img/cable_pullldown.gif',
        muscles: ['Back', 'Upperback', 'Lats']
      },
      {
        name: 'Cable rear drive',
        img: '/img/cable_rear_drive.gif',
        muscles: ['Triceps']
      },
      {
        name: 'Cable rope seated row',
        img: '/img/seated_cable_row.gif',
        muscles: ['Back', 'Upper back', 'Middle back']
      },
      {
        name: 'Dead bug',
        img: '/img/dead_bug.gif',
        muscles: ['Core']
      },
      {
        name: 'Deadlift',
        img: '/img/deadlift.gif',
        muscles: ['Legs', 'Hamstrings']
      },
      {
        name: 'Decline sit-ups',
        img: '/img/decline_situp.gif',
        muscles: ['Abs', 'Upper abs']
      },
      {
        name: 'Dumbbell bench press',
        img: '/img/dumbbell_bench_press.gif',
        muscles: ['Chest', 'Shoulders']
      },
      {
        name: 'Dumbbell bent over row',
        img: '/img/dumbbell_row.gif',
        muscles: ['Back', 'Upper back', 'Lats', 'Biceps']
      },
      {
        name: 'Dumbbell biceps curl',
        img: '/img/d_biceps_curl.gif',
        muscles: ['Biceps']
      },
      {
        name: 'Dumbbell lateral raise',
        img: '/img/lateral_raises.gif',
        muscles: ['Shoulders']
      },
      {
        name: 'Dumbbell overhead press',
        img: '/img/overhead_press.gif',
        muscles: ['Shoulders']
      },
      {
        name: "Farmer's walk",
        img: '/img/farmers_walk.gif',
        muscles: ['Core', 'Forearms']
      },
      {
        name: 'Incline bench press',
        img: '/img/incline_bench_press.gif',
        muscles: ['Chest', 'Shoulders']
      },
      {
        name: 'Incline bench row',
        img: '/img/bench_row.gif',
        muscles: ['Back', 'Upper back', 'Lats', 'Biceps']
      },
      {
        name: 'Incline dumbbell biceps curl',
        img: '/img/incline_biceps_curl.gif',
        muscles: ['Biceps']
      },
      {
        name: 'Kneeling push-ups',
        img: '/img/kneeling_push_ups.gif',
        muscles: ['Chest', 'Triceps']
      },
      {
        name: 'Leg curl',
        img: '/img/leg_curl.gif',
        muscles: ['Legs', 'Hamstrings']
      },
      {
        name: 'Leg extension',
        img: '/img/leg_extension.gif',
        muscles: ['Legs', 'Quadriceps']
      },
      {
        name: 'Leg press',
        img: '/img/leg_press.gif',
        muscles: ['Legs', 'Quadriceps']
      },
      {
        name: 'Lever chest press',
        img: '/img/lever_chest_press.gif',
        muscles: ['Chest', 'Shoulders']
      },
      {
        name: 'Machine chest press',
        img: '/img/machine_chest_press.gif',
        muscles: ['Chest']
      },
      {
        name: 'Pec deck fly',
        img: '/img/pec_fly.gif',
        muscles: ['Chest']
      },
      {
        name: 'Reverse crunches',
        img: '/img/revere_crunches.gif',
        muscles: ['Abs', 'Lower abs']
      },
      {
        name: 'Romanian deadlift',
        img: '/img/romanian_deadlift.gif',
        muscles: ['Legs', 'Hamstrings']
      },
      {
        name: 'Rope pushdown',
        img: '/img/rope_pushdown.gif',
        muscles: ['Triceps']
      },
      {
        name: 'Seated calf raises',
        img: '/img/calf_raise.gif',
        muscles: ['Legs', 'Calfs']
      },
      {
        name: 'Seated row machine',
        img: '/img/seated_row_machine.gif',
        muscles: ['Back', 'Upper back', 'Middle back']
      },
      {
        name: 'Single leg hip thrust',
        img: '/img/sl_hip_thrust.gif',
        muscles: ['Glutes', 'Legs']
      },
      {
        name: 'Trx pull-up',
        img: '/img/Trx_pull_up.gif',
        muscles: ['Back', 'Upperback', 'Lats', 'Biceps']
      },
      {
        name: 'Walking lunges',
        img: '/img/walking lunges.gif',
        muscles: ['Legs', 'Quadriceps']
      },
      {
        name: 'Wood chop',
        img: '/img/wood_chop.gif',
        muscles: ['Obliques']
      }
    ],
    selectedExercises: []
  }),
  actions: {
    showSelectedExercises(value) {
      return this.exercises.filter((exercise) => exercise.name.toLowerCase().includes(value))
    }
  }
})
