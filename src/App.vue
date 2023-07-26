<template>
  <TheHeader/>
  <main class="content container">
    <router-view/>
  </main>
  <TheFooter/>
</template>

<script>
import TheHeader from '@/components/Header/TheHeader'
import TheFooter from '@/components/Footer/TheFooter'
import gotoPage from '@/helpers/gotoPage'
import { mapActions, mapMutations } from 'vuex'

export default {
  gotoPage,
  name: 'App',
  components: {
    TheFooter,
    TheHeader
  },
  created () {
    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey)
    }
    this.loadCart()
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey'])
  }
}
</script>
