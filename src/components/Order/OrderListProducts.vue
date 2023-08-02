<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <OrderItemProduct/>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>бесплатно</b></p>
      <p>Итого: <b>{{ $store.state.cartProducts.length }}</b> товара на сумму <b>{{ totalPricePretty }} ₽</b></p>
    </div>

    <button class="cart__button button button--primery" type="submit">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import OrderItemProduct from '@/components/Order/OrderItemProduct'
import numberFormat from '@/helpers/numberFormat'
import { mapGetters } from 'vuex'

export default {
  name: 'OrderListProducts',
  components: { OrderItemProduct },
  computed: {
    ...mapGetters({
      totalPrice: 'cartTotalPrice'
    }),
    totalPricePretty () {
      return numberFormat(this.totalPrice)
    }
  }
}
</script>
