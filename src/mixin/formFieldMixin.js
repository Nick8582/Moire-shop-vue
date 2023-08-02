import OrderInput from '@/components/Order/OrderInput'
export default {
  model: { OrderInput },
  components: { OrderInput },
  props: {
    title: {
      required: true,
      type: String
    },
    error: {
      type: String
    },
    placeholder: {
      required: true,
      type: String
    },
    modelValue: {
      type: String
    }
  },
  computed: {
    dataValue: {
      get () {
        return this.modelValue
      },
      set (modelValue) {
        this.$emit('update:modelValue', modelValue)
      }
    }
  }
}
