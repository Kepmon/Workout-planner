<template>
  <main>
    <the-toast
      v-show="isToastShown"
      :text="toast.text"
      :background="toast.color"
    />

    <div class="py-12">
      <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">Sign in</h2>
      <the-form>
        <template #inputs>
          <div class="flex flex-col px-6">
            <the-input
              v-model="userData.email"
              type="email"
              placeholder="Email"
              class="text w-full"
            >
            </the-input>
            <the-input
              v-model="userData.password"
              type="password"
              placeholder="Password"
              class="text w-full"
            >
            </the-input>
          </div>
        </template>

        <template #buttons>
          <div class="flex justify-center">
            <the-button @click.prevent="signInUser" text="Sign in" />
          </div>
        </template>

        <template #others>
          <div class="px-6 text-center">
            <p class="mt-8 text-sm">
              Don't have an account?
              <router-link :to="{ name: 'sign-up'}"
              class="border-b-brown-color border-b-2 text-brown-color font-bold">
                Create one
              </router-link>
            </p>
          </div>
        </template>
      </the-form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TheForm from '../components/shared/TheForm.vue'
import TheInput from '../components/shared/TheInput.vue'
import TheButton from '../components/shared/TheButton.vue'
import TheToast from '../components/shared/TheToast.vue'
import { useUserStore } from '../stores/user'

const userData = ref({
  password: '',
  email: ''
})
const isToastShown = ref(false)
const isError = ref(false)

const userStore = useUserStore()
const router = useRouter()

const toast = computed(() => {
  if (!isError.value) {
    return {
      text: router.options.history.state.back === '/create' ? "You've signed in successfully. Let's create some workout." : "You've signed in successfully. Let's see your dashboard.",
      color: 'bg-toast-info'
    }
  }
  return {
    text: 'The entered data are incorrect. Try again.',
    color: 'bg-toast-error'
  }
})

const signInUser = async () => {
  const isSuccessful = await userStore.signIn(userData.value.email, userData.value.password)

  isToastShown.value = true

  setTimeout(() => {
    isToastShown.value = false
  }, 3000)

  if (isSuccessful !== true) {
    isError.value = true
    return
  }

  isError.value = false
  userStore.isSignedIn = true

  setTimeout(() => {
    const lastPath = router.options.history.state.back

    if (lastPath === '/create') {
      router.push({ name: 'create' })
    } else {
      router.push({ name: 'dashboard' })
    }
  }, 3500)
}
</script>
