import Vue from "vue";
import App from "./App.vue";

import appList from "./config/appList";
import appRole from "./config/appRole";
import { registerMicroApps, start } from "qiankun";

import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css/normalize.css";

import Keycloak from 'keycloak-js'
import _ from 'lodash'

Vue.config.productionTip = false;
Vue.use(ElementUI);

var finalAppList = [];
              var userName = '';

const initOptions = {
  url: 'http://192.168.11.191:8180/auth',
  realm: 'demo',
  clientId: 'qiankun-microfrontend',
  onLoad: 'login-required'
};

const keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then(async authenticated => {
  if (!authenticated) {
    window.location.reload();
    return
  } else {
    Vue.prototype.$keycloak = keycloak;
    console.log('Authenticated', keycloak)

  }

  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed')
      } else {
        console.log('Token not refreshed, valid for ' +
            Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
      }
    }).catch(error => {
      console.log('Failed to refresh token', error)
    })
  }, 60000);
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  });

  var appSet = new Set();
  _.forEach(keycloak.realmAccess.roles, i => {
    _.forEach(appRole, j => {
      if(j.role === i) {
        appSet = new Set([...appSet, ...j.accessApp])
      }
    });
  });
  var appListTmp = Array.from(appSet);
  _.forEach(appListTmp, k => {
    let tmpEle = _.filter(appList, m => {
      return m.name === k
    });
    finalAppList.push(tmpEle[0])
  });
  console.log('####$^', finalAppList);
  userName = keycloak.idTokenParsed.preferred_username;
  console.log('qqqqqqqqqq', userName);

  registerMicroApps(finalAppList, {
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
  });

  start()
}).catch(error => {
  console.log('Authenticated Failed', error)
});

export default finalAppList;

// import Vue from "vue";
// import App from "./App.vue";
//
// import appList from "./config/appList";
// import { registerMicroApps, start } from "qiankun";
//
// import router from "./router";
// import store from "./store";
//
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// import "normalize.css/normalize.css";
//
// Vue.config.productionTip = false
// Vue.use(ElementUI)
//
// new Vue({
//   render: h => h(App),
//   router,
//   store,
// }).$mount('#app')
//
// registerMicroApps(appList, {
//   beforeLoad: app => {
//     console.log('before load app.name====>>>>>', app.name)
//   },
//   beforeMount: [
//     app => {
//       console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
//     }
//   ],
//   afterMount: [
//     app => {
//       console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
//     }
//   ],
//   afterUnmount: [
//     app => {
//       console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
//     }
//   ]
// })
//
// start()
