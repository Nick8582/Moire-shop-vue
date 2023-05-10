<template>
  <div class="content__catalog">
    <TheFilter />
    <CatalogBlock />
  </div>
</template>
<script>
import TheFilter from "@/components/Main/TheFilter";
import CatalogBlock from "@/components/Main/Catalog/CatalogBlock";
export default {
  name: 'TheCatalog',
  components: {CatalogBlock, TheFilter},
  props: {
    msg: String
  }
}
</script>
