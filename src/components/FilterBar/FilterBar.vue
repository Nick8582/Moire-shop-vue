<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get">
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
                     type="checkbox"
                     name="color"
                     :value="color.title"
                     v-model="currentColorsId"
              >
              <span class="colors__value" :style="{'background-color': color.code}"></span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials" :key="material.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only"
                     type="checkbox"
                     name="material"
                     :value="material.code"
                     v-model="currentMaterialId"
              >
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
              <input class="check-list__check sr-only"
                     type="checkbox"
                     name="collection"
                     :value="season.code"
                     v-model="currentSeasonsId"
              >
              <span class="check-list__desc">
                    {{ season.title }}
                    <span>({{ season.productsCount }})</span>
                  </span>
            </label>
          </li>

        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit" @click.prevent="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import {API_BASE_URL} from "../../config.js";

export default {
  name: 'FilterBar',
  props: [
    'priceFrom',
    'priceTo',
    'categoryId',
    'materialId',
    'seasonsId',
    'colorsId',
  ],
  data() {
    return {
      currentPriceFromStock: 0,
      currentPriceFrom: 0,
      currentPriceToStock: 12345,
      currentPriceTo: 12345,
      currentCategoryId: 0,
      currentCategoryIdStock: 0,
      currentMaterialId: [],
      currentMaterialIdStock: [],
      currentSeasonsId: [],
      currentSeasonsIdStock: [],
      currentColorsId: [],
      currentColorsIdStock: [],

      categoriesData: null,
      materialsData: null,
      seasonsData: null,
      colorsData: null,
    }
  },
  created() {
    this.loadCategories();
    this.loadMaterials();
    this.loadSeasons();
    this.loadColors()
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    materials() {
      return this.materialsData ? this.materialsData.items : [];
    },
    seasons() {
      return this.seasonsData ? this.seasonsData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    }
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
    seasonsId(value) {
      this.currentSeasonsId = value;
    },
    colorsId(value) {
      this.currentColorsId = value;
    }
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:materialId', this.currentMaterialId);
      this.$emit('update:seasonsId', this.currentSeasonsId);
      this.$emit('update:colorsId', this.currentColorsId);
    },
    reset() {
      this.$emit('update:priceFrom', this.currentPriceFromStock);
      this.$emit('update:priceTo', this.currentPriceToStock);
      this.$emit('update:categoryId', this.currentCategoryIdStock);
      this.$emit('update:materialId', this.currentMaterialIdStock);
      this.$emit('update:seasonsId', this.currentSeasonsIdStock);
      this.$emit('update:colorsId', this.currentColorsIdStock);
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
          .then((res) => this.categoriesData = res.data)
          .catch((err) => console.log('Упс произошла ошибка -> ', err))
    },
    loadMaterials() {
      axios.get(`${API_BASE_URL}/api/materials`)
          .then((res) => this.materialsData = res.data)
          .catch((err) => console.log('Упс произошла ошибка -> ', err))
    },
    loadSeasons() {
      axios.get(`${API_BASE_URL}/api/seasons`)
          .then((res) => this.seasonsData = res.data)
          .catch((err) => console.log('Упс произошла ошибка -> ', err))
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
          .then((res) => this.colorsData = res.data)
          .catch((err) => console.log('Упс произошла ошибка -> ', err))
    }
  }
}
</script>
