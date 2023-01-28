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
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: #F7B640;
    color: #050300;
    overflow-x: hidden;
  }

  main {
    min-height: calc(100vh - 208px);
  }
</style>