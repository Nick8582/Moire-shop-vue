<template>
  <ul class="catalog__list">
    <CatalogProductItem
      v-for="product in dataProduct"
      :key="product.id"
      :images="product.images"
      :productId="product.id"
      :product="product"/>
  </ul>
</template>

<script>
import CatalogProductItem from '@/components/Catalog/CatalogProductItem'

export default {
  name: 'CatalogProductList',
  components: { CatalogProductItem },
  props: {
    dataProduct: Array
  }
}
</script>
