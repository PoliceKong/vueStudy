import { request } from '@/network/request'
const foodsInfo = {
	state: () => ({
		foodNumber: '', //食品编号
		positionNumber: '', //毒害物编号
		accreditationBodiesNumber: '', //鉴定机构编号
		inquiryAllFoods: {
			foodResultArray: [
				{
					FOOD_NUMBER: '', //食品编号
					FOOD_NAME: '', //食品名称
					FOOD_TYPE: '', //食品类型
					FOOD_INGREDIENTS: '', //食品成分
					FOOD_QUANTITY: '', //食品数量
				},
			],
		},
	}),
	actions: {
		inquiryAllFoodsInfo(context) {
			request({
				method: 'POST',
				url: 'queryAllFoodInfo.do',
			}).then(res => {
				if (res.status === 200) {
					console.log('所有食品信息查询成功', res.data)
					context.commit('updateFoodList', res.data)
				}
			})
		},
	},
	mutations: {
		updateFoodNumber(state, foodNumber) {
			console.log(foodNumber)
			state.foodNumber = foodNumber.data.foodNumber
		},
		updatePositionNumber(state, positionNumber) {
			state.positionNumber = positionNumber
		},
		updateFoodList(state, foodsListInfo) {
			state.inquiryAllFoods.foodResultArray = foodsListInfo //这是一个数组的形式
		},
	},
}
export default foodsInfo
