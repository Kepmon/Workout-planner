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

<style>

</style>