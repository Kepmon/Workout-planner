<template>
  <main>
    <div class="py-12">
      <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">Sign up</h2>
      <the-form @change="isFormSubmitted = false">
        <template #inputs>
          <div class="flex flex-col px-6">
            <the-input
            v-model="userData.name"
            type="text"
            placeholder="User name"
            :formSubmitted="isFormSubmitted"
            keyName="user name"
            :keyValue="userData.name"
            :class="{ 'mb-0': isFormSubmitted && isNameCorrect }"
            >
            </the-input>
            <p
            v-show="isFormSubmitted && isNameCorrect"
            class="mt-1 ml-2 mb-8 text-xs text-red-700 font-bold"
            >
              {{ isNameCorrect }}
            </p>
            <the-input
            v-model="userData.passOne"
            type="password"
            placeholder="Password"
            :formSubmitted="isFormSubmitted"
            keyName="password"
            :keyValue="userData.passOne"
            :class="{ 'mb-0': isFormSubmitted
            && isPasswordCorrect === 'Password must have at least 8 characters.' }"
            >
            </the-input>
            <p
            v-show="isFormSubmitted
            && isPasswordCorrect === 'Password must have at least 8 characters.'"
            class="mt-1 ml-2 mb-8 text-xs text-red-700 font-bold"
            >
              {{ isPasswordCorrect }}
            </p>
            <the-input
            v-model="userData.passTwo"
            type="password"
            placeholder="Repeat password"
            :formSubmitted="isFormSubmitted"
            keyName="repeated password"
            :keyValue="userData.passTwo"
            :class="{ 'mb-0': isFormSubmitted && isPasswordCorrect === passTwoError }"
            >
            </the-input>
            <p
            v-show="isFormSubmitted && isPasswordCorrect === passTwoError"
            class="mt-1 ml-2 mb-8 text-xs text-red-700 font-bold"
            >
              {{ passTwoError }}
            </p>
            <the-input
            v-model="userData.email"
            type="email"
            placeholder="Email"
            :formSubmitted="isFormSubmitted"
            :keyValue="userData.email"
            keyName="email"
            :class="{ 'mb-0': isFormSubmitted && isEmailCorrect === emailError }"
            >
            </the-input>
            <p
            v-show="isFormSubmitted && isEmailCorrect === emailError"
            class="mt-1 ml-2 mb-8 text-xs text-red-700 font-bold"
            >
              {{ emailError }}
            </p>
          </div>
        </template>
        
        <template #buttons>
          <div class="flex justify-center">
            <the-button @click.prevent="isFormSubmitted = true" text="Sign up" />
          </div>
        </template>
        
        <template #others>
          <div class="flex justify-evenly px-6 mt-8 text-center">
            <the-input v-model="isCheckboxChecked" type="checkbox" />
            <label v-if="$route.name === 'sign-up'" class="text-sm">
                By clicking here, I state that I have read and understood the
                <span class="border-b-brown-color border-b-2 text-brown-color font-bold">
                  <router-link :to="{ name: 'terms-and-conditions' }" target="_blank">
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
      emailError: 'The provided input is not a valid email address.',
      passOneError: '',
      passTwoError: "Passwords don't match."
    }
  },
  computed: {
    isNameCorrect() {
      return this.checkLength(this.userData.name, 5, 'User name')
    },
    isPasswordCorrect() {
      if (this.userData.passOne !== '' && this.userData.passTwo !== '' && this.userData.passOne !== this.userData.passTwo) {
        return this.passTwoError
      }

      return this.checkLength(this.userData.passOne, 8, 'Password')
    },
    isEmailCorrect() {
      // eslint-disable-next-line no-useless-escape
      const emailConditions = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

      if (this.userData.email !== '' && !emailConditions.test(this.userData.email)) {
        return this.emailError
      }

      return this.userData.email
    }
  },
  methods: {
    // eslint-disable-next-line consistent-return
    checkLength(value, minChar, label) {
      if (value !== '' && value.length < minChar) {
        // eslint-disable-next-line no-param-reassign
        value = `${label} must have at least ${minChar} characters.`
        return value
      }
    }
  }
}
</script>
