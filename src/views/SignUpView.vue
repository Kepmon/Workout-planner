<template>
  <main>
    <div class="py-12">
      <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">Sign up</h2>
      <the-form>
        <template #inputs>
          <div class="flex flex-col px-6">
            <the-input
            v-model="userData.name"
            type="text"
            placeholder="User name"
            :conditions="isFormSubmitted && nameError !== ''"
            :errorText="nameError"
            >
            </the-input>
            <the-input
            v-model="userData.passOne"
            type="password"
            placeholder="Password"
            :conditions="isFormSubmitted && passOneError !== ''"
            :errorText="passOneError"
            >
            </the-input>
            <the-input
            v-model="userData.passTwo"
            type="password"
            placeholder="Repeat password"
            :conditions="isFormSubmitted && passTwoError !== ''"
            :errorText="passTwoError"
            >
            </the-input>
            <the-input
            v-model="userData.email"
            type="email"
            placeholder="Email"
            :conditions="isFormSubmitted && emailError !== ''"
            :errorText="emailError"
            >
            </the-input>
            <!-- <p
            v-show="isFormSubmitted && emailError !== ''"
            class="mt-1 ml-2 mb-8 text-xs text-red-700 font-bold"
            >
              {{ emailError }}
            </p> -->
          </div>
        </template>
        
        <template #buttons>
          <div class="flex justify-center">
            <the-button @click.prevent="checkForm" text="Sign up" />
          </div>
        </template>
        
        <template #others>
          <div class="flex justify-evenly px-6 mt-8 text-center">
            <the-input v-model="isCheckboxChecked" type="checkbox" idValue="privacy" />
            <label v-if="$route.name === 'sign-up'" for="privacy" class="text-sm">
                By clicking here, I state that I have read and understood the
                <span class="border-b-brown-color border-b-2 text-brown-color font-bold">
                  <router-link :to="{ name: 'privacy-policy' }" target="_blank">
                    Privacy Policy<!--
                  --></router-link>
                </span>.
            </label>
          </div>

          <transition name="error">
            <p
            v-show="isFormSubmitted && !isCheckboxChecked"
            class="text-xs text-center text-red-700 font-bold"
            >
              You need to accept the Privacy Policy.
            </p>
          </transition>

          <div class="px-6 text-center">
            <p class="mt-8 text-sm">
              Already have an account?
              <router-link :to="{ name: 'sign-in'}"
              class="border-b-brown-color border-b-2 text-brown-color font-bold">
                Sign in
              </router-link>
            </p>
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
  },
  data() {
    return {
      userData: {
        name: '',
        passOne: '',
        passTwo: '',
        email: ''
      },
      isCheckboxChecked: false,
      isFormSubmitted: false,
      nameError: '',
      passOneError: '',
      passTwoError: '',
      emailError: ''
    }
  },
  methods: {
    // eslint-disable-next-line consistent-return
    checkLength(input, minChar, label) {
      if (input === '') {
        return `The "${label}" value is required.`
      }

      if (input !== '' && input.length < minChar) {
        return `${label} must have at least ${minChar} characters.`
      }
    },
    checkName() {
      this.nameError = this.checkLength(this.userData.name, 5, 'User name')
    },
    checkPassword() {
      this.passOneError = this.checkLength(this.userData.passOne, 8, 'Password')
      this.passTwoError = this.checkLength(this.userData.passTwo, 0, 'Repeat password')

      if (this.userData.passOne !== '' && this.userData.passTwo !== '' && this.userData.passOne !== this.userData.passTwo) {
        this.passTwoError = "Passwords don't match."
      }
    },
    checkEmail() {
      this.emailError = this.checkLength(this.userData.email, 0, 'Email')
      const emailConditions = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

      if (this.userData.email !== '' && !emailConditions.test(this.userData.email)) {
        this.emailError = 'The provided input is not a valid email address.'
      }

      return this.emailError
    },
    checkForm() {
      this.isFormSubmitted = true
      this.checkName()
      this.checkPassword()
      this.checkEmail()
    }
  }
}
</script>
