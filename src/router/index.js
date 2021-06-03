import Vue from 'vue'
import VueRouter from 'vue-router'
import InquiryCase from '../views/indexPage'
import indexCase from '../views/mainPage'
import modifyCase from '../components/modifyCase'
import suspects from '@/components/viewSuspects'
import addSuspect from '@/components/addSuspect'
import registeFood from '@/components/registeFood'
import judgments from '@/components/judgments'
import watchPoisons from '@/components/watchPoisons'
import foodListView from '@/components/foodListView'
import watchAppraisalAgency from '@/components/watchAppraisalAgency'
import watchJudgmentInfo from '@/components/watchJudgmentInfo'
import dataAnalysis from '@/components/dataAnalysis'
import watchAllSuspects from '@/components/watchAllSuspects'
import watchAllFood from '@/components/watchAllFood'
import watchAllPoisons from '@/components/watchAllPoisons'
import watchJudgment from '@/components/watchJudgment'

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
				children: [
					{ path: '/watchPoison', component: watchPoisons },
					{
						path: '/foodListView',
						component: foodListView,
					},
					{
						path: '/watchAppraisalAgency',
						component: watchAppraisalAgency,
					},
				],
			},
			{
				path: '/judgments',
				component: judgments,
				children: [
					{
						path: '/watchJudgmentInfo',
						component: watchJudgmentInfo,
					},
				],
			},
			{
				path: '/dataAnalysis',
				component: dataAnalysis,
				children: [
					{
						path: '/watchAllSuspects',
						component: watchAllSuspects,
					},
					{
						path: '/watchAllFood',
						component: watchAllFood,
					},
					{
						path: '/watchAllPoisons',
						component: watchAllPoisons,
					},
					{
						path: '/watchJudgment',
						component: watchJudgment,
					},
				],
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
