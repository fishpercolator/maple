<template>
  <div id="map-outer" class="leftright">
    <div id="map" class="left">
    </div>
    <div id="controls" class="right">
      <Nav />
      <textarea v-model="postcodes" id="entry" />
    </div>
  </div>
</template>

<script>
import Nav from '~/components/Nav.vue'
import p2ll from '~/assets/postcodes.json'

export default {
  components: {
    Nav
  },
  data () {
    return {
      postcodes: "",
      markers: [],
      map: null
    }
  },
  computed: {
    latlngs () {
      let postcodes = this.postcodes.split(/[\n,]\s*/)
      console.log(postcodes)
      return postcodes.map(p => p2ll[p.replace(/ /, '')]).filter(ll => ll != undefined)
    }
  },
  watch: {
    postcodes () {
      this.redraw()
    }
  },
  methods: {
    redraw () {
      for (let m of this.markers) {
        m.setMap(null)
      }
      this.markers = []
      for (let ll of this.latlngs) {
        let marker = new google.maps.Marker({
          position: {lat: ll[0], lng: ll[1]},
          map: this.map
        })
        this.markers.push(marker)
      }
    }
  },
  mounted () {
    const element = document.getElementById('map')
    const options = {
      zoom: 11,
      center: new google.maps.LatLng(53.8, -1.55)
    }
    this.map = new google.maps.Map(element, options)
  }
}
</script>

<style lang="scss">
textarea#entry {
  height: calc(100vh - 9em);
  width: 100%;
}
</style>
