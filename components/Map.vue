<template>
  <div id="map">
  </div>
</template>

<script>
import wards from '~/static/wards.json'

export default {
  data () {
    return {
      map: null,
      wardvals: wards.features.reduce(function(map, obj) {
        map[obj.properties.wd16nm] = 0
        return map
      })
    }
  },
  mounted () {
    const element = document.getElementById('map')
    const options = {
      zoom: 12,
      center: new google.maps.LatLng(53.8, -1.55)
    }
    this.map = new google.maps.Map(element, options)
    this.map.data.loadGeoJson('wards.json')
  }
}
</script>

<style lang="scss">
#map {
  width: 100vw;
  height: 100vh;
}
</style>
