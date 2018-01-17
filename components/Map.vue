<template>
  <div id="outer">
    <div id="map">
    </div>
    <div id="controls">
      <label>Colour</label><input v-model="color">
      <div v-for="(_, name) in wardvals" :key="name">
        <label>{{name}}</label>
        <input v-model="wardvals[name]">
      </div>
    </div>
  </div>
</template>

<script>
import wards from '~/static/wards.json'
import tinycolor from 'tinycolor2'

export default {
  data () {
    return {
      map: null,
      color: 'green',
      wardvals: wards.features.reduce((o, feature) => Object.assign(o, {[feature.properties.wd16nm]: "0"}), {})
    }
  },
  watch: {
    wardvals: {
      handler: function () { this.recolor() },
      deep: true
    },
    color: function () { this.recolor() }
  },
  methods: {
    recolor: function () {
      var max = Math.max(...Object.values(this.wardvals))
      if (max == 0) max = 1

      this.map.data.setStyle(feature => {
        var wardName = feature.getProperty('wd16nm')
        var val = this.wardvals[wardName]
        var color = tinycolor.mix(this.color, 'white', ((1 - (val / max)) * 100))
        return {
          fillColor: color,
          strokeWeight: 0,
          fillOpacity: 0.7,
        }
      })
    }
  },
  mounted () {
    const element = document.getElementById('map')
    const options = {
      zoom: 11,
      center: new google.maps.LatLng(53.8, -1.55)
    }
    this.map = new google.maps.Map(element, options)
    this.map.data.loadGeoJson('wards.json')
    this.recolor(this.wardvals)
  }
}
</script>

<style lang="scss">
#outer {
  // FIXME: Should be two components
  display: flex;
}
#map {
  width: 60vw;
  height: 100vh;
}
#controls {
  width: 40vw;
  padding: 1em;
  label {
    display: inline-block;
    width: 15em;
    text-align: right;
    margin-right: 1em;
  }
}
</style>
