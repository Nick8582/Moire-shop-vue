import { createStore } from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default createStore({
  state: {
    userAccessKey: null,
    cartProducts: [],
    cartProductsData: [],
    optionDelivery: 1,
    optionPayment: 1,
    deliveryPrice: 'бесплатно',
    orderInfo: null
  },
  mutations: {
    addCartProductData (state, items) {
      state.cartProductsData = items
    },
    syncCartProducts (state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        id: item.product.id,
        quantity: item.quantity
      }))
    },
    updateUserAccessKey (state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProductData (state, items) {
      state.cartProductsData = items
    },
    updateCartProductQuantity (state, {
      productId,
      quantity
    }) {
      const item = state.cartProducts.find((item) => item.productId === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    resetCart (state) {
      state.cartProducts = []
      state.cartProductsData = []
    },
    updateOrderInfo (state, payload) {
      state.orderInfo = payload
    }
  },
  getters: {
    cartDetailProducts (state) {
      if (state.cartProducts) {
        return state.cartProductsData
      }
    },
    cartTotalPrice (state) {
      return state.cartProductsData.reduce((acc, item) => (item.price * item.quantity) + acc, 0)
    }
  },
  actions: {
    addProductToCart (context, {
      productId,
      colorId,
      sizeId,
      quantity
    }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        colorId,
        sizeId,
        quantity
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      }).then((res) => {
        context.commit('addCartProductData', res.data.items)
        context.commit('syncCartProducts')
      })
    },
    loadCart (context) {
      return axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      }).then((res) => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', res.data.user.accessKey)
          context.commit('updateUserAccessKey', res.data.user.accessKey)
        }
        context.commit('updateCartProductData', res.data.items)
        context.commit('syncCartProducts')
      })
    },
    updateCartProductQuantity (context, {
      productId,
      quantity
    }) {
      context.commit('updateCartProductQuantity', {
        productId,
        quantity
      })
      if (quantity < 1) {
        return
      }
      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        basketItemId: productId,
        quantity
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      }).then((res) => context.commit('updateCartProductData', res.data.items))
        .catch(() => context.commit('syncCartProducts'))
    },
    deleteCartProduct (context, productId) {
      context.commit('updateCartProductQuantity', productId)
      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        data: {
          basketItemId: productId
        },
        params: {
          userAccessKey: context.state.userAccessKey
        }
      }).then((res) => {
        context.commit('updateCartProductData', res.data.items)
        context.commit('syncCartProducts')
      })
    },

  },
  modules: {}
})
