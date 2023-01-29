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
    @apply bg-regular-yellow text-black-color overflow-x-hidden
  }

  main {
    @apply flex items-center justify-center py-12 min-h-[calc(100vh-208px)]
  }
</style>