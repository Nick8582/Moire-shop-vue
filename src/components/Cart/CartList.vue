<template>
  <ul class="cart__list">
    <CartItem />
  </ul>
</template>

<script>
import CartItem from '@/components/Cart/CartItem'
export default {
  name: 'CartList',
  components: { CartItem }
}
</script>
