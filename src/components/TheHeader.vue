<template>
  <header>
    <div class="bg-image h-400 w-screen">
        <div class="flex items-center px-12 h-full w-screen bg-bg-shadow-color max-[499px]:px-8">
            <div class="mx-auto w-1200 max-[1199px]:max-w-1200px">
                <h1 class="text-6xl font-normal text-white-color max-[899px]:text-5xl max-[699px]:text-40">Train hard <span class="font-bold">and</span> smart</h1>
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
.bg-image {
    background-image: url('../assets/img/gym_photo.jpg');
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
}
</style>