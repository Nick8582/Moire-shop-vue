import { createStore } from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default createStore({
  state: {
    cartData: [],
    userAccessKey: null,
    cartProductsData: []
  },
  mutations: {
    updateCartProductsData (state, item) {
      state.cartProductsData = item
    },
    syncCartProducts (state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
        product: item.product
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
      return (new Promise(resolve => setTimeout(resolve, 2000)))
        .then(() => axios.post(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          colorId,
          sizeId,
          quantity
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        }).then((res) => {
          context.commit('updateCartProductsData', res.data.item)
          context.commit('syncCartProducts')
        }))
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
        context.commit('updateCartProductsData', res.data.items)
        context.commit('syncCartProducts')
      })
    }
  },
  modules: {}
})
