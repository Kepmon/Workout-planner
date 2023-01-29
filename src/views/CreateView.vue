<template>
  <main>
    <the-form>
      <template #inputs>
        <the-input type="text" placeholder="Workout name" />
        <select class="pl-4 h-9 min-w-[300px] rounded-full text-sm outline-none focus:shadow-3xl max-[399px]:min-w-0">
          <option value="" class="text-placeholder-color">Choose exercise</option>
        </select>
        <div class="flex justify-between">
          <the-input type="number" placeholder="Sets" width="max-w-[140px]" />
          <the-input type="number" placeholder="Reps" width="max-w-[140px]" />
        </div>
        <div class="flex justify-between">
          <the-input type="number" placeholder="Weight" />

          <div class="flex gap-2">
            <label for="kg" class="flex justify-center items-center text-sm text-placeholder-color h-9 w-9 p-2 rounded-full cursor-pointer" :class="{ 'bg-regular-yellow': kgValue, 'bg-white': !kgValue }">
              kg
              <input v-model="isClicked" id="kg" name="unit" type="radio" value="kg" class="appearance-none" />
            </label> 
            <label for="lb" class="flex justify-center items-center text-sm text-placeholder-color h-9 w-9 p-2 rounded-full cursor-pointer" :class="{ 'bg-regular-yellow': lbValue, 'bg-white': !lbValue }">
              lb
              <input v-model="isClicked" id="lb" name="unit" type="radio" value="lb" class="appearance-none" />
            </label> 
          </div>
        </div>
      </template>

      <template #buttons>
        <div class="flex flex-col mx-auto gap-4 max-w-[240px]">
          <the-button text="Add new exercise" />
          <the-button text="Finish" />
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
  name: 'CreateView',
  components: {
    TheForm,
    TheInput,
    TheButton
  },
  data() {
    return {
      isClicked: '',
    }
  },
  computed: {
    kgValue() {
      return this.isClicked === 'kg' ? true : false
    },
    lbValue() {
      return this.isClicked === 'lb' ? true : false
    }
  }
}
</script>

<style>

</style>