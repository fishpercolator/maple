<template>
  <section class="container">
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
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
