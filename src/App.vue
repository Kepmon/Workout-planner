<template>
  <div>
    <the-nav @toggle-nav="handleLock($event)" />
    
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>

    <the-footer />
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { useScrollLock } from '@vueuse/core'
import TheNav from './components/TheNav.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheNav,
    TheFooter
  },
  methods: {
    handleLock(isLocked) {
      const scrollLock = useScrollLock(document.body)
      scrollLock.value = isLocked
    }
  }
}
</script>

<style>
* {
  @apply box-border p-0 m-0;
}

body {
  @apply bg-light-yellow text-black-color overflow-x-hidden;
}

main {
  @apply flex flex-col items-center justify-center min-h-[calc(100vh-208px)];
}

.text {
  @apply pl-4 h-9 rounded-full text-sm outline-none focus:shadow-3xl;
  @apply placeholder:text-placeholder-color max-[399px]:min-w-0;
}

.checkbox {
  @apply flex items-center justify-center appearance-none mr-1 h-4 w-4 relative top-[2px];
  @apply bg-white rounded-[5px] checked:bg-brown-color checked:after:content-checked;
  @apply after:absolute after:top-0 after:left-[1px];
}

.radio {
  @apply appearance-none pl-0;
}

::selection {
  @apply bg-brown-color;
}

.route-enter-from,
.route-leave-to {
  @apply opacity-0 -translate-x-12;
}

.route-enter-active,
.route-leave-active {
  @apply transition-all duration-300;
}

.error-enter-from,
.error-leave-to {
  @apply opacity-0;
}

.error-enter-active,
.error-leave-active {
  @apply transition-opacity duration-300;
}
</style>
