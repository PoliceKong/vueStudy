import Vue from 'vue'
import VueRouter from 'vue-router'
import Case from '../views/case'
import RegisterCase from '../views/register_case'
import Person from '../views/person'
import checkcase from '../views/checkcase'

const routes = [
	// 默认路由页面
	{
		path: '',
		redirect: '/checkcase',
	},
	{
		path: '/checkcase',
		component: checkcase,
	},
	{
		path: '/case',
		component: Case,
		children: [
			{ path: '/register', component: RegisterCase },
			{
				path: '/person',
				component: Person,
			},
		],
	},
]
Vue.use(VueRouter)
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
