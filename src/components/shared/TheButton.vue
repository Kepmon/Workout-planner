<template>
  <button class=" bg-regular-yellow py-5 px-8 text-xl font-bold rounded-full shadow-3xl max-[499px]:text-lg max-[499px]:py-3 max-[499px]:px-10">{{ text }}</button>
</template>

<script>
export default {
    name: 'TheButton',
    props: ['text']
}
</script>