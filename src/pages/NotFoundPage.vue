<template>
  <div class="notFoundPage">
    <h2 class="notFoundPage__title">Данной страницы не существует
      <router-link class="notFoundPage__link" to="/">вернуться на главную</router-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style>
  .notFoundPage {
    height: 39vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .notFoundPage__title {
    font-size: 30px;
  }
  .notFoundPage__link {
    color: #e02d71;
    transition: color .3s ease-in-out;
  }
  .notFoundPage__link:hover {
    color: #931f4a;
  }
  .notFoundPage__link:active {
    color: #880941;
  }
</style>
