import { request } from '@/network/request'

const caseInfo = {
	state: () => ({
		caseName: '', //案件名称
		caseNum: '', //案件编号
		caseRes: '', //案件来源
		caseDate: '', //发案时间
		locationC: '', //发案地点
		moneyCount: '', //涉案金额
		personCount: '', //涉案人数
		caseInfo: '', //简要案情
		caseBaseInfoByCaseNum: {}, //案例基础数据
	}),
	actions: {
		//注册案件
		addCase(context, data) {
			'use strict'
			request({ method: 'post', url: 'caseRg.do', data })
				.then(response => {
					if (response.status === 201) {
						alert('案件注册成功')
					}
				})
				.catch(err => {
					return err
				})
		},
		//根据案例编号更新案例基础数据
		updateBaseCaseInfoByCaseNum(context, caseData) {
			'use strict'
			request({
				method: 'post',
				url: 'updateBaseCaseInfo.do',
				data: caseData,
			})
				.then(response => {
					if (response.status === 201) {
						console.log('案例基础数据更新成功')
					}
				})
				.catch(err => {
					return err
				})
		},
		//根据案件编号查询案件信息
		inquireCaseInfo(context) {
			'use strict'
			request({
				method: 'post',
				url: 'selcase.do',
				data: {
					CASE_NUMBER: context.state.caseNum,
				},
			})
				.then(response => {
					context.commit('updateCaseBaseInfo', response.data[0])
				})
				.catch(err => {
					console.log('store中案件信息查询失败', err)
				})
		},
	},
	//主要做数据的绑定和更新
	mutations: {
		//更新案件编号和案件名称
		updateCaseNumber(state, caseInfo) {
			state.caseNum = caseInfo.caseNum
			state.caseName = caseInfo.caseName
		},

		updateCaseBaseInfo(state, caseBaseInfo) {
			state.caseBaseInfoByCaseNum = caseBaseInfo
		},
	},
}
export default caseInfo
