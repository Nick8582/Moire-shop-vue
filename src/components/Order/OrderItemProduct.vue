<template>
  <li class="cart__order">
    <h3>{{ product.product.title }}</h3>
    <b>{{ priceProductPretty }} ₽ x {{ product.quantity }}</b>
    <span>Артикул: {{ product.id }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  name: 'OrderItemProduct',
  props: {
    product: {
      required: true
    }
  },
  computed: {
    priceProductPretty () {
      return numberFormat(this.product.price)
    }
  }
}
</script>
