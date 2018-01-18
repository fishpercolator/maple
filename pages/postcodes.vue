<template>
  <section id="postcodes">
    <div id="map" class="left" />
    <div id="controls" class="right">
      <Nav />
      <h4>Coming soon...</h4>
    </div>
  </section>
</template>

<script>
import Nav from '~/components/Nav.vue'

export default {
  components: {
    Nav
  }
}
</script>

<style lang="scss">
#postcodes {
  display: flex;
  h4 {
    text-align: center;
  }
}
</style>
