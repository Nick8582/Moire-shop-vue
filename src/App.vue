<template>
  <TheHeader/>
  <div class="content container">
    <router-view/>
  </div>
  <TheFooter/>
</template>

<script>
import TheHeader from '@/components/Header/TheHeader'
import TheFooter from '@/components/Footer/TheFooter'
import gotoPage from '@/helpers/gotoPage'

export default {
  gotoPage,
  name: 'App',
  components: {
    TheFooter,
    TheHeader
  }
}
</script>
