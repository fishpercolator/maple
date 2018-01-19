import Vue from 'vue'
import html2canvas from 'html2canvas'

var downloadMixin = {
  methods: {
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
  }
}

Vue.mixin(downloadMixin)
