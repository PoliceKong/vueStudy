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
	}),
	actions: {
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
	},
	mutations: {
		updatePoisonData(state, poisonData) {
			state.inquiryAllPoisonData.inquiryPoisonResult = poisonData //请求返回的是一个数据组
		},
	},
}
export default poisonsInfo
