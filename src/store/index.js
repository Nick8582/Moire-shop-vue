import { createStore } from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default createStore({
  state: {
    cartData: [],
    userAccessKey: null,
    cartProducts: [],
    cartProductsData: []
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
    }
  },
  getters: {},
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
    }
  },
  modules: {}
})
