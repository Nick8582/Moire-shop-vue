<template>
  <div class="content__top">

    <div class="content__row">
      <h1 class="content__title">
        {{ name }}
      </h1>
      <span class="content__info">
          {{ info }} товара
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    info: String,
  },
  name: 'ContentTop',
}
</script>
