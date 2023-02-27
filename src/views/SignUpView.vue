<template>
  <main class="relative">
    <the-toast
    v-show="isToastShown"
    :text="toast.text"
    :background="toast.color"
    />
    <privacy-policy v-show="isPolicyShown" @click="isPolicyShown = false" />

    <div class="py-12">
      <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">Sign up</h2>
      <the-form>
        <template #inputs>
          <div class="flex flex-col px-6">
            <the-input
            v-model="userData.name"
            type="text"
            placeholder="User name"
            class="text w-full"
            :conditions="isFormSubmitted && errorMessages.nameError !== ''"
            :errorText="errorMessages.nameError"
            >
            </the-input>
            <the-input
            v-model="userData.passOne"
            type="password"
            placeholder="Password"
            class="text w-full"
            :conditions="isFormSubmitted && errorMessages.passOneError !== ''"
            :errorText="errorMessages.passOneError"
            >
            </the-input>
            <the-input
            v-model="userData.passTwo"
            type="password"
            placeholder="Repeat password"
            class="text w-full"
            :conditions="isFormSubmitted && errorMessages.passTwoError !== ''"
            :errorText="errorMessages.passTwoError"
            >
            </the-input>
            <the-input
            v-model="userData.email"
            type="email"
            placeholder="Email"
            class="text w-full"
            :conditions="isFormSubmitted && errorMessages.emailError !== ''"
            :errorText="errorMessages.emailError"
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
            <label v-if="$route.name === 'sign-up'" class="flex text-sm">
              <the-input
                @input.capture="isCheckboxChecked = !isCheckboxChecked"
                type="checkbox"
                class="checkbox"
              />
                <span>
                  By clicking here, I state that I have read and understood the
                  <span
                    @click="showModal"
                    class="privacy">
                    Privacy Policy.
                  </span>
                </span>
            </label>
          </div>

          <div class="relative">
            <transition name="error">
              <p
                v-show="isFormSubmitted && errorMessages.checkboxError !== ''"
                class="checkbox-error"
              >
                {{ errorMessages.checkboxError }}
              </p>
            </transition>
          </div>

          <div class="px-6 text-center">
            <p class="mt-8 text-sm">
              Already have an account?
              <router-link :to="{ name: 'sign-in'}"
              class="sign-in">
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
import TheToast from '../components/shared/TheToast.vue'
import PrivacyPolicy from '../components/PrivacyPolicy.vue'
import { supabase } from '../supabase'

export default {
  name: 'SignUpView',
  components: {
    TheForm,
    TheInput,
    TheButton,
    TheToast,
    PrivacyPolicy
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
      isError: false,
      isToastShown: false,
      isPolicyShown: false
    }
  },
  computed: {
    toast() {
      if (!this.isError) {
        return {
          text: "You've signed up successfully. Now, you may sign in into your account.",
          color: 'bg-toast-info'
        }
      }
      return {
        text: 'Ooops, something went wrong. Try again.',
        color: 'bg-toast-error'
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticateUser']),
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
        // eslint-disable-next-line max-len
        const isSuccessful = await this.authenticateUser(this.userData.email, this.userData.passOne, supabase.auth.signUp)

        this.isToastShown = true
          
        setTimeout(() => {
          this.isToastShown = false
        }, 3000)

        if (!isSuccessful) {
          this.isError = true
        } else {
          this.isError = false
          setTimeout(() => {
            this.$router.push({ name: 'sign-in' })
          }, 3500)
        }
      }
    },
    showModal() {
      this.isPolicyShown = true
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.checkbox-error {
  @apply absolute -top-2 left-1/2 -translate-x-1/2 text-xs text-center text-red-700 font-bold;
}
.privacy {
  @apply border-b-brown-color border-b-2 text-brown-color font-bold cursor-pointer;
  @apply selection:bg-light-yellow;
}

.sign-in {
  @apply border-b-brown-color border-b-2 text-brown-color font-bold selection:bg-light-yellow;
}
</style>
