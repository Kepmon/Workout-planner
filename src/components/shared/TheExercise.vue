<template>
  <div class="py-4 w-full even:bg-regular-yellow odd:bg-dark-yellow">
    <div class="exercise">
      <img
        :src="img"
        alt="An exercise gif"
        class="w-24 rounded-xl max-[500px]:w-[70px]"
      />

      <div class="flex flex-col items-center gap-y-1">
        <p class="text-center">
          <span class="font-bold">Exercise: </span>{{ name }}
        </p>
        <div class="mb-1 text-center">
          <span class="font-bold">Muscle groups: </span>
          <div class="flex flex-wrap justify-center gap-1">
            <slot></slot>
          </div>
        </div>
        <div class="flex gap-2 max-[400px]:flex-col max-[500px]:gap-1">
          <p class="text-center">
            <span class="font-bold">Sets: </span>{{ sets }}
          </p>
          <p class="text-center">
            <span class="font-bold">Reps: </span>{{ reps }}
          </p>
          <p class="text-center">
            <span class="font-bold">Weight: </span>{{ weight }} {{ unit }}
          </p>
        </div>
        <p><span class="font-bold">Rest time: </span>{{ rest }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  img: string;
  sets: string | undefined;
  reps: string | undefined;
  weight: string | undefined;
  unit: string | undefined;
  rest: string | undefined;
}>();
</script>

<style scoped>
.exercise {
  @apply flex justify-between items-center px-12 gap-5 max-[400px]:px-2;
  @apply max-[600px]:flex-col max-[500px]:items-center max-[500px]:gap-4 max-[500px]:text-sm;
}
</style>
