<template>
  <main>
    <div class="py-12">
      <the-form>
        <template #inputs>
          <div class="flex flex-col px-6">
            <the-input type="text" placeholder="User name"></the-input>
            <the-input type="password" placeholder="Password"></the-input>
          </div>
        </template>

        <template #buttons>
          <div class="flex justify-center">
            <the-button text="Sign in" />
          </div>
        </template>

        <template #others>
          <div class="px-6 text-center">
            <p class="mt-8 text-sm">Don't have an account? <router-link :to="{ name: 'sign-up'}" class="border-b-brown-color border-b-2 text-brown-color font-bold">Create one</router-link></p>
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
  name: 'SignInView',
  components: {
    TheForm,
    TheInput,
    TheButton
  }
}
</script>

<style>

</style>