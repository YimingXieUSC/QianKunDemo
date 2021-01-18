import Vue from "vue";
import App from "./App.vue";

import appList from "./config/appList";
import { registerMicroApps, start } from "qiankun";

import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css/normalize.css";

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

registerMicroApps(appList, {
  beforeLoad: app => {
    console.log('before load app.name====>>>>>', app.name)
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
    }
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
    }
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    }
  ]
})

start()
