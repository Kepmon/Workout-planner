<template>
    <div class="mb-10 relative">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          v-bind="$attrs"
        />
        <transition name="error">
          <p v-show="conditions" class="mt-1 ml-2 absolute text-xs text-red-700 font-bold">
            {{ errorText }}
          </p>
        </transition>
    </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
defineProps<{
  width: string,
  modelValue: string,
  value: string,
  conditions: string,
  errorText: string
}>()

defineEmits(['update:modelValue'])
</script>
