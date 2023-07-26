<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img src="img/product-square-5.jpg" width="120" height="120" srcset="img/product-square-5@2x.jpg 2x"
           alt="Название товара">
    </div>
    <h3 class="product__title">
      Гироскутер Razor Hovertrax 2.0
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
                  <i style="background-color: #73B6EA"></i>
                  Нежно-голубой
                </span>
    </p>
    <span class="product__code">
                Артикул: 1501230
              </span>
    <CounterProduct :class-plus="'product__counter'" v-model:product-amount="productAmount"/>

    <b class="product__price">
      1 990 ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import CounterProduct from '@/components/Counter/CounterProduct'

export default {
  name: 'CartItem',
  components: { CounterProduct },
  props: {
    product: Object
  },
  data () {
    return {
      productAmount: null
    }
  }
}
</script>
