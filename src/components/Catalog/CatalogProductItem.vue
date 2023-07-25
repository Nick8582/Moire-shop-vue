<template>
  <li class="catalog__item">
    <router-link :to="{name: 'product', params: {id: productId}}" class="catalog__pic">
      <img :src="images[activePhoto].file.url" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: productId}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">{{ pricePretty }} ₽</span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="(color, index) in product.colors" :key="index">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            name="color-product"
            :value="index"
            v-model.number="activePhoto">
          <span class="colors__value" :style="{backgroundColor: color.color.code}"></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  name: 'CatalogProductItem',
  props: ['product', 'images', 'productId'],
  data () {
    return {
      activePhoto: 0
    }
  },
  methods: {
    photoProduct () {
      return this.product.colors[this.activePhoto].gallery[0].file.url
    }
  },
  computed: {
    pricePretty () {
      return numberFormat(this.product.price)
    }
  }
}
</script>
