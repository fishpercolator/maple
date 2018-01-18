<template>
  <section id="about">
    <div class="leftright">
      <div id="description" class="left">
        <div>
          <h2>Maple <small><strong>- Map</strong>ping <strong>Le</strong>eds</small></h2>
          <p>Maple is a tool for quickly generating maps representing data in Leeds.</p>
          <p>It can generate two types of maps - ward maps and postcode maps.</p>
          <p>Maple was commissioned by <a href="http://www.opforum.org.uk/">Leeds Older People's Forum</a> and developed by <a href="https://www.fishpercolator.co.uk/">Fish Percolator</a> using <a href="https://vuejs.org/">Vue.js</a>.</p>
          <h3>Ward maps</h3>
          <p>A <router-link to="/">ward map</router-link> allows you to visualise any numeric dataset with values for each ward in Leeds. Examples of such datasets include things like spending, vote shares, number of people...</p>
          <p>Simply choose a colour and fill your values in. The brightest intensity will be given to the ward with the largest value in your dataset, and then other wards will be given an intensity proportional to that value.</p>
          <img src="~assets/wardmaps.png" />
          <p>The map will update as you change the values, and it auto-saves so you can close the tab and come back to it whenever you like.</p>
          <p>When you're ready, you can click the 'save map as image' button to download the map. This uses a screenshot, so make sure the map is positioned as you'd like it before you press the button.</p>
          <h3>Postcode maps</h3>
          <p>This feature is coming soon...</p>
        </div>
      </div>
      <div id="header" class="right">
        <Nav />
      </div>
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
#about {
  #description {
    display: flex;
    flex-direction: column;
    padding: 1em;
    align-items: center;
    h2 {
      small {
        font-size: 0.5em;
        color: grey;
        strong {
          font-weight: normal;
          color: black;
        }
      }
    }
    img {
      border: 2px solid black;
      display: block;
      margin: 2em auto;
      max-width: 60vw;
    }
  }
  #header {
    overflow: visible;
    width: 25em;
  }
}
</style>
