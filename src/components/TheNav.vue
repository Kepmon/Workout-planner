<template>
    <nav class="px-8 bg-dark-yellow relative max-[399px]:px-4">
        <div class="flex items-center justify-between mx-auto max-w-1200 h-28">
            <router-link :to="{ name: 'home' }">
                <div class="flex items-center p-1">
                    <img
                      src="/img/training-gym-svgrepo-com.svg"
                      alt="The company logo"
                      class="h-20 max-[499px]:h-10"
                    >
                    <p class="text-3xl font-bold italic max-[499px]:text-xl">SmartGym</p>
                </div>
            </router-link>

            <ul class="flex max-[1200px]:text-sm max-[999px]:hidden">
              <transition-group name="nav-desktop">
                <li
                    v-on="{ click: callback ? callback : null }"
                    v-for="{ path, content, callback } in navItems"
                    :key="path.name"
                >
                    <router-link
                        :to="path"
                        :active-class="content !== 'Sign out' ? 'active' : ''"
                        class="px-6 py-2">
                        {{ content }}
                    </router-link>
                </li>
              </transition-group>
            </ul>

            <div class="cursor-pointer z-10 min-[999px]:hidden">
                <img
                  @click="() => toggleNav()"
                  src="/img/menu-1-svgrepo-com.svg"
                  alt="The menu icon"
                  class="h-12 max-[499px]:h-10"
                >

                <transition name="nav">
                    <div
                      v-show="isNavShown"
                      class="absolute inset-0 h-screen bg-dark-yellow text-2xl"
                    >
                        <ul class="nav-items">
                          <li
                            @click="() => toggleNav(callback)"
                            v-for="{ path, content, callback } in navItems"
                            :key="path.name"
                          >
                            <router-link
                              :to="path"
                              :active-class="content !== 'Sign out' ? 'active' : ''"
                              class="px-6 py-2">
                              {{ content }}
                            </router-link>
                          </li>
                        </ul>

                        <img
                          @click="() => toggleNav()"
                          src="/img/close-square-svgrepo-com.svg"
                          alt="The close menu icon"
                          class="close-btn"
                        >
                    </div>
                </transition>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-extraneous-dependencies
import { useScrollLock } from '@vueuse/core'
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { Route, Callback } from '../api/types'

const isNavShown = ref(false)
const userStore = useUserStore()
const routes = ref<Route[]>([
  {
    path: { name: 'home' },
    content: 'Home'
  },
  {
    path: { name: 'create' },
    content: 'Create new workout'
  },
  {
    path: { name: 'dashboard' },
    content: 'Dashboard'
  },
  {
    path: { name: 'sign-in' },
    content: 'Sign in'
  },
  {
    path: { name: 'sign-up' },
    content: 'Sign up'
  },
  {
    path: { name: 'home' },
    content: 'Sign out',
    protected: true,
    callback: userStore.signOut
  }
])

const navItems = computed(() => {
  if (!userStore.isSignedIn) {
    return routes.value.filter((route) => route.protected == null)
  }
  return routes.value.filter((route) => route.path.name.includes('sign') === false)
})

const el = ref(document.body)
const isLocked = useScrollLock(el)

const toggleNav = (cb?: Callback) => {
  isNavShown.value = !isNavShown.value
  isLocked.value = isNavShown.value

  if (cb) {
    cb()
  }
}
</script>

<style scoped>
.nav-items {
  @apply flex flex-col items-center justify-center gap-20 absolute top-0 left-0 right-0 h-full;
  @apply text-center max-[400px]:text-xl;
}
.active {
  @apply bg-white-color rounded-full font-bold transition-colors duration-[600ms];
}

.close-btn {
  @apply absolute h-12 top-8 right-8 max-[499px]:h-10 max-[499px]:top-9 max-[499px]:right-4;
}

.nav-enter-from,
.nav-leave-to {
  @apply opacity-0 translate-x-48;
}

.nav-enter-active,
.nav-leave-active {
  @apply transition-all duration-300;
}

.nav-desktop-enter-from,
.nav-desktop-leave-to {
  @apply opacity-0
}

.nav-desktop-enter-active {
  @apply transition-opacity duration-500;
}

.nav-desktop-move {
  @apply transition-all duration-500;
}

.nav-desktop-leave-active {
  @apply transition-opacity duration-[0ms];
}
</style>
