<template>
    <div v-if="isSignedIn === 'false'" class="flex flex-col items-center justify-center">
        <h2 class="mb-20 text-3xl text-center font-bold tracking-wider">You need to sign in to {{ text }}</h2> 
        <div class="flex justify-evenly px-6 mx-auto w-full">
            <router-link :to="{ name: 'sign-in' }">
              <the-button text="Sign in"/>
            </router-link>
            <router-link :to="{ name: 'sign-up' }">
              <the-button text="Sign up"/>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '../../stores/user'
import TheButton from './TheButton.vue'

export default {
    name: 'NeedSignIn',
    props: ['text'],
    components: {
        TheButton
    },
    computed: {
        ...mapState(useUserStore, ['isSignedIn'])
    }
}
</script>