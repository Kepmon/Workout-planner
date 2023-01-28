<template>
    <div class="p-6 w-full even:bg-dark-yellow odd:bg-regular-yellow">
        <div class="flex justify-center gap-6 max-[449px]:flex-col max-[499px]:items-center max-[499px]:text-sm">
            <img :src="img" alt="An exercise gif" class="h-24 rounded-xl max-[499px]:w-24">

            <div class="flex flex-col items-center">
                <p class="mb-2"><span class="font-bold">Exercise: </span>{{ name }}</p>
                <p class="mb-2"><span class="font-bold">Muscle groups: </span>{{ muscle }}</p>
                <div class="flex gap-4 mb-2 max-[399px]:flex-col max-[499px]:gap-2">
                    <p><span class="font-bold">Sets: </span>{{ sets }}</p>
                    <p><span class="font-bold">Reps: </span>{{ reps }}</p>
                    <p><span class="font-bold">Weight: </span>{{ weight }}</p>
                </div>
                <p><span class="font-bold">Rest time: </span>{{ rest }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheExercise',
    props: ['img', 'name', 'muscle', 'sets', 'reps', 'weight', 'rest']

}
</script>

<style>

</style>