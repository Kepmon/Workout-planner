<template>
  <div>
    <the-nav />
    <router-view />
    <the-footer />
  </div>
</template>

<script>
import TheNav from './components/TheNav.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheNav,
    TheFooter
  }
}
</script>

<style>
  * {
    @apply box-border p-0 m-0
  }

  body {
    @apply bg-light-yellow text-black-color overflow-x-hidden
  }

  main {
    @apply flex flex-col items-center justify-center min-h-[calc(100vh-208px)]
  }
</style>