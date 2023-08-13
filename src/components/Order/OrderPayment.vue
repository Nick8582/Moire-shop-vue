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
  methods: {
    loadOrderPayment () {
      axios.get(`${API_BASE_URL}/api/payments`, {
        params: {
          deliveryTypeId: this.$store.state.optionPayment
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
