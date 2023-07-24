<template>
  <LoadingPage v-if="isLoading"/>
  <LoadingFiled v-if="isLoadingFailed"/>
  <div class="content__top" v-if="!isLoadingFailed && !isLoading">
    <ul class="breadcrumbs">
      <li class="breadcrumbs__item">
        <router-link to="/" class="breadcrumbs__link">
          Каталог
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <router-link :to="{name: 'home', query:{ category: product.category.id }}" class="breadcrumbs__link">
          {{ product.category.title }}
        </router-link>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">
          {{ product.title }}
        </a>
      </li>
    </ul>
  </div>

  <section class="item" v-if="!isLoadingFailed && !isLoading">
    <div class="item__pics pics">
      <div class="pics__wrapper">
        <img width="570" height="570"
             :src="gallery[activeColorId].image"
             :alt="product.title">
      </div>
      <ul class="pics__list">
        <li class="pics__item" v-for="image in gallery" :key="image.id">
          <a href="" class="pics__link" :class="{'pics__link--current' : image.id === colorActiveId}"
             @click.prevent="changeImg(image.id)">
            <img width="98" height="98" :src="image.image" :alt="product.title">
          </a>
        </li>
      </ul>
    </div>

    <div class="item__info">
      <span class="item__code">Артикул: {{ product.id }}</span>
      <h2 class="item__title">
        {{ product.title }}
      </h2>
      <div class="item__form">
        <form class="form" action="#" method="POST">
          <div class="item__row item__row--center">
            <div class="form__counter">
              <button type="button" aria-label="Убрать один товар">
                <svg width="12" height="12" fill="currentColor">
                  <use xlink:href="#icon-minus"></use>
                </svg>
              </button>

              <input type="text" value="1" name="count">

              <button type="button" aria-label="Добавить один товар">
                <svg width="12" height="12" fill="currentColor">
                  <use xlink:href="#icon-plus"></use>
                </svg>
              </button>
            </div>

            <b class="item__price">
              {{ pricePretty }} ₽
            </b>
          </div>

          <div class="item__row">
            <fieldset class="form__block">
              <legend class="form__legend">Цвет</legend>
              <ul class="colors colors--black">
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color"
                      :value="color.color.id"
                      :checked="colorActiveId === color.color.id"
                      v-model="colorActiveId">
                    <span class="colors__value" :style="{'background-color': color.color.code}"></span>
                  </label>
                </li>
              </ul>
            </fieldset>
            <fieldset class="form__block">
              <legend class="form__legend">Размер</legend>
              <label class="form__label form__label--small form__label--select">
                <select class="form__select" name="category" v-model="sizeActiveId">
                  <option v-for="size in product.sizes" :key="size.id" :value="size.id">{{ size.title }}</option>
                </select>
              </label>
            </fieldset>
          </div>

          <button class="item__button button button--primery" type="submit">
            В корзину
          </button>
        </form>
      </div>
    </div>

    <div class="item__desc">
      <ul class="tabs">
        <li class="tabs__item">
          <a class="tabs__link" href="#">
            Информация о товаре
          </a>
        </li>
        <li class="tabs__item">
          <a class="tabs__link tabs__link--current">
            Доставка и возврат
          </a>
        </li>
      </ul>

      <div class="item__content">
        <h3>Доставка:</h3>

        <p>
          1. Курьерская доставка по Москве и Московской области – 290 ₽<br>
          2.Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть здесь<br>
        </p>

        <h3>Возврат:</h3>

        <p>
          Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br>
          Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в которой Вы осуществили
          покупку.
          БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br>
          Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по телефону 8 800 600 90
          09<br>
        </p>

      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import LoadingPage from '@/components/Loading/LoadingPage'
import LoadingFiled from '@/components/Loading/LoadingFiled'
import numberFormat from '@/helpers/numberFormat'
import noImage from '@/assets/noImage.jpg'

export default {
  name: 'ProductPage',
  components: {
    LoadingFiled,
    LoadingPage
  },
  data () {
    return {
      productAmount: 1,
      productData: null,
      activeColorId: 0,
      activeSizeId: 0,
      isLoading: false,
      isLoadingFailed: false
    }
  },
  computed: {
    product () {
      return {
        ...this.productData,
        gallery: this.productData.colors.map(color => {
          return {
            id: color.color.id,
            image: color.gallery ? color.gallery[0].file.url : noImage
          }
        })
      }
    },
    pricePretty () {
      return numberFormat(this.product.price)
    },
    gallery () {
      console.log(this.product.gallery[this.activeColorId])
      return this.product.gallery
    },
    colorActiveId: {
      get () {
        return this.gallery[this.activeColorId].id
      },
      set (id) {
        const ids = this.gallery.findIndex((item) => item.id === id)
        this.activeColorId = ids
      }
    },
    sizeActiveId: {
      get () {
        return this.product.sizes[this.activeSizeId].id
      },
      set (id) {
        const ids = this.product.sizes.findIndex((item) => item.id === id)
        this.activeSizeId = ids
      }
    }
  },
  methods: {
    async loadProduct () {
      this.isLoading = true
      this.isLoadingFailed = false
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        console.log(data)
        this.productData = data
      } catch (err) {
        this.isLoading = false
        this.isLoadingFailed = true
      }
      this.isLoading = false
    },
    changeImg (id) {
      const ids = this.gallery.findIndex((item) => item.id === id)
      this.activeColorId = ids
    }
  },
  created () {
    this.loadProduct()
  }
}
</script>
