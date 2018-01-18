<template>
  <div id="nav-area">
    <h2>Maple</h2>
    <nav>
      <router-link to="/">Wards</router-link>
      <router-link to="/postcodes">Postcodes</router-link>
      <router-link to="/about">What's this?</router-link>
    </nav>
  </div>
</template>

<style lang="scss">
#nav-area {
  text-align: center;
  h2 {
    margin-bottom: 0;
  }
  nav {
    margin-bottom: 1em;
    a {
      &:not(:last-child):after {
        margin: 0 0.2em;
        content: '|';
        color: black;
      }
      &.nuxt-link-exact-active {
        color: black;
        text-decoration: none;
      }
    }
  }
}
</style>
