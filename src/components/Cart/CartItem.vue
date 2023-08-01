<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="imageProduct" width="120" height="120" :alt="product.product.title">
    </div>
    <h3 class="product__title">{{ product.product.title }}</h3>
    <p class="product__info product__info--color">
      Размер:
      <span class="product__size">{{ product.size.title }}</span>
      Цвет:
      <span><i :style="`background-color: ${colorProduct.color.code}`"></i>{{ colorProduct.color.title }}</span>
    </p>
    <span class="product__code">Артикул: {{ product.id }}</span>
    <CounterProduct :class-plus="'product__counter'" v-model:product-amount="amount"/>

    <b class="product__price">
      {{ pricePretty }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
            @click.prevent="deleteProduct(product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import CounterProduct from '@/components/Counter/CounterProduct'
import numberFormat from '@/helpers/numberFormat'
import { mapActions } from 'vuex'

export default {
  name: 'CartItem',
  components: { CounterProduct },
  props: {
    product: Object
  },
  data () {
    return {
      productGallery: 0
    }
  },
  computed: {
    colorProduct () {
      return this.product.color
    },
    imageProduct () {
      return this.colorProduct.gallery[0].file.url
    },
    pricePretty () {
      return numberFormat(this.product.price * this.product.quantity)
    },
    amount: {
      get () {
        return this.product.quantity
      },
      set (value) {
        this.$store.dispatch('updateCartProductQuantity', {
          productId: this.product.id,
          quantity: value
        })
      }
    }
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteCartProduct' })
  }
}
</script>

<style scoped>
.product__size {
  padding: 0;
}
</style>
