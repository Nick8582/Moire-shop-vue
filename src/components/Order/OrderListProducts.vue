<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <OrderItemProduct v-for="product in products" :key="product.id" :product="product"/>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>{{ deliveryFormat }}</b></p>
      <p>Итого: <b>{{ cartProductLength }}</b> товара на сумму <b>{{ totalPricePretty }} ₽</b></p>
    </div>

    <button class="cart__button button button--primery" v-show="button" type="submit">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import OrderItemProduct from '@/components/Order/OrderItemProduct'
import numberFormat from '@/helpers/numberFormat'

export default {
  name: 'OrderListProducts',
  components: { OrderItemProduct },
  props: {
    button: {
      type: Boolean,
      default: false
    },
    totalPrice: {
      type: Number,
      required: true
    },
    products: {
      type: Object,
      require: true
    },
    deliveryPrice: {
      type: String || Number,
      required: true
    },
    cartProductLength: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPricePretty () {
      return numberFormat(this.totalPrice)
    },
    deliveryFormat () {
      if (this.deliveryPrice === 'string') {
        return this.deliveryPrice
      } else {
        return numberFormat(this.deliveryPrice)
      }
    }
  }
}
</script>
