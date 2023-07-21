<template>
  <main class="content container">
    <CatalogTopContent :info="totalProduct" />
    <div class="content__catalog">
      <CatalogFilterBar
        v-model:filterPriceFrom="filterPriceFrom"
        v-model:filterPriceTo="filterPriceTo"
        v-model:filterCategoryId="filterCategoryId"
        v-model:filterColorId="filterColorId"
        v-model:filterMaterialId="filterMaterialId"
        v-model:filterSeasonId="filterSeasonId"/>
      <section class="catalog">
        <LoadingPage v-if="productLoading"/>
        <LoadingFiled v-if="productLoadingFailed"/>
        <CatalogProductList v-if="!productLoading" :dataProduct="products"/>
        <CatalogPagination v-model="page" :count="countProducts" :per-page="productPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import CatalogFilterBar from '@/components/Catalog/CatalogFilterBar'
import CatalogTopContent from '@/components/Catalog/CatalogTopContent'
import CatalogProductList from '@/components/Catalog/CatalogProductList'
import CatalogPagination from '@/components/Catalog/CatalogPagination'
import LoadingPage from '@/components/Loading/LoadingPage'
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import LoadingFiled from '@/components/Loading/LoadingFiled'

export default {
  name: 'HomePage',
  components: {
    LoadingFiled,
    LoadingPage,
    CatalogPagination,
    CatalogProductList,
    CatalogTopContent,
    CatalogFilterBar
  },
  data () {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: [],
      filterMaterialId: [],
      filterSeasonId: [],
      page: 1,
      productPerPage: 6,
      productsData: null,
      productLoading: false,
      productLoadingFailed: false,
      totalProduct: 0
    }
  },
  computed: {
    products () {
      return this.productsData
        ? this.productsData.items.map((product) => {
          return {
            ...product,
            images: product.colors.flatMap((color) => color.gallery).filter(img => img !== null)
          }
        })
        : []
    },
    countProducts () {
      return this.productsData ? this.productsData.pagination.total : 0
    }
  },
  watch: {
    page () {
      this.loadProducts()
    },
    filterPriceFrom () {
      this.loadProducts()
    },
    filterPriceTo () {
      this.loadProducts()
    },
    filterCategoryId () {
      this.loadProducts()
    },
    filterColorId () {
      this.loadProducts()
    },
    filterMaterialId () {
      this.loadProducts()
    },
    filterSeasonId () {
      this.loadProducts()
    }
  },
  methods: {
    loadProducts () {
      this.productLoading = true
      this.productLoadingFailed = false
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productPerPage,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            categoryId: this.filterCategoryId,
            colorIds: this.filterColorId,
            materialIds: this.filterMaterialId,
            seasonIds: this.filterSeasonId
          }
        }).then((response) => {
          this.productsData = response.data
          this.totalProduct = response.data.pagination.total
        }).catch((e) => {
          this.productLoadingFailed = true
        })
          .then((e) => {
            this.productLoading = false
          })
      }, 0)
    }
  },
  created () {
    this.loadProducts()
  }
}
</script>
