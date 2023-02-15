<template>
  <header>
    <div class="header-bg">
        <div class="flex items-center px-12 h-full w-screen bg-bg-shadow-color max-[499px]:px-8">
            <div class="mx-auto w-1200 max-[1199px]:max-w-1200px">
                <h1>
                  Train hard <span class="font-bold">and</span> smart
                </h1>
            </div>
        </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped>
.header-bg {
  @apply h-400 w-screen bg-[url('/img/gym_photo.png')] bg-center bg-cover bg-fixed;
  @apply max-[599px]:bg-[url('/img/gym_photo_small.png')]
}

h1 {
  @apply text-6xl font-normal text-white-color max-[899px]:text-5xl max-[699px]:text-40
}
</style>
