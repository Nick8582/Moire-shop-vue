<template>
  <ContentTop name="Каталог" :info="totalProduct"/>
  <div class="content__catalog">
    <FilterBar
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:color-id="filterColorId"
        v-model:material-id="filterMaterialId"
        v-model:season-id="filterSeasonId"
    />
    <section class="catalog">
      <LoaderPage :logo="true" :title="true" v-if="productsLoading"/>
      <LoaderFiled v-if="productsLoadingFailed"/>
      <ProductList :dataProduct="products"/>
      <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
    </section>
  </div>
</template>

<script>
import ContentTop from "../components/ContentTop/ContentTop.vue";
import FilterBar from "../components/FilterBar/FilterBar.vue";
import ProductList from "../components/Product/ProductList.vue";
import BasePagination from "../components/Pagination/BasePagination.vue";
import LoaderPage from "../components/Loader/LoaderPage.vue";
import LoaderFiled from "../components/Loader/LoaderFiled.vue";
import axios from "axios";
import {API_BASE_URL} from "../config.js";

export default {
  name: 'HomePage',
  components: {BasePagination, ProductList, LoaderFiled, LoaderPage, FilterBar, ContentTop},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      filterMaterialId: 0,
      filterSeasonId: 0,

      page: 1,
      productsPerPage: 6,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
      totalProduct: 0,
      pages: 0,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.colors[0].gallery[0].file.url,
            };
          })
          : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
    filterMaterialId() {
      this.loadProducts();
    },
    filterSeasonId() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
            .get(`${API_BASE_URL}/api/products`, {
              params: {
                page: this.page,
                limit: this.productsPerPage,
                categoryId: this.filterCategoryId,
                minPrice: this.filterPriceFrom,
                maxPrice: this.filterPriceTo,
                colorId: this.filterColorId,
                materialId: this.filterMaterialId,
                seasonId: this.filterSeasonId,
              },
            })
            .then((response) => {
              this.productsData = response.data;
              this.totalProduct = response.data.pagination.total;
              this.pages = response.data.pagination.pagesLimit;
            })
            .catch(() => { this.productsLoadingFailed = true; })
            .then(() => { this.productsLoading = false; });
      }, 0);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
