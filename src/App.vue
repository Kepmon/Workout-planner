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