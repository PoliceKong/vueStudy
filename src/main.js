import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(router);

new Vue({
  el: '#app',
  render: h => h(App)
});