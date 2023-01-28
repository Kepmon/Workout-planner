<template>
    <nav class="px-8 bg-dark-yellow relative max-[399px]:px-4">
        <div class="flex items-center justify-between mx-auto max-w-1200 h-28">
            <router-link :to="{ name: 'home' }">
                <div class="flex items-center p-1">
                    <img src="../assets/img/training-gym-svgrepo-com.svg" alt="The company logo" class="h-20 max-[499px]:h-10">
                    <p class="text-3xl font-bold italic max-[499px]:text-xl">SmartGym</p>
                </div>
            </router-link>

            <ul class="flex max-[999px]:hidden">
                <li><router-link :to="{ name: 'home' }" :class="{ active: $route.name === 'home' }" class="px-6 py-2">Home</router-link></li>
                <li><router-link :to="{ name: 'create' }" :class="{ active: $route.name === 'create' }" class="px-6 py-2">Create new workout</router-link></li>
                <li><router-link :to="{ name: 'sign-in' }" :class="{ active: $route.name === 'sign-in' }" class="px-6 py-2">Sign in</router-link></li>
                <li><router-link :to="{ name: 'sign-up' }" :class="{ active: $route.name === 'sign-up' }" class="px-6 py-2">Sign up</router-link></li>
            </ul>

            <div class="min-[999px]:hidden cursor-pointer">
                <img src="../assets/img/menu-1-svgrepo-com.svg" alt="The menu icon" class="h-12  max-[499px]:h-10" @click="toggleNav">

                <div class="absolute top-0 left-0 right-0 h-screen bg-dark-yellow text-2xl" :class="{ 'hide-nav': !isNavShown, 'show-nav': isNavShown}">
                    <ul class="flex flex-col items-center justify-center gap-20 absolute top-0 left-0 right-0 h-full text-center max-[400px]:text-xl">
                        <li><router-link :to="{ name: 'home' }" :class="{ active: $route.name === 'home' }" class="px-6 py-2" @click="toggleNav">Home</router-link></li>
                        <li><router-link :to="{ name: 'create' }" :class="{ active: $route.name === 'create' }" class="px-6 py-2" @click="toggleNav">Create new workout</router-link></li>
                        <li><router-link :to="{ name: 'sign-in' }" :class="{ active: $route.name === 'sign-in' }" class="px-6 py-2" @click="toggleNav">Sign in</router-link></li>
                        <li><router-link :to="{ name: 'sign-up' }" :class="{ active: $route.name === 'sign-up' }" class="px-6 py-2" @click="toggleNav">Sign up</router-link></li>
                    </ul>

                    <img src="../assets/img/close-square-svgrepo-com.svg" alt="The close menu icon" class="absolute h-12 top-8 right-8 max-[499px]:h-10 max-[499px]:top-9 max-[499px]:right-4" @click="toggleNav">
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'TheNav',
    data() {
        return {
            isNavShown: false
        }
    },
    methods: {
        toggleNav() {
            this.isNavShown = !this.isNavShown
        }
    }
}
</script>

<style scoped>
.active {
    @apply bg-white-color rounded-full font-bold
}

.hide-nav {
    @apply hidden
}

.show-nav {
    @apply flex
}
</style>