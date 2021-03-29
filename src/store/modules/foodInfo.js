const foodsInfo = {
	state: () => ({
		foodNumber: '', //食品编号
		positionNumber: '', //毒害物编号
		accreditationBodiesNumber: '', //鉴定机构编号
	}),
	actions: {},
	mutations: {
		updateFoodNumber(state, foodNumber) {
			console.log(foodNumber)
			state.foodNumber = foodNumber.data.foodNumber
		},
		updatePositionNumber(state, positionNumber) {
			state.positionNumber = positionNumber
		},
	},
}
export default foodsInfo
