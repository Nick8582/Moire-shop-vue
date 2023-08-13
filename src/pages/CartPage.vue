<template>
  <div class="content__top">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link to="/" class="breadcrumbs__link">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          Корзина
        </a>
      </li>
    </ul>

    <div class="content__row">
      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">{{ $store.state.cartProducts.length }} товара</span>
    </div>
  </div>

  <section class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <h2 v-if="$store.state.cartProducts.length === 0">Корзина пуста</h2>
        <ul class="cart__list" v-else>
          <CartItem v-for="product in products" :product="product" :key="product.id"/>
        </ul>
      </div>

      <div class="cart__block">
        <p class="cart__desc">
          Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
        </p>
        <p class="cart__price">
          Итого: <span>{{ totalPricePretty }} ₽</span>
        </p>
        <router-link v-slot="{navigate}" to="/order">
          <button class="cart__button button button--primery" @click="navigate" :disabled="!totalPrice" type="submit">
            Оформить заказ
          </button>
        </router-link>
      </div>
    </form>
  </section>
</template>

<script>
import CartItem from '@/components/Cart/CartItem'
import { mapGetters } from 'vuex'
import numberFormat from '@/helpers/numberFormat'

export default {
  name: 'CartPage',
  components: {
    CartItem
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice'
    }),
    totalPricePretty () {
      return numberFormat(this.totalPrice)
    }
  }
}
</script>
