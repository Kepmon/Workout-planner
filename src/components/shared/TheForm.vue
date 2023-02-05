<template>
    <form class="flex flex-col items-center mx-auto py-8 bg-regular-yellow w-[460px] rounded-[32px] shadow-3xl max-[500px]:max-w-[350px] max-[400px]:max-w-[300px] max-[350px]:max-w-[250px]">
        <div class="flex flex-col w-full">
            <slot name="inputs"></slot>
            <slot name="buttons"></slot>
        </div>

        <div class="px-6 mt-4 text-center">
            <label v-if="$route.name === 'sign-up'" class="mt-4 max-w-[300px] text-sm">
            <input type="checkbox" />
                By clicking here, I state that I have read and understood the terms and conditions.
            </label>
        </div>

        <div class="px-6 text-center">
            <p v-if="$route.name === 'sign-in' || $route.name === 'sign-up'" class="mt-8 text-sm">{{ question }} <router-link :to="goTo" class="border-b-brown-color border-b-2 text-brown-color font-bold">{{ answer }}</router-link></p>
        </div>
    </form>
</template>

<script>
export default {
    name: 'TheForm',
    data() {
        return {
            question: this.$route.name === 'sign-in' ? "Don't have an account?" : 'Already have an account?',
            answer: this.$route.name === 'sign-in' ? 'Create one' : 'Sign in',
            goTo: this.$route.name === 'sign-in' ? 'sign-up' : 'sign-in'
        }
    }
}
</script>