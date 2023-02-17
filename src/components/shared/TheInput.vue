<template>
    <div class="mb-8">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :id="idValue"
          :class="[className, width]"
          class="w-full"
        />
        <transition name="error">
          <p v-show="conditions" class="mt-1 ml-2 text-xs text-red-700 font-bold">
            {{ errorText }}
          </p>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'TheInput',
  props: ['type', 'placeholder', 'width', 'modelValue', 'name', 'value', 'idValue', 'conditions', 'errorText'],
  emits: ['update:modelValue'],
  data() {
    return {
      className: {
        text: this.type === 'text' || 'password' || 'email' || 'number',
        radio: this.type === 'radio',
        checkbox: this.type === 'checkbox'
      }
    }
  }
}
</script>

<style scoped>
.text {
  @apply pl-4 h-9 rounded-full text-sm outline-none focus:shadow-3xl;
  @apply placeholder:text-placeholder-color max-[399px]:min-w-0
}
.radio {
  @apply appearance-none pl-0
}

.checkbox {
  @apply flex items-center justify-center appearance-none mr-1 h-4 w-4 relative top-[2px];
  @apply bg-white rounded-[5px] checked:bg-brown-color checked:after:content-checked;
  @apply after:absolute after:top-0 after:left-[1px]
}
</style>
