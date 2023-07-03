<template>
  <ContentTop name="Каталог" info="122" />
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
      <LoaderPage :logo="true" :title="true" v-if="isLoading" />

    </section>
  </div>
</template>

<script>
import ContentTop from "../components/ContentTop/ContentTop.vue";
import FilterBar from "../components/FilterBar/FilterBar.vue";
import LoaderPage from "../components/Loader/LoaderPage.vue";
export default {
  name: 'HomePage',
  components: {LoaderPage, FilterBar, ContentTop},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 12345,
      filterCategoryId: 0,
      filterMaterialId: [],
      filterSeasonId: [],
      filterColorId: [],
      isLoading: true,

    }
  },
  watch: {
    filterPriceFrom() {

    },
    filterPriceTo() {

    },
    filterCategoryId() {

    },
    filterMaterialId() {

    },
    filterSeasonId() {

    },
    filterColorId() {

    }
  },
}
</script>
