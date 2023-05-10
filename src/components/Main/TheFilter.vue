<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list" >
          <li class="check-list__item" v-for="material in materials" :key="material.id">
            <label class="check-list__label" >
              <input class="check-list__check sr-only" v-model.number="currentMaterialId" type="checkbox" name="material" :value="material.code">
              <span class="check-list__desc">
                    {{ material.title }}
                    <span>({{ material.productsCount }})</span>
                  </span>
            </label>
          </li>

        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection" value="лето" checked="">
              <span class="check-list__desc">
                    лето
                    <span>(2)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection" value="зима">
              <span class="check-list__desc">
                    зима
                    <span>(53)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection" value="весна">
              <span class="check-list__desc">
                    весна
                    <span>(24)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection" value="осень">
              <span class="check-list__desc">
                    осень
                    <span>(30)</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "@/config";

export default {
  name: 'TheFilter',
  data() {
    return{
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentMaterialId: 0,

      categoriesData: null,
      materialsData: null,
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'materialId'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    materials() {
      return this.materialsData ? this.materialsData.items : [];
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    materialId(value) {
      this.currentMaterialId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:materialId', this.currentMaterialId);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:materialId', 0);
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`).then((response) => this.categoriesData = response.data)
    },
    loadMaterial() {
      axios.get(`${API_BASE_URL}/api/materials`).then((response) => this.materialsData = response.data)
    },
  },
  created() {
    this.loadCategories();
    this.loadMaterial();
  }
}
</script>
