function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

export default [
  {
    name: 'vue-app1',
    entry: '//192.168.11.191:8081',
    // entry: '//localhost:8081',
    container: '#subApp-container',
    activeRule: genActiveRule('/vue-app1'),
    childNode: [
      {
        name: 'nami-vue',
        entry: '//192.168.11.191:7899',
        container: '#subApp-container',
        activeRule: genActiveRule('/nami-vue')
      }
    ]
  },
  {
    name: 'nami-vue',
    entry: '//192.168.11.191:7899',
    container: '#subApp-container',
    activeRule: genActiveRule('/nami-vue')
  },
  {
    name: 'vue-app2',
    entry: '//192.168.11.191:8082',
    container: '#subApp-container',
    activeRule: genActiveRule('/vue-app2')
  }                       ,
  {
    name: 'vue-admin1',
    entry: '//192.168.11.191:8888',
    container: '#subApp-container',
    activeRule: genActiveRule('/vue-admin1')
  },
  {
    name: 'vue-admin2',
    entry: '//192.168.11.191:8084',
    container: '#subApp-container',
    activeRule: genActiveRule('/vue-admin2')
  },
    {
        name: 'vue-admin-frontend',
        entry: '//192.168.11.191:9526',
        container: '#subApp-container',
        activeRule: genActiveRule('/vue-admin-frontend')
    },
  {
    name: 'antd-admin',
    entry:'//192.168.11.191:7051',
    container: '#subApp-container',
    activeRule: genActiveRule('/antd-admin')
  }
]
