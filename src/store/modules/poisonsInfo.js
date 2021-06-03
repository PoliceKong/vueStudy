import { request } from '@/network/request'
const poisonsInfo = {
	state: () => ({
		inquiryAllPoisonData: {
			inquiryPoisonResult: [
				{
					POISON_NUMBER: '',
					SCIENTIFIC_NAME_OF_POISON: '',
					POISON_ALIAS_01: '',
					POISON_ALIAS_02: '',
					TOXIC_CHEMICAL_COMPOSITION: '',
					ACTUAL_MEASUREMENT_OF_POISON: '',
				},
			],
		},
		byCaseNumInquiryPoisonData: {
			byCaseNumInquiryPoisonResult: [
				{
					POISON_NUMBER: '',
					SCIENTIFIC_NAME_OF_POISON: '',
					POISON_ALIAS_01: '',
					POISON_ALIAS_02: '',
					TOXIC_CHEMICAL_COMPOSITION: '',
					ACTUAL_MEASUREMENT_OF_POISON: '',
				},
			],
		},
		//鉴定机构的信息内容
		// 1.根据案例编号查询鉴定机构信息
		byCaseNumInquiryJdJgData: {
			byCaseNumInquiryJdJgDataResult: [
				{
					IDENTIFICATION_AGENCY_NUMBER: '', //鉴定机构编号
					NAME_OF_APPRAISAL_AGENCY: '', //鉴定机构名称
					TYPE_OF_CERTIFICATION_AGENCY: '', //鉴定机构类别
					ADMINISTRATIVE_DIVISIONS: '', //鉴定机构行政区划
					IDENTIFICATION_SCOPE: '', //鉴定范围
					APPRAISAL_QUALIFICATION: '', //鉴定资质
					APPRAISER_NAME: '', //鉴定人
				},
			],
		},
	}),
	actions: {
		//查询所有的毒害物信息
		inquiryPoisonData(context) {
			request({
				method: 'POST',
				url: 'queryAllPoisonsdata.do',
			})
				.then(response => {
					if (response.status === 200) {
						console.log('毒害物数据查询成功', response.data)
						context.commit('updatePoisonData', response.data) //更新毒害物数组
					}
				})
				.catch(err => {
					console.log('毒害物数据查询失败')
					console.log(err)
				})
		},
		//根据案件编号查询毒害物信息
		inquiryPoisonDataByCaseNum(context, caseNum) {
			request({
				method: 'POST',
				url: 'queryPoisonByCaseNum.do',
				data: caseNum,
			})
				.then(response => {
					if (response.status === 200) {
						console.log('根据案件编号查询毒害物信息成功')
						context.commit('updatePoisonDataByCaseNum', response.data)
					}
				})
				.catch(err => {
					console.log('根据案件编号查询毒害物失败')
					console.log(err)
				})
		},
		// 根据案例编号查询鉴定机构
		inquiryJdJgDataByCaseNum(context, caseNum) {
			request({
				method: 'POST',
				url: 'queryJdjgByCaseNum.do',
				data: caseNum,
			})
				.then(response => {
					if (response.status === 200) {
						console.log('根据案例编号查需鉴定机构信息成功', response.data)
						context.commit('updateJdJgDataByCaseNum', response.data)
					}
				})
				.catch(err => {
					console.log('根据案例编号查询鉴定机构信息失败')
					console.log(err)
				})
		},
	},
	mutations: {
		// 更新查询到的全部毒害物信息
		updatePoisonData(state, poisonData) {
			state.inquiryAllPoisonData.inquiryPoisonResult = poisonData //请求返回的是一个数据组
		},
		// 更新根据案例编号查询到的所有毒害物信息
		updatePoisonDataByCaseNum(state, poisonData) {
			state.byCaseNumInquiryPoisonData.byCaseNumInquiryPoisonResult = poisonData
		},
		//更新根据案例编号查询到的鉴定机构信息
		updateJdJgDataByCaseNum(state, JdJgData) {
			state.byCaseNumInquiryJdJgData.byCaseNumInquiryJdJgDataResult = JdJgData
		},
	},
}
export default poisonsInfo
