<template>
  <div id="app">
    <el-menu :default-active="currentApp" :router="true" mode="horizontal" @select="handleSelectMenu">
      <!--基座中可以放自己的路由-->
      <el-menu-item index="/home">Home</el-menu-item>

      <!--引用其他子应用-->
      <el-menu-item index="/vue-app1">vue应用1</el-menu-item>
      <el-menu-item index="/vue-app2">vue应用2</el-menu-item>
      <el-menu-item index="/vue-admin1">vue-element-admin</el-menu-item>
      <el-menu-item index="/vue-admin2">iview-admin</el-menu-item>
    </el-menu>

    <router-view></router-view>

    <!-- 下面的容器用于挂载子应用 不能删除 -->
    <div id="subApp-container"></div>
  </div>
</template>

<script>

  import {getCurrentApp, saveCurrentApp} from "./libs/storage";

export default {
  name: 'app',
  data () {
    return {
      currentApp: ''
    }
  },
  methods: {
    handleSelectMenu(index) {
      saveCurrentApp(index)
    }
  },
  mounted() {
    this.currentApp = getCurrentApp() ? getCurrentApp() : '/'
  }
}
</script>

<style>
  html,body {
    width: 100%;
    height: 100%;
  }
  #app {
    height: 100%;
    width: 100%;
  }
  #subApp-container {
    height: calc(100% - 61px);
    overflow: hidden;
  }
</style>
