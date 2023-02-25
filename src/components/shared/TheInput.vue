<template>
    <div class="mb-10 relative">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          v-bind="$attrs"
        />
        <transition name="error">
          <p v-show="conditions" class="mt-1 ml-2 absolute text-xs text-red-700 font-bold">
            {{ errorText }}
          </p>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'TheInput',
  props: ['width', 'modelValue', 'value', 'conditions', 'errorText'],
  emits: ['update:modelValue'],
  inheritAttrs: false
}
</script>
