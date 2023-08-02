<template>
  <div class="content__top">
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

    <div class="content__row">
      <h1 class="content__title">
        Оформление заказа
      </h1>
    </div>
  </div>
  <section class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <div class="cart__data">
          <OrderInput
            title="ФИО"
            placeholder="Введите ваше полное имя"
            v-model="formData.name"
            :error="formError.name"/>
          <OrderInput
            title="Адрес доставки"
            placeholder="Введите ваш адрес"
            type="tel"
            v-model="formData.address"
            :error="formError.address"/>
          <OrderInput
            title="Телефон"
            placeholder="Введите ваш телефон"
            type="email"
            v-model="formData.phone"
            :error="formError.phone"/>
          <OrderInput
            title="Email"
            placeholder="Введите ваш Email"
            v-model="formData.email"
            :error="formError.email"/>
          <OrderTextarea
            title="Комментарий к заказу"
            placeholder="Ваши пожелания"
            v-model="formData.comment"
            :error="formError.comment"
          />
        </div>

        <div class="cart__options">
          <h3 class="cart__title">Доставка</h3>
          <OrderDelivery />

          <h3 class="cart__title">Оплата</h3>
          <OrderPayment />
        </div>
      </div>

      <OrderListProducts :button="true"/>
      <div class="cart__error form__error-block" v-if="formErrorMessage">
        <h4>Заявка не отправлена!</h4>
        <p>
          {{ formErrorMessage || 'Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.' }}
        </p>
      </div>
    </form>
  </section>
</template>

<script>
import OrderInput from '@/components/Order/OrderInput'
import OrderTextarea from '@/components/Order/OrderTextarea'
import OrderListProducts from '@/components/Order/OrderListProducts'
import OrderDelivery from '@/components/Order/OrderDelivery'
import OrderPayment from '@/components/Order/OrderPayment'

export default {
  name: 'OrderPage',
  components: {
    OrderPayment,
    OrderDelivery,
    OrderListProducts,
    OrderTextarea,
    OrderInput
  },
  data () {
    return {
      formData: {
        name: '',
        address: '',
        phone: '',
        email: '',
        comment: ''
      },
      formError: {
        name: '',
        address: '',
        phone: '',
        email: '',
        comment: ''
      },
      formErrorMessage: ''
    }
  }
}
</script>
