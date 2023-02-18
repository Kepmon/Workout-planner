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

  .route-enter-from,
  .route-leave-to {
    @apply opacity-0 -translate-x-12
  }

  .route-enter-active,
  .route-leave-active {
    @apply transition-all duration-300
  }

.error-enter-from,
.error-leave-to {
  @apply opacity-0
}

.error-enter-active,
.error-leave-active {
  @apply transition-opacity duration-300
}
</style>
