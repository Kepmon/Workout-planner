<template>
    <div class="p-4 w-full even:bg-regular-yellow odd:bg-dark-yellow">
        <div class="flex justify-center items-center gap-6 max-[449px]:flex-col max-[499px]:items-center max-[499px]:text-sm">
            <img :src="img" alt="An exercise gif" class="h-24 rounded-xl max-[499px]:w-24">

            <div class="flex flex-col items-center gap-y-1">
                <p><span class="font-bold">Exercise: </span>{{ name }}</p>
                <p><span class="font-bold">Muscle groups: </span>{{ muscle }}</p>
                <div class="flex gap-3 max-[399px]:flex-col max-[499px]:gap-2">
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