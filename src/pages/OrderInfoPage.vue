<template>
  <LoadingPage v-if="isLoading"/>
  <div class="content__top" v-if="!isLoading">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" to="/">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link class="breadcrumbs__link" to="/cart">
          Корзина
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          Оформление заказа
        </a>
      </li>
    </ul>

    <h1 class="content__title">
      Заказ оформлен <span>№ {{ orderInfo.id }}</span>
    </h1>
  </div>

  <section class="cart" v-if="!isLoading">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <p class="cart__message">
          Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
          Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
        </p>

        <ul class="dictionary">
          <li class="dictionary__item">
            <span class="dictionary__key">Получатель</span>
            <span class="dictionary__value">{{ orderInfo.name }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">Адрес доставки</span>
            <span class="dictionary__value">{{ orderInfo.address }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">Телефон</span>
            <span class="dictionary__value">{{ orderInfo.phone }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">Email</span>
            <span class="dictionary__value">{{ orderInfo.email }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">Комментарий к заказу</span>
            <span class="dictionary__value">{{ orderInfo.comment }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">Способ оплаты</span>
            <span class="dictionary__value">{{ orderInfo.paymentType }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">Способ доставки</span>
            <span class="dictionary__value">{{ orderInfo.deliveryType.title }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">Статус заказа</span>
            <span class="dictionary__value">{{ orderInfo.status.title }}</span>
          </li>
        </ul>
      </div>

      <OrderListProducts
        :products="orderInfo.basket.items"
        :cart-product-length="orderInfo.basket.items.length"
        :total-price="orderInfo.totalPrice"
        :delivery-price="orderInfo.deliveryType.price"/>
    </form>
  </section>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import LoadingPage from '@/components/Loading/LoadingPage'
import OrderListProducts from '@/components/Order/OrderListProducts'

export default {
  name: 'OrderInfoPage',
  components: {
    OrderListProducts,
    LoadingPage
  },
  methods: {
    async loadOrderInfo () {
      axios.get(`${API_BASE_URL}/api/orders/${this.$route.params.id}`,
        { params: { userAccessKey: this.$store.state.userAccessKey } }).then((res) => {
        this.$store.commit('updateOrderInfo', res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    orderInfo () {
      return this.$store.state.orderInfo
    },
    isLoading () {
      return this.orderInfo === null
    }
  },
  created () {
    this.loadOrderInfo()
  }
}
</script>
