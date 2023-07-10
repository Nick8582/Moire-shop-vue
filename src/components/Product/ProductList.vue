<template>
  <ul class="catalog__list">
    <ProductItem v-for="(product, index) in dataProduct" :key="index" :product="product"/>
  </ul>
</template>
<script>
import ProductItem from "./ProductItem.vue";

export default {
  name: 'ProductList',
  components: {ProductItem},
  props: {
    dataProduct: Array
  }
}
</script>
