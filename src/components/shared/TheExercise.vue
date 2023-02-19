<template>
    <div class="p-4 w-full even:bg-regular-yellow odd:bg-dark-yellow">
        <div class="exercise">
            <img :src="img" alt="An exercise gif" class="w-24 rounded-xl max-[500px]:w-[70px]">

            <div class="flex flex-col items-center gap-y-1">
                <p><span class="font-bold">Exercise: </span>{{ name }}</p>
                <div class="flex flex-col text-center">
                    <span class="font-bold">Muscle groups: </span>
                    <div>
                        <slot></slot>
                    </div>
                </div>
                <div class="flex gap-3 max-[400px]:flex-col max-[500px]:gap-1">
                    <p class="text-center"><span class="font-bold">Sets: </span>{{ sets }}</p>
                    <p class="text-center"><span class="font-bold">Reps: </span>{{ reps }}</p>
                    <p class="text-center"><span class="font-bold">Weight: </span>{{ weight }}</p>
                </div>
                <p><span class="font-bold">Rest time: </span>{{ rest }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TheExercise',
  props: ['img', 'name', 'sets', 'reps', 'weight', 'rest']
}
</script>

<style scoped>
.exercise {
    @apply flex justify-center items-center gap-6;
    @apply max-[500px]:flex-col max-[500px]:items-center max-[500px]:gap-4 max-[500px]:text-sm;
}
</style>
