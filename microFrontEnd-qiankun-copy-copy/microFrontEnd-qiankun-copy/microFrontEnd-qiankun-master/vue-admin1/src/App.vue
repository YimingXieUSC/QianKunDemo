<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
  #app {
    height: calc(100vh - 61px);
    overflow: hidden;
  }
</style>
