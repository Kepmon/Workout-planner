<template>
  <main class="relative">
    <the-toast
      v-show="isToastShown"
      :text="toast.text"
      :background="toast.color"
    />
    <privacy-policy v-show="isPolicyShown" @click="isPolicyShown = false" />

    <div class="py-12">
      <h2 class="mb-8 text-3xl text-center font-bold tracking-wider">
        Sign up
      </h2>
      <the-form>
        <template #inputs>
          <div class="flex flex-col px-6">
            <the-input
              v-model="userData.name"
              type="text"
              placeholder="User name"
              class="text w-full"
              :condition="isFormSubmitted && errorMessages.nameError !== ''"
              :error-text="errorMessages.nameError"
            >
            </the-input>
            <the-input
              v-model="userData.passOne"
              type="password"
              placeholder="Password"
              class="text w-full"
              :condition="isFormSubmitted && errorMessages.passOneError !== ''"
              :error-text="errorMessages.passOneError"
            >
            </the-input>
            <the-input
              v-model="userData.passTwo"
              type="password"
              placeholder="Repeat password"
              class="text w-full"
              :condition="isFormSubmitted && errorMessages.passTwoError !== ''"
              :error-text="errorMessages.passTwoError"
            >
            </the-input>
            <the-input
              v-model="userData.email"
              type="email"
              placeholder="Email"
              class="text w-full"
              :condition="isFormSubmitted && errorMessages.emailError !== ''"
              :error-text="errorMessages.emailError"
            >
            </the-input>
          </div>
        </template>

        <template #buttons>
          <div class="flex justify-center">
            <the-button text="Sign up" @click.prevent="signUpUser" />
          </div>
        </template>

        <template #others>
          <div class="flex justify-evenly px-6 mt-8 text-center">
            <label v-if="$route.name === 'sign-up'" class="flex text-sm">
              <the-input
                type="checkbox"
                class="checkbox"
                @input.capture="isCheckboxChecked = !isCheckboxChecked"
              />
              <span>
                By clicking here, I state that I have read and understood the
                <span class="privacy" @click="showModal">
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
              <router-link :to="{ name: 'sign-in' }" class="sign-in">
                Sign in
              </router-link>
            </p>
          </div>
        </template>
      </the-form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { handleModal } from "../composables/handleModal";
import TheForm from "../components/shared/TheForm.vue";
import TheInput from "../components/shared/TheInput.vue";
import TheButton from "../components/shared/TheButton.vue";
import TheToast from "../components/shared/TheToast.vue";
import PrivacyPolicy from "../components/PrivacyPolicy.vue";

const isError = ref(false);

const userData = ref({
  name: "",
  passOne: "",
  passTwo: "",
  email: "",
});

const errorMessages = ref({
  nameError: "",
  passOneError: "",
  passTwoError: "",
  emailError: "",
  checkboxError: "",
});

const toast = computed(() => {
  if (!isError.value) {
    return {
      text: "You've signed up successfully. Now, you may sign in into your account.",
      color: "bg-toast-info",
    };
  }
  return {
    text: "Ooops, something went wrong. Try again.",
    color: "bg-toast-error",
  };
});

const checkLength = (input: string, minChar: number, label: string) => {
  if (input === "") {
    return `The "${label}" value is required.`;
  }

  if (input !== "" && input.length < minChar) {
    return `${label} must have at least ${minChar} characters.`;
  }

  return "";
};

const checkName = () => {
  errorMessages.value.nameError = checkLength(
    userData.value.name,
    5,
    "User name"
  );
};

const checkPassword = () => {
  errorMessages.value.passOneError = checkLength(
    userData.value.passOne,
    8,
    "Password"
  );
  errorMessages.value.passTwoError = checkLength(
    userData.value.passTwo,
    0,
    "Repeat password"
  );

  if (
    userData.value.passOne !== "" &&
    userData.value.passTwo !== "" &&
    userData.value.passOne !== userData.value.passTwo
  ) {
    errorMessages.value.passTwoError = "Passwords don't match.";
  }
};

const checkEmail = () => {
  errorMessages.value.emailError = checkLength(
    userData.value.email,
    0,
    "Email"
  );
  const emailConditions =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (
    userData.value.email !== "" &&
    !emailConditions.test(userData.value.email)
  ) {
    errorMessages.value.emailError =
      "The provided input is not a valid email address.";
  }

  return errorMessages.value.emailError;
};

const isCheckboxChecked = ref(false);
const checkBox = () => {
  if (!isCheckboxChecked.value) {
    errorMessages.value.checkboxError =
      "You need to accept the Privacy Policy.";
  } else {
    errorMessages.value.checkboxError = "";
  }
};

const isFormSubmitted = ref(false);
const checkForm = () => {
  isFormSubmitted.value = true;
  checkName();
  checkPassword();
  checkEmail();
  checkBox();
};

const userStore = useUserStore();
const router = useRouter();
const isToastShown = ref(false);
const signUpUser = async () => {
  checkForm();

  if (Object.values(errorMessages.value).every((value) => value === "")) {
    const isSuccessful: boolean = await userStore.signUp(
      userData.value.email,
      userData.value.passOne
    );

    handleModal(isToastShown, true);

    if (isSuccessful !== true) {
      isError.value = true;
      return;
    }

    userStore.updateProfile(userData.value.name);
    isError.value = false;

    setTimeout(() => {
      router.push({ name: "sign-in" });
    }, 3500);
  }
};

const isPolicyShown = ref(false);
const showModal = () => {
  handleModal(isPolicyShown, false);
};
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
