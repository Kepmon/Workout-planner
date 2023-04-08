<template>
  <form>
    <div class="flex flex-col w-full">
      <slot name="inputs"></slot>
      <slot name="buttons"></slot>
      <slot name="others"></slot>
    </div>
  </form>
</template>

<style scoped>
form {
  @apply flex flex-col items-center mx-auto py-8 bg-regular-yellow w-[460px] rounded-[32px];
  @apply shadow-3xl max-[500px]:max-w-[350px] max-[400px]:max-w-[300px] max-[350px]:max-w-[250px];
}
</style>
