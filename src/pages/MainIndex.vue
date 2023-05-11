<template>
  <MainContentTop/>
  <TheCatalog/>
</template>

<script>
import MainContentTop from "@/components/Main/Catalog/MainContentTop";
import TheCatalog from "@/components/Main/Catalog/TheCatalog";

export default {
  name: 'MainIndex',
  components: {
    TheCatalog,
    MainContentTop
  }
}
</script>
