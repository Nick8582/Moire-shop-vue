<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @click.prevent="submit">
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
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors colors--black">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only"
                     type="radio"
                     name="color"
                     :value="color.id"
                     v-model.number="currentColorId"
              >
              <span class="colors__value" :style="{backgroundColor: color.code}"> </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials" :key="material.id">
            <label class="check-list__label">
              <input class="check-list sr-only" type="checkbox" name="material" :value="material.id"
                     v-model.number="currentMaterialId">
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
          <li class="check-list__item" v-for="season in seasons" :key="season.id">
            <label class="check-list__label">
              <input class="check-list sr-only" type="checkbox" name="season" :value="season.id"
                     v-model.number="currentSeasonId">
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
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
import {API_BASE_URL} from "../../config.js";
import axios from 'axios';

export default {
  name: 'FilterBar',
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      currentMaterialId: 0,
      currentSeasonId: 0,
      colorsData: null,
      categoriesData: null,
      materialsData: null,
      seasonsData: null,
    }
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId', 'materialId', 'seasonId'],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    materials() {
      return this.materialsData ? this.materialsData.items : [];
    },
    seasons() {
      return this.seasonsData ? this.seasonsData.items : [];
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
    colorId(value) {
      this.colorsData = value;
    },
    materialId(value) {
      this.materialsData = value;
    },
    seasonId(value) {
      this.seasonsData = value;
    }
  },
  methods: {
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
          .then((res) => {
            this.categoriesData = res.data;
          })
          .catch((err) => console.log('Упс произошла ошибка -> ', err))
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
          .then((res) => {
            this.colorsData = res.data;
          })
          .catch((err) => console.log('Упс произошла ошибка -> ', err))
    },
    loadMaterials() {
      axios.get(`${API_BASE_URL}/api/materials`)
          .then((res) => {
            this.materialsData = res.data;
          })
          .catch((err) => console.log('Упс произошла ошибка -> ', err))
    },
    loadSeasons() {
      axios.get(`${API_BASE_URL}/api/seasons`)
          .then((res) => {
            this.seasonsData = res.data;
          })
          .catch((err) => console.log('Упс произошла ошибка -> ', err))
    },
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
      this.$emit('update:materialId', this.currentMaterialId);
      this.$emit('update:seasonId', this.currentSeasonId);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
      this.$emit('update:materialId', 0);
      this.$emit('update:seasonId', 0);
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
    this.loadMaterials();
    this.loadSeasons();
  },
}
</script>
