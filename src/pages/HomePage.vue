<template>
  <ContentTop name="Каталог" :info="totalProduct"/>
  <div class="content__catalog">
    <FilterBar
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:material-id="filterMaterialId"
        v-model:seasons-id="filterSeasonId"
        v-model:colors-id="filterColorId"
    />
    <section class="catalog">
      <LoaderPage :logo="true" :title="true" v-if="isLoading"/>
      <LoaderFiled v-if="isLoadingFiled"/>
      <ProductList v-if="productData" :dataProduct="productData.items" />
      <BasePagination :page="page" />
    </section>
  </div>
</template>

<script>
import ContentTop from "../components/ContentTop/ContentTop.vue";
import FilterBar from "../components/FilterBar/FilterBar.vue";
import LoaderPage from "../components/Loader/LoaderPage.vue";
import LoaderFiled from "../components/Loader/LoaderFiled.vue";
import axios from "axios";
import {API_BASE_URL} from "../config.js";
import ProductList from "../components/Product/ProductList.vue";
import BasePagination from "../components/Pagination/BasePagination.vue";

export default {
  name: 'HomePage',
  components: {BasePagination, ProductList, LoaderFiled, LoaderPage, FilterBar, ContentTop},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 12345,
      filterCategoryId: 0,
      filterMaterialId: [],
      filterSeasonId: [],
      filterColorId: [],
      isLoading: false, // отображение загрузчика
      isLoadingFiled: false, // отображение ошибки при неудачной загрузки

      page: 1, // выводимая страница при первой загрузке
      limit: 6, // кол-во получаемых товаров на странице
      productData: null, // массив выводимых товаров получаемых с API
      totalProduct: 0, // кол-во товаров для отображения на странице
      pagesLimit: 0, // кол-во страниц получаемых с API
    }
  },
  methods: {
    loadingProduct() {
      this.isLoading = true;
      this.isLoadingFiled = false;
      clearTimeout(this.loadProduct)
      this.loadProduct = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.limit,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            categoryId: this.filterCategoryId,
            materialIds: this.filterMaterialId,
            seasonIds: this.filterSeasonId,
            colorIds: this.filterColorId,
          }
        })
            .then(res => {
              this.productData = res.data;
              this.totalProduct = res.data.pagination.total;
              this.pages = res.data.pagination.pagesLimit;
            })
            .catch(() => (this.isLoadingFiled = true))
            .then(() => {
              this.isLoading = false
            })
      }, 1000)
    },
  },
  created() {
    this.loadingProduct();
  },
  watch: {
    filterPriceFrom() {
      this.loadingProduct()
    },
    filterPriceTo() {
      this.loadingProduct()
    },
    filterCategoryId() {
      this.loadingProduct()
    },
    filterMaterialId() {
      this.loadingProduct()
    },
    filterSeasonId() {
      this.loadingProduct()
    },
    filterColorId() {
      this.loadingProduct()
    }
  },
}
</script>
