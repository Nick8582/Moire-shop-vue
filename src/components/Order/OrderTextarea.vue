<template>
  <OrderInputField :title="title" :error="error">
    <textarea
      class="form__input"
      :placeholder="placeholder"
      v-model="dataValue" />
  </OrderInputField>
</template>

<script>
import OrderInputField from '@/components/Order/OrderInputField'
import formFieldMixin from '@/mixin/formFieldMixin'

export default {
  name: 'OrderTextarea',
  components: { OrderInputField },
  mixins: [formFieldMixin]
}
</script>
