<template>
  <TheHeader/>
  <main class="content container">
    <router-view/>
  </main>
  <TheFooter/>
</template>

<script>
import TheHeader from "./components/Header/TheHeader.vue";
import TheFooter from "./components/Footer/TheFooter.vue";

export default {
  components: {TheFooter, TheHeader}
}
</script>
