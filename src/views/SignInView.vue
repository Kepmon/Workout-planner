<template>
  <main>
    <the-form>
      <template #inputs>
        <the-input type="text" placeholder="User name"></the-input>
        <the-input type="password" placeholder="Password"></the-input>
      </template>

      <template #buttons>
        <div class="flex justify-center">
          <the-button text="Sign in" />
        </div>
      </template>
    </the-form>
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