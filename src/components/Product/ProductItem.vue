<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="photoProduct()" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">{{ product.price }} ₽</span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="(color, index) in product.colors" :key="color.color.code">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" :value="index" v-model.number="activePhoto">
          <span class="colors__value" :style="{backgroundColor: color.color.code}"></span>
        </label>
      </li>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'ProductItem',
  props: {
    product: Object
  },
  data () {
    return {
      activePhoto: 0
    }
  },
  methods: {
    photoProduct () {
      return this.product.colors[this.activePhoto].gallery[0].file.url
    }
  }
}
</script>
