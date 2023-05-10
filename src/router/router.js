import { createRouter, createWebHistory } from "vue-router";
import MainIndex from "@/pages/MainIndex.vue";
import CartPage from "@/pages/CartPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: MainIndex, name: 'index'},
    {path: '/cart', component: CartPage, name: 'cart'},
  ]
})
