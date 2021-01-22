<template>
  <div id="subApp-container"></div>
</template>

<script>
  import {setDefaultMountApp, start} from "qiankun";

  export default {
    name: "index",
    mounted() {
      const appName = this.$route.params.appName
      setDefaultMountApp(`/${appName}`)
      start({ prefetch: true })
    }
  }
</script>

<style scoped>
#subApp-container {
  height: calc(100% - 61px);
  overflow: hidden;
}
</style>
