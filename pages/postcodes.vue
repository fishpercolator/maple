<template>
  <section id="postcodes">
    <PostcodeMap />
  </section>
</template>

<script>
import PostcodeMap from '~/components/PostcodeMap.vue'

export default {
  components: {
    PostcodeMap
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
