<template>
  <div class="content__catalog">
    <TheFilter
      :price-from="filterPriceFrom"
      :price-to="filterPriceTo"
    />
    <CatalogBlock :products="products" />
  </div>
</template>
<script>
import TheFilter from "@/components/Main/Catalog/TheFilter";
import CatalogBlock from "@/components/Main/Catalog/CatalogBlock";
import axios from "axios";
import {API_BASE_URL} from "@/config";
export default {
  name: 'TheCatalog',
  components: {CatalogBlock, TheFilter},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,

      productData: null,
      productsLoading: true,
      productsLoadingFailed: false,
    }
  },
  props: {
    msg: String
  },
  computed: {
    products() {
      return this.productData ? [] : [];
    },
  },
  methods: {
    loadProducts() {
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          }
        })
            .then(response => this.productData = response.data)
            .catch(() => this.productsLoadingFailed = true)
            .then(()=> this.productsLoading = false);
      })
    },
  },
  watch: {
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  }
}
</script>
