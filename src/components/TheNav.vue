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
                <li>
                    <router-link :to="{ name: 'home' }"
                    :class="{ active: $route.name === 'home' }"
                    class="px-6 py-2">
                        Home
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'create' }"
                    :class="{ active: $route.name === 'create' }" class="px-6 py-2"
                    >
                        Create new workout
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'dashboard' }"
                    :class="{ active: $route.name === 'dashboard' }" class="px-6 py-2"
                    >
                        Dashboard
                    </router-link>
                </li>
                <li v-show="!isSignedIn">
                    <router-link :to="{ name: 'sign-in' }"
                    :class="{ active: $route.name === 'sign-in' }" class="px-6 py-2"
                    >
                        Sign in
                    </router-link>
                </li>
                <li v-show="!isSignedIn">
                    <router-link :to="{ name: 'sign-up' }"
                    :class="{ active: $route.name === 'sign-up' }" class="px-6 py-2"
                    >
                        Sign up
                    </router-link>
                </li>
                <li @click="signOut" v-show="isSignedIn">
                    <router-link :to="{ name: 'home' }"
                    class="px-6 py-2"
                    >
                        Sign out
                    </router-link>
                </li>
            </ul>

            <div class="cursor-pointer z-10 min-[999px]:hidden">
                <img
                    @click="toggleNav"
                    src="/img/menu-1-svgrepo-com.svg"
                    alt="The menu icon"
                    class="h-12 max-[499px]:h-10"
                >

                <transition name="nav">
                    <div
                        v-show="isNavShown"
                        class="absolute top-0 left-0 right-0 h-screen bg-dark-yellow text-2xl"
                    >
                        <ul class="nav-items">
                            <li @click="toggleNav">
                                <router-link
                                :to="{ name: 'home' }"
                                class="px-6 py-2"
                                :class="{ active: $route.name === 'home' }"
                                >
                                    Home
                                </router-link>
                            </li>
                            <li @click="toggleNav">
                                <router-link
                                :to="{ name: 'create' }"
                                :class="{ active: $route.name === 'create' }"
                                class="px-6 py-2"
                                >
                                    Create new workout
                                </router-link>
                            </li>
                            <li @click="toggleNav">
                                <router-link :to="{ name: 'dashboard' }"
                                :class="{ active: $route.name === 'dashboard' }"
                                class="px-6 py-2"
                                >
                                    Dashboard
                                </router-link>
                            </li>
                            <li @click="toggleNav" v-show="!isSignedIn">
                                <router-link
                                :to="{ name: 'sign-in' }"
                                class="px-6 py-2"
                                :class="{ active: $route.name === 'sign-in' }"
                                >
                                    Sign in
                                </router-link>
                            </li>
                            <li @click="toggleNav" v-show="!isSignedIn">
                                <router-link
                                :to="{ name: 'sign-up' }"
                                class="px-6 py-2"
                                :class="{ active: $route.name === 'sign-up' }"
                                >
                                    Sign up
                                </router-link>
                            </li>
                            <li @click="toggleNav(); signOut()" v-show="isSignedIn">
                                <router-link
                                :to="{ name: 'home' }"
                                class="px-6 py-2"
                                >
                                    Sign out
                                </router-link>
                            </li>
                        </ul>

                        <img
                            @click="toggleNav"
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

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  name: 'TheNav',
  data() {
    return {
      isNavShown: false
    }
  },
  computed: {
    ...mapState(useUserStore, ['isSignedIn'])
  },
  methods: {
    ...mapActions(useUserStore, ['signOut']),
    toggleNav() {
      this.isNavShown = !this.isNavShown
    }
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
</style>
