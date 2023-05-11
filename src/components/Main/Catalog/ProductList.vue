<template>
  <ul class="catalog__list">
    <ProductItem/>
  </ul>
</template>

<script>
import ProductItem from "@/components/Main/Catalog/ProductItem";

export default {
  name: 'ProductList',
  components: {ProductItem},
}
</script>
