<template>
  <main>
    <error-toast v-show="isToastShown" text="Ooops, something went wrong. Try again." />

    <div class="py-12">
      <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">Sign up</h2>
      <the-form>
        <template #inputs>
          <div class="flex flex-col px-6">
            <the-input
              v-for="(input, index) in inputs"
              :key="index"
              v-model="input.model"
              :type="input.type"
              :placeholder="input.placeholder"
              class="text w-full"
              :conditions="input.conditions"
              :errorText="input.error"
            >
            </the-input>
          </div>
        </template>
        
        <template #buttons>
          <div class="flex justify-center">
            <the-button @click.prevent="signUpUser" text="Sign up" />
          </div>
        </template>
        
        <template #others>
          <div class="flex justify-evenly px-6 mt-8 text-center">
            <the-input
            @input.capture="isCheckboxChecked = !isCheckboxChecked"
            type="checkbox"
            id="privacy"
            class="checkbox"
            />
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
            v-show="isFormSubmitted && errorMessages.checkboxError !== ''"
            class="text-xs text-center text-red-700 font-bold"
            >
              {{ errorMessages.checkboxError }}
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
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
import TheForm from '../components/shared/TheForm.vue'
import TheInput from '../components/shared/TheInput.vue'
import TheButton from '../components/shared/TheButton.vue'
import ErrorToast from '../components/shared/ErrorToast.vue'

export default {
  name: 'SignUpView',
  components: {
    TheForm,
    TheInput,
    TheButton,
    ErrorToast
  },
  data() {
    return {
      userData: {
        name: '',
        passOne: '',
        passTwo: '',
        email: ''
      },
      errorMessages: {
        nameError: '',
        passOneError: '',
        passTwoError: '',
        emailError: '',
        checkboxError: ''
      },
      isCheckboxChecked: false,
      isFormSubmitted: false,
      isToastShown: false
    }
  },
  computed: {
    inputs() {
      return [
        {
          model: this.userData.name,
          type: 'text',
          placeholder: 'User name',
          conditions: this.isFormSubmitted && this.errorMessages.nameError !== '',
          error: this.errorMessages.nameError
        },
        {
          model: this.userData.name,
          type: 'password',
          placeholder: 'Password',
          conditions: this.isFormSubmitted && this.errorMessages.nameError !== '',
          error: this.errorMessages.passOneError
        },
        {
          model: this.userData.name,
          type: 'password',
          placeholder: 'Repeat password',
          conditions: this.isFormSubmitted && this.errorMessages.nameError !== '',
          error: this.errorMessages.passTwoError
        },
        {
          model: this.userData.name,
          type: 'email',
          placeholder: 'Email',
          conditions: this.isFormSubmitted && this.errorMessages.nameError !== '',
          error: this.errorMessages.emailError
        }
      ]
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signUp']),
    checkLength(input, minChar, label) {
      if (input === '') {
        return `The "${label}" value is required.`
      }

      if (input !== '' && input.length < minChar) {
        return `${label} must have at least ${minChar} characters.`
      }

      return ''
    },
    checkName() {
      this.errorMessages.nameError = this.checkLength(this.userData.name, 5, 'User name')
    },
    checkPassword() {
      this.errorMessages.passOneError = this.checkLength(this.userData.passOne, 8, 'Password')
      this.errorMessages.passTwoError = this.checkLength(this.userData.passTwo, 0, 'Repeat password')

      if (this.userData.passOne !== '' && this.userData.passTwo !== '' && this.userData.passOne !== this.userData.passTwo) {
        this.errorMessages.passTwoError = "Passwords don't match."
      }
    },
    checkEmail() {
      this.errorMessages.emailError = this.checkLength(this.userData.email, 0, 'Email')
      const emailConditions = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

      if (this.userData.email !== '' && !emailConditions.test(this.userData.email)) {
        this.errorMessages.emailError = 'The provided input is not a valid email address.'
      }

      return this.errorMessages.emailError
    },
    checkBox() {
      if (!this.isCheckboxChecked) {
        this.errorMessages.checkboxError = 'You need to accept the Privacy Policy.'
      } else {
        this.errorMessages.checkboxError = ''
      }
    },
    checkForm() {
      this.isFormSubmitted = true
      this.checkName()
      this.checkPassword()
      this.checkEmail()
      this.checkBox()
    },
    async signUpUser() {
      this.checkForm()

      if (Object.values(this.errorMessages).every((value) => value === '')) {
        const isSignedUp = await this.signUp(this.userData.email, this.userData.passOne)

        if (!isSignedUp) {
          this.isToastShown = true
          
          setTimeout(() => {
            this.isToastShown = false
          }, 3000)
        }
      }
    }
  }
}
</script>
