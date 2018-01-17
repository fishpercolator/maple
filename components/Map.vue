<template>
  <div id="map-outer">
    <div id="map">
    </div>
    <div id="controls">
      <label>Colour</label><input v-model="color" type="color">
      <div v-for="(_, name) in wardvals" :key="name">
        <label>{{name}}</label>
        <input v-model="wardvals[name]">
      </div>
      <button disabled v-if="downloading">Downloading...</button>
      <button v-on:click="saveImage" v-else>Save map as image</button>
      <button v-on:click="resetVals">Reset</button>
    </div>
  </div>
</template>

<script>
import tinycolor from 'tinycolor2'
import html2canvas from 'html2canvas'
import wardnames from '~/assets/wardnames.json'

export default {
  data () {
    return {
      map: null,
      downloading: false,
      color: this.$ls.get('color', '#008000'),
      wardvals: this.$ls.get('wardvals', wardnames.reduce((o, ward) => Object.assign(o, {[ward]: "0"}), {}))
    }
  },
  watch: {
    wardvals: {
      handler: function (vals) {
        this.recolor()
        this.$ls.set('wardvals', vals)
      },
      deep: true
    },
    color: function (col) {
      this.recolor()
      this.$ls.set('color', col)
    }
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
          strokeColor: 'black',
          strokeOpacity: 0.3,
          strokeWeight: 1,
          fillOpacity: 0.6,
        }
      })
    },
    resetVals: function () {
      Object.keys(this.wardvals).forEach(key => this.wardvals[key] = 0)
    },
    saveImage: function () {
      this.downloading = true
      html2canvas(document.getElementById('map').querySelector('.gm-style > div:first-child'), {useCORS: true}).then(canvas => {
        var image = canvas.toDataURL('image/png')
        var link = document.createElement('a')
        link.download = 'map.png'
        link.href = image
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        this.downloading = false
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
    var infowindow = new google.maps.InfoWindow()
    this.map.data.addListener('click', function(event) {
      var name = event.feature.getProperty('wd16nm')
      infowindow.setContent(name)
      infowindow.setPosition({lat: event.feature.getProperty('lat'), lng: event.feature.getProperty('long')})
      infowindow.open(this.map)
    })
    this.recolor(this.wardvals)
  }
}
</script>

<style lang="scss">
#map-outer {
  display: flex;
  width: 100%;
  #map {
    flex-grow: 1;
    height: 100vh;
  }
  #controls {
    width: 22em;
    height: 100vh;
    padding: 1em;
    overflow-y: auto;
    label {
      display: inline-block;
      width: 15em;
      text-align: right;
      margin-right: 1em;
    }
    input {
      width: 3em;
    }
  }
}
</style>
