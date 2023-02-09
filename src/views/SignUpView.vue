<template>
  <main>
    <div class="py-12">
      <the-form>
        <template #inputs>
          <div class="flex flex-col px-6">
            <the-input type="text" placeholder="User name"></the-input>
            <the-input type="password" placeholder="Password"></the-input>
            <the-input type="password" placeholder="Repeat password"></the-input>
            <the-input type="email" placeholder="Email"></the-input>
          </div>
        </template>
        
        <template #buttons>
          <div class="flex justify-center">
            <the-button text="Sign up" />
          </div>
        </template>
        
        <template #others>
          <div class="flex justify-evenly px-6 mt-4 text-center">
            <the-input type="checkbox" />
            <label v-if="$route.name === 'sign-up'" class="text-sm">
                By clicking here, I state that I have read and understood the terms and conditions.
            </label>
          </div>

          <div class="px-6 text-center">
            <p class="mt-8 text-sm">Already have an account? <router-link :to="{ name: 'sign-in'}" class="border-b-brown-color border-b-2 text-brown-color font-bold">Sign in</router-link></p>
          </div>
        </template>
      </the-form>
    </div>
  </main>
</template>

<script>
import TheForm from '../components/shared/TheForm.vue'
import TheInput from '../components/shared/TheInput.vue'
import TheButton from '../components/shared/TheButton.vue'

export default {
  name: 'SignUpView',
  components: {
    TheForm,
    TheInput,
    TheButton
  }
}
</script>