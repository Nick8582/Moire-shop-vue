<template>
  <router-link class="header__cart" :to="{ name: 'cart' }">
    <svg width="19" height="24">
      <use xlink:href="img/svg/sprite.svg#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">0</span>
  </router-link>
</template>

<script>
export default {
  name: 'HeaderCartIndicator',
};
</script>
