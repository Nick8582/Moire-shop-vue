<template>
  <div class="content__top">

    <div class="content__row">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
          {{ countProducts }} товара
        </span>
    </div>
  </div>
</template>
<script>
import {API_BASE_URL} from "@/config";
import axios from 'axios';

export default {
  name: 'MainContentTop',

  data() {
    return {
      productsData: null,
    }
  },
  computed: {
    countProducts() {
      return this.productsData ? this.productsData.items.length : 0;
    }
  },
  methods: {
    loadProducts() {
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
            .get(`${API_BASE_URL}/api/products`, {

            })
            .then((response) => this.productsData = response.data)
      }, 0);
    }
  },
  created() {
    this.loadProducts();
  },
}
</script>
