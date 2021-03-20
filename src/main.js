import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index'

Vue.config.productionTip = false
new Vue({
	el: '#app',
	store,
	router,

	render: h => h(App),
})
