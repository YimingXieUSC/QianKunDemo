import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false

let instance = null;
function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    router,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}
// 解决子项目不能独立访问的问题 根据访问来源，执行不同渲染方法
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
// 解决基础路径不正确的问题
if (window.__POWERED_BY_QIANKUN__) {
  // 动态添加publicPath
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
// 启动
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
// 挂载
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
// 卸载
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
