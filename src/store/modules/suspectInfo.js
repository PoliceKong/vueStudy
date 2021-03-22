// import { request } from '@/network/request'
const suspectInfo = {
	state: {
		suspectNumber: '',
		judgmentNumber: '',
	},
	actions: {},
	mutations: {
		updateSuspectNumber(state, suspect) {
			state.suspectNumber = suspect.data.suspectNumber
		},
		//更新裁决结果编号
		updateJudgmentNumber(state, judgment) {
			state.judgmentNumber = judgment.data.judgmentResultNum
			console.log('裁决编号是', state.judgmentNumber)
		},
	},
}
export default suspectInfo
