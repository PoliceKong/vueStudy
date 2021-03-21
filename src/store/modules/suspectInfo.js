// import { request } from '@/network/request'
const suspectInfo = {
	state: {
		suspectNumber: '',
	},
	actions: {},
	mutations: {
		updateSuspectNumber(state, suspect) {
			state.suspectNumber = suspect.suspectNumber
		},
	},
}
export default suspectInfo
