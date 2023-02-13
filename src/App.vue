<template>
  <div>
    <the-nav />
    
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>

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

  .route-enter-from {
    opacity: 0;
    transform: translateX(-50px);
  }

  .route-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }

  .route-enter-active,
  .route-leave-active {
    transition: opacity .3s, transform .3s;
  }
</style>
