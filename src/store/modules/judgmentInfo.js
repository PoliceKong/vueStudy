// import { request } from '@/network/request'
const judgmentInfo = {
	state: () => ({
		judgmentNumber: '', //判决书文号
		caseNum: '', //案件编号
		courtNumber: '', //法院编号
		policeNum: '', //侦查机关编号
		procuratorateNumber: '', //公诉机关编号
	}),
	actions: {
		// registerJudgment(context, judgmentData) {
		// 	request({
		// 		method: 'post',
		// 		url: 'judgment.do',
		// 		data: judgmentData,
		// 	})
		// 		.then(response => {
		// 			if (response.status === 201) {
		// 				console.log('判决书信息注册成功')
		// 				this.commit('updateJudgmentNumber', response)
		// 			}
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// },
		// registerPoliceStation(context, policeStationData) {
		// 	request({
		// 		method: 'post',
		// 		url: 'police.do',
		// 		data: policeStationData,
		// 	})
		// 		.then(response => {
		// 			if (response.status === 201) {
		// 				console.log('侦查机关注册成功')
		// 				context.commit('updatePoliceStationNum', response)
		// 			}
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// },
		// registerCourt(context, courtData) {
		// 	request({
		// 		method: 'post',
		// 		url: 'court.do',
		// 		data: courtData,
		// 	})
		// 		.then(response => {
		// 			if (response.status === 201) {
		// 				console.log('审理机关注册成功')
		// 				context.commit('updateCourtNum', response)
		// 			}
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// },
		// registerPublication(context, publiceData) {
		// 	request({
		// 		method: 'post',
		// 		url: 'procuratorate.do',
		// 		data: publiceData,
		// 	})
		// 		.then(response => {
		// 			if (response.status === 201) {
		// 				console.log('公诉机关注册成功')
		// 				context.commit('updatePuliceNum', response)
		// 			}
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// },
	},
	mutations: {
		updateJudgment(state, judgment) {
			state.judgmentNumber = judgment.data.judgmentNum
			console.log(state.judgmentNumber)
			state.caseNum = judgment.data.caseNum
		},
		updatePoliceStationNum(state, policeStation) {
			state.policeNum = policeStation.data.policeNum
		},
		updateCourtNum(state, courtData) {
			state.courtNumber = courtData.data.courtNumber
		},
		updatePuliceNum(state, publicData) {
			state.procuratorateNumber = publicData.data.procuratorateNumber
		},
	},
}
export default judgmentInfo
