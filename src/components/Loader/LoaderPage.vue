<template>
  <div class="loader__container">
    <img src="../../assets/logo-moire.svg" v-if="logo" class="logo__loader" alt="">
    <h2 class="loader__title">
      <span v-if="title">Загрузка</span>
      <span class="lds-dual-ring"></span>
    </h2>
  </div>
</template>

<script>
export default {
  props: ['logo', 'title'],
  name: 'LoaderPage',
}
</script>
<style>
.loader__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo__loader {
  max-width: 150px;
  width: 100%;
}

.loader__title {
  display: flex;
  align-items: center;
}

.lds-dual-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
  position: relative;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  position: absolute;
  top: calc(50% - 16px);
  left: calc(50% - 16px);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid #000;
  border-color: #000 transparent #E02D71 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

.lds-dual-ring:before {
  content: " ";
  display: block;
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 12px);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 3px solid #000;
  border-color: #000 transparent #E02D71 transparent;
  animation: lds-dual-left 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes lds-dual-left {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
