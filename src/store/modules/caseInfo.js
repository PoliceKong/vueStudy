import { request } from '@/network/request'

const caseInfo = {
	state: {
		caseName: '',
		caseNum: '',
		caseRes: '',
		caseDate: '',
		locationC: '',
		moneyCount: '',
		personCount: '',
		caseInfo: '',
	},
	//在action中主要做网络请求及异步操作
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
					context.commit('updateCaseNumberAllCaseInfo', response.data[0])
					// console.log('store中查询案件信息成功，返回的数据是：', response.data[0])
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
		//根据案件编号查询案件详细信息，然后更新到store
		updateCaseNumberAllCaseInfo(state, dataRes) {
			'use strict'
			// console.log('现在调用updateCaseNumberAllCaseInfo')
			// console.log(dataRes)
			state.caseRes = dataRes.CASE_SOURCE
			state.caseDate = dataRes.TIME_OF_CASE
			state.locationC = dataRes.LOCATION_OF_CASE
			state.moneyCount = dataRes.AMOUNT_INVOLVED //涉案金额
			state.personCount = dataRes.NUMBER_OF_OFFENDERS //涉案人数
			state.caseInfo = dataRes.BRIEF_INTRODUCTION
			// console.log('形参state', state)
			// console.log('this中的state', this.state)
		},
	},
}
export default caseInfo
