<template>
  <li class="options__item">
    <label class="options__label">
      <input
        class="options__radio sr-only"
        type="radio"
        name="delivery"
        :value="options.id"
        :checked="checkOptions === options.id"
        @click="checkClick(options.id)">
      <span class="options__value">{{ options.title }} <b>{{ priceOption }}</b></span>
    </label>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  name: 'OrderRadioDelivery',
  props: {
    options: {
      required: true,
      type: Object
    }
  },
  computed: {
    priceOption () {
      if (this.options.price === '0') {
        return 'бесплатно'
      } else {
        return numberFormat(this.options.price)
      }
    },
    checkOptions () {
      return this.$store.state.optionDelivery
    }
  },
  methods: {
    checkClick (val) {
      this.$store.state.optionDelivery = val
    }
  }
}
</script>
