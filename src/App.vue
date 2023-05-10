<template>
  <TheHeader/>
  <main class="content container">
    <router-view/>
  </main>
  <TheFooter/>
</template>

<script>
import TheHeader from './components/Header/Header.vue';
import TheFooter from "@/components/Footer/TheFooter";

export default {
  name: 'App',
  components: {
    TheFooter,
    TheHeader
  }
}
</script>
