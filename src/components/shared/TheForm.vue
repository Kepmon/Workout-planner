<template>
    <form class="flex flex-col items-center p-8 bg-light-yellow rounded-[32px] shadow-3xl max-[299px]:max-w-[250px]">
        <div class="flex flex-col gap-8 mb-8">
            <input type="text" placeholder="User name" class="pl-4 h-9 min-w-[300px] rounded-full text-sm outline-none focus:shadow-3xl max-[399px]:min-w-0">
            <input type="password" placeholder="Password" class="pl-4 h-9 min-w-[300px] rounded-full text-sm outline-none focus:shadow-3xl max-[399px]:min-w-0">
            <input v-if="$route.name === 'sign-up'" type="password" placeholder="Repeat password" class="pl-4 h-9 min-w-[300px] rounded-full text-sm outline-none focus:shadow-3xl max-[399px]:min-w-0">
            <input v-if="$route.name === 'sign-up'" type="email" placeholder="Email" class="pl-4 h-9 min-w-[300px] rounded-full text-sm outline-none focus:shadow-3xl max-[399px]:min-w-0">
        </div>

        <the-button :text="$route.name === 'sign-in' ? 'Sign in' : 'Sign up'"/>

        <label v-if="$route.name === 'sign-up'" class="mt-4 max-w-[300px] text-sm">
            <input type="checkbox" />
            By clicking here, I state that I have read and understood the terms and conditions.
        </label>

        <p v-if="$route.name === 'sign-up'" class="mt-8 text-sm">Already have an account? <router-link :to="{ name: 'sign-in' }" class="border-b-dark-yellow border-b-2 text-dark-yellow font-bold">Sign in</router-link></p>
        <p v-if="$route.name === 'sign-in'" class="mt-8 text-sm">Don't have an account? <router-link :to="{ name: 'sign-up' }" class="border-b-dark-yellow border-b-2 text-dark-yellow font-bold">Create one</router-link></p>

        
    </form>
</template>

<script>
import TheButton from './TheButton.vue'

export default {
    name: 'TheForm',
    components: {
        TheButton
    },
    mounted() {
        console.log(this.$route)
    }
}
</script>