import OrderInputField from '@/components/Order/OrderInputField'

export default {
  model: { OrderInputField },
  components: { OrderInputField },
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
        return this.value
      },
      set (modelValue) {
        this.$emit('update:modelValue', modelValue)
      },
    }
  }
}
