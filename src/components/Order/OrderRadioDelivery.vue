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
      <span class="options__value">{{ options.title }} <b>{{ price }}</b></span>
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
  data () {
    return {
      price: ''
    }
  },
  computed: {
    checkOptions () {
      return this.$store.state.optionDelivery
    }
  },
  methods: {
    priceOption () {
      if (this.options.price === '0') {
        this.price = 'бесплатно'
      } else {
        this.price = `${numberFormat(this.options.price)} ₽`
      }
    },
    priceStore () {
      this.$store.state.deliveryPrice = this.price
    },
    checkClick (val) {
      this.priceStore()
      this.$store.state.optionDelivery = val
    }
  },
  created () {
    this.priceOption()
  }
}
</script>
