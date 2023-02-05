<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" :name="name" :placeholder="placeholder" :class="[type === 'radio' ?  'radio' : 'text', width]" class="mb-8" />
</template>

<script>
export default {
    name: 'TheInput',
    props: ['type', 'placeholder', 'width', 'modelValue', 'name', 'id', 'value'],
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