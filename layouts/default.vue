<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
@import "skeleton-css/css/normalize";
@import "skeleton-css/css/skeleton";

section, div {
  box-sizing: border-box;
}

section {
  min-height: 100vh;
}

div.leftright {
  display: flex;
  width: 100%;
}

div.left {
  flex-grow: 1;
  height: 100vh;
}

div.right {
  height: 100vh;
  padding: 1em;
  overflow-y: auto;
  width: 25em;
}

@media (max-width: 48em) {
  div.leftright {
    flex-wrap: wrap;
  }
  div.left {
    width: 100vw;
  }
  div.right {
    width: 100vw;
    height: auto;
  }
}
</style>
