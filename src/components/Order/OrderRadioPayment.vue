<template>
  <li class="options__item">
    <label class="options__label">
      <input
        class="options__radio sr-only"
        type="radio"
        name="pay"
        :value="options.id"
        checked=""
        @click="checkClick(options.id)">
      <span class="options__value">{{ options.title }}</span>
    </label>
  </li>
</template>

<script>
export default {
  name: 'OrderRadioPayment',
  props: {
    options: {
      required: true,
      type: Object
    }
  },
  methods: {
    checkClick (val) {
      this.$store.state.optionPayment = val
    }
  }
}
</script>
