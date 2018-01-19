<template>
  <div id="postcodemap" class="leftright">
    <div id="map" class="left">
    </div>
    <div id="controls" class="right">
      <Nav />
      <div id="sliders">
        <div class="slider">
          <label for="radius">Radius</label>
          <input v-model="radius" id="radius" type="range" min="1" max="100" />
        </div>
        <div class="slider">
          <label for="maxIntensity">Max intensity</label>
          <input v-model="maxIntensity" id="maxIntensity" type="range" min="0" max="100" />
        </div>
      </div>
      <textarea v-model="postcodes" id="entry" placeholder="Leeds postcodes, one per line or separated by commas..."/>
      <div id="buttons">
        <button disabled v-if="downloading" class="button">Downloading...</button>
        <button v-on:click="saveImage" v-else class="button button-primary">Save map as image</button>
        <button v-on:click="reset" class="button">Reset</button>
      </div>
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
      postcodes: this.$ls.get('postcodes', ''),
      map: null,
      heatmap: null,
      radius: this.$ls.get('radius', 30),
      maxIntensity: this.$ls.get('maxIntensity', 0)
    }
  },
  computed: {
    latlngs () {
      let postcodes = this.postcodes.split(/[\n,]\s*/)
      return postcodes.map(p => p2ll[p.replace(/ /, '')]).filter(ll => ll != undefined).map(ll => new google.maps.LatLng(...ll))
    }
  },
  watch: {
    postcodes (ps)    { this.redraw(); this.$ls.set('postcodes', ps) },
    radius (r)        { this.redraw(); this.$ls.set('radius', r) },
    maxIntensity (mi) { this.redraw(); this.$ls.set('maxIntensity', mi) }
  },
  methods: {
    redraw () {
      let oldmap = this.heatmap
      // create a fresh one
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.latlngs,
        radius: this.radius,
        maxIntensity: this.maxIntensity,
        dissipating: true
      })
      this.heatmap.setMap(this.map)
      // remove the old one from the map
      if (oldmap) oldmap.setMap(null)
    },
    reset: function () {
      this.postcodes = ""
      this.radius = 30
      this.maxIntensity = 0
    }
  },
  mounted () {
    const element = document.getElementById('map')
    const options = {
      zoom: 11,
      center: new google.maps.LatLng(53.8, -1.55)
    }
    this.map = new google.maps.Map(element, options)
    this.redraw()
  }
}
</script>

<style lang="scss">
#postcodemap {
  #sliders {
    display: flex;
    justify-content: space-around;
    .slider {
      width: 50%;
      padding: 0.5em;
      input {
        width: 10em;
      }
    }
  }
  textarea#entry {
    margin: 0 0 1em 0;
    height: calc(100vh - 19em);
    width: 100%;
  }
  #buttons {
    display: flex;
    justify-content: space-around;
  }
}
</style>
