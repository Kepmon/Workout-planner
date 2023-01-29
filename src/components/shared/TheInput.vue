<template>
    <input :type="type" :placeholder="placeholder" class="pl-4 h-9 rounded-full text-sm outline-none focus:shadow-3xl placeholder:text-placeholder-color max-[399px]:min-w-0" :class="width" />
</template>

<script>
export default {
    name: 'TheInput',
    props: ['type', 'placeholder', 'width']
}
</script>