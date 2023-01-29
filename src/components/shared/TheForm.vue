<template>
    <form class="flex flex-col items-center p-8 bg-light-yellow rounded-[32px] shadow-3xl max-[299px]:max-w-[250px]">
        <div class="flex flex-col gap-8">
            <slot name="inputs"></slot>
            <slot name="buttons"></slot>
        </div>

        <label v-if="$route.name === 'sign-up'" class="mt-4 max-w-[300px] text-sm">
            <input type="checkbox" />
            By clicking here, I state that I have read and understood the terms and conditions.
        </label>

        <p v-if="$route.name === 'sign-in' || $route.name === 'sign-up'" class="mt-8 text-sm">{{ question }} <router-link :to="goTo" class="border-b-dark-yellow border-b-2 text-dark-yellow font-bold">{{ answer }}</router-link></p>

        
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