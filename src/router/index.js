import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage'
import CartPage from '@/pages/CartPage'
import ProductPage from '@/pages/ProductPage'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/product',
    name: 'product',
    component: ProductPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
