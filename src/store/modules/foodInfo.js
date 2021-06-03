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
		//根据案件编号查询所有的食品信息
		byCaseNumInquiryFoods: {
			byCaseNumInquiryFoodsResult: [
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
		//查询所有的食品信息
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
		// 根据案件编号查询食品信息
		inquiryFoodByCaseNum(context, caseNum) {
			request({ method: 'POST', url: 'queryFoodByCaseNum.do', data: caseNum })
				.then(res => {
					if (res.status === 200) {
						console.log('根据案件编号查询食品数据成功', res.data)
						context.commit('updateFoodDataByCaseNum', res.data)
					}
				})
				.catch(err => {
					return err
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
		// 更新所有涉案食品的数据
		updateFoodList(state, foodsListInfo) {
			state.inquiryAllFoods.foodResultArray = foodsListInfo //这是一个数组的形式
		},
		//更新根据案例编号查询到的食品的数据
		updateFoodDataByCaseNum(state, foodsData) {
			state.byCaseNumInquiryFoods.byCaseNumInquiryFoodsResult = foodsData
		},
	},
}
export default foodsInfo
