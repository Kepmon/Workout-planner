<template>
    <div v-if="!isSignedIn" class="flex flex-col items-center justify-center">
        <h2 class="mb-20 px-4 text-3xl text-center font-bold tracking-wider max-[500px]:text-xl">
          You need to sign in to {{ text }}
        </h2>
        
        <div class="buttons">
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

<style scoped>
.buttons {
  @apply flex items-center justify-evenly px-6 mx-auto w-full;
  @apply max-[400px]:flex-col max-[400px]:gap-y-8;
}
</style>
