<template>
  <label class="form__label">
    <slot />
    <span class="form__value">{{ title }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'OrderInputField',
  props: {
    title: {
      required: true,
      type: String
    },
    error: {
      type: String
    }
  }
}
</script>
