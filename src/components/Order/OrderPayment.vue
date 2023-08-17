<template>
  <OrderRadioPayment v-for="item in optionsPayment" :key="item.id" :options="item"/>
</template>

<script>
import OrderRadioPayment from '@/components/Order/OrderRadioPayment'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default {
  name: 'OrderPayment',
  components: { OrderRadioPayment },
  data () {
    return {
      optionsPayment: []
    }
  },
  computed: {
    optionDeliveryId () {
      return this.$store.state.optionDelivery
    }
  },
  watch: {
    optionDeliveryId () {
      this.loadOrderPayment()
    }
  },
  methods: {
    loadOrderPayment () {
      axios.get(`${API_BASE_URL}/api/payments`, {
        params: {
          deliveryTypeId: this.optionDeliveryId
        }
      }).then((res) => {
        this.optionsPayment = res.data
      })
    }
  },
  created () {
    this.loadOrderPayment()
  }
}
</script>
