<template>
  <div id="app">
      <el-menu :default-active="currentApp"
               :router="true"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#96D9B9"
               @select="handleSelectMenu">
  <!--        <div style="padding-top: 10px;"><el-avatar :size="40" :src="circleUrl"></el-avatar></div>-->
      <el-menu-item index="/home">Home</el-menu-item>
      <!--基座中可以放自己的路由-->
      <el-menu-item :index="'/'+item.name" v-for="item in tmpList" :key="item.name">
        <span>{{ item.name}}</span>
      </el-menu-item>
      <el-submenu index="user">
        <template slot="title">User</template>
<!--        <el-menu-item index="user" v-bind="userName">-->
<!--          <span>Welcome, {{userName}}</span>-->
<!--        </el-menu-item>-->
        <el-menu-item index="logout" @click="logoutPage">Logout</el-menu-item>
      </el-submenu>
        <div style="padding-top: 10px; padding-left: 50px"><el-avatar :size="40" :src="circleUrl"></el-avatar></div>
    </el-menu>
    <router-view></router-view>

    <!-- 下面的容器用于挂载子应用 不能删除 -->
    <div id="subApp-container"></div>
  </div>
</template>

<script>

  import {getCurrentApp, saveCurrentApp} from "./libs/storage";
  import finalAppList from "./main.js";

export default {
  name: 'app',
  data () {
    return {
      currentApp: '/home',
      tmpList: finalAppList,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  },
  methods: {
    handleSelectMenu(index) {
      saveCurrentApp(index)
    },
    logoutPage() {
      this.$keycloak.logout();
      console.log('???', this.$keycloak);
    }
  },
  mounted() {
    this.currentApp = getCurrentApp() ? getCurrentApp() : '/';
    console.log('!!!!!!!!!', finalAppList);
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
