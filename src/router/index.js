import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage'
import CartPage from '@/pages/CartPage'
import ProductPage from '@/pages/ProductPage'
import OrderPage from '@/pages/OrderPage'
import OrderInfoPage from '@/pages/OrderInfoPage'
import NotFoundPage from '@/pages/NotFoundPage'

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
    path: '/product/:id',
    name: 'product',
    component: ProductPage
  },
  {
    path: '/order',
    name: 'order',
    component: OrderPage
  },
  {
    path: '/order/:id',
    name: 'orderInfo',
    component: OrderInfoPage
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
