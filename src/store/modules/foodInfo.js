import { request } from '@/network/request'

const foodsInfo = {
	state: {
		foodNumber: '', //食品编号
		positionNumber: '', //毒害物编号
		accreditationBodiesNumber: '', //鉴定机构编号
	},
	actions: {
		//注册涉案食品
		store_registerFood(context, foodInfo) {
			request({
				method: 'post',
				url: 'casefood.do',
				data: foodInfo,
			})
				.then(response => {
					if (response.status === 201) {
						console.log('涉案食品注册成功')
						context.commit('updateFoodNumber', response)
					}
				})
				.catch(err => {
					console.log('涉案食品注册失败')
					console.log(err)
				})
		},
		//注册毒害物
		store_registerPosion(context, posionInfo) {
			request({
				method: 'post',
				url: 'poison.do',
				data: posionInfo,
			})
				.then(response => {
					if (response.status === 201) {
						console.log('毒害物注册成功')
						context.commit('updatePositionNumber', response.data.poisonNum)
					}
				})
				.catch(err => {
					console.log('注册毒害物失败')
					console.log(err)
				})
		},
	},
	mutations: {
		updateFoodNumber(state, foodNumber) {
			// console.log(foodNumber)
			state.foodNumber = foodNumber.data.foodNumber
		},
		updatePositionNumber(state, positionNumber) {
			state.positionNumber = positionNumber
		},
	},
}
export default foodsInfo
