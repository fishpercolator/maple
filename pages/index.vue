<template>
  <section>
    <Map></Map>
  </section>
</template>

<script>
import Map from '~/components/Map.vue'

export default {
  components: {
    Map
  }
}
</script>

<style>
@import "skeleton-css/css/normalize";
@import "skeleton-css/css/skeleton";

section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
