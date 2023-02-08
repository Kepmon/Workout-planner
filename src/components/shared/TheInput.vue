<template>
    <div class="mb-8">
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" :name="name" :placeholder="placeholder" :class="[type === 'radio' ?  'radio' : 'text', width]" class="w-full" />
        <p v-show="key === ''" class="text-sm text-red-700 font-bold">The {{ key }} is required</p>
    </div>
</template>

<script>
export default {
    name: 'TheInput',
    props: ['type', 'placeholder', 'width', 'modelValue', 'name', 'id', 'value', 'key'],
    emits: ['update:modelValue']
}
</script>

<style scoped>
.text {
    @apply pl-4 h-9 rounded-full text-sm outline-none focus:shadow-3xl placeholder:text-placeholder-color max-[399px]:min-w-0
}
.radio {
    @apply appearance-none
}
</style>