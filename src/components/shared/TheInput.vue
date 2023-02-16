<template>
    <div class="mb-8">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :class="[className, width]"
          class="w-full"
        />
        <transition name="error">
          <p
            v-show="formSubmitted && keyValue === ''"
            class="mt-1 ml-2 text-xs text-red-700 font-bold"
          >
            The "{{ keyName }}" value is required.
          </p>
        </transition>

        <transition name="error">
          <p
            v-show="(formSubmitted && placeholder === 'Weight')
            && (keyValueOne === '' || keyValueTwo === '')"
            class="mt-1 ml-2 text-xs text-red-700 font-bold"
          >
            The "weight" value and its unit are required.
          </p>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'TheInput',
  props: ['type', 'placeholder', 'width', 'modelValue', 'name', 'id', 'value', 'keyValue', 'keyValueOne', 'keyValueTwo', 'keyName', 'formSubmitted'],
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
