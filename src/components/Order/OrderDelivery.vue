<template>
  <ul class="cart__options options">
    <OrderRadioDelivery v-for="item in optionsDelivery" :key="item.id" :options="item" />
  </ul>
</template>

<script>
import OrderRadioDelivery from '@/components/Order/OrderRadioDelivery'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default {
  name: 'OrderDelivery',
  components: {
    OrderRadioDelivery
  },
  data () {
    return {
      optionsDelivery: []
    }
  },
  methods: {
    loadOrderDelivery () {
      axios.get(`${API_BASE_URL}/api/deliveries`).then((res) => {
        this.optionsDelivery = res.data
      })
    }
  },
  created () {
    this.loadOrderDelivery()
  }
}
</script>
