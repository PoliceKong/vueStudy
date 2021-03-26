import Vue from 'vue'
import VueRouter from 'vue-router'
import InquiryCase from '../views/inquiryCase'
import indexCase from '../views/indexCase'
import modifyCase from '../components/modifyCase'
import suspects from '@/components/suspects'
import addSuspect from '@/components/addSuspect'
import registeFood from '@/components/registeFood'
import judgments from '@/components/judgments'

const routes = [
	// 默认路由页面
	{
		path: '',
		redirect: '/inquiryCase',
	},
	{
		path: '/inquiryCase',
		component: InquiryCase,
	},
	{
		path: '/indexCase',
		component: indexCase,
		children: [
			{
				path: '',
				component: modifyCase,
			},
			{
				path: '/suspects',
				component: suspects,
			},
			{
				path: '/addSuspect',
				component: addSuspect,
			},
			{
				path: '/registeFood',
				component: registeFood,
			},
			{
				path: '/judgments',
				component: judgments,
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
