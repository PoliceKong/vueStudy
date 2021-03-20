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
				.then(request => {
					if (request.state === 201) {
						context.commit('refashCaseNum', request.data)
						return request.data
					}
				})
				.catch(err => {
					return err
				})
		},
		//根据案件编号查询案件信息
		selecCaseInfo(context) {
			'use strict'
			request({
				method: 'post',
				url: 'selcase.do',
				data: {
					CASE_NUMBER: context.state.caseNum,
				},
			})
				.then(request => {
					context.commit('refashAllCaseInfo', request.data[0])
					console.log(
						'查询案件信息成功，返回的数据是：',
						request.data[0]
					)
				})
				.catch(err => {
					console.log('案件信息查询失败', err)
				})
		},
	},
	//主要做数据的绑定和更新
	mutations: {
		refashCaseNum(state, caseInfo) {
			state.caseNum = caseInfo.caseNum
			state.caseName = caseInfo.caseName
			return caseInfo
		},
		refashAllCaseInfo(state, dataRes) {
			'use strict'
			state.caseRes = dataRes.CASE_SOURCE
			state.caseDate = dataRes.TIME_OF_CASE
			state.locationC = dataRes.LOCATION_OF_CASE
			state.moneyCount = dataRes.AMOUNT_INVOLVED //涉案金额
			state.personCount = dataRes.NUMBER_OF_OFFENDERS //涉案人数
			state.caseInfo = dataRes.BRIEF_INTRODUCTION
			return dataRes
		},
	},
}
export default caseInfo
