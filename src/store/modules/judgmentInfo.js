import { request } from '@/network/request'

const judgmentInfo = {
	state: () => ({
		judgmentNumber: '', //判决书文号
		caseNum: '', //案件编号
		courtNumber: '', //法院编号
		policeNum: '', //侦查机关编号
		procuratorateNumber: '', //公诉机关编号
		//所有判决书结果
		allJudgmentInfo: {
			allJudgmentData: [],
		},
		//根据案例编号获取的判决书基础信息
		judgmentBaseInfoByCaseNum: {
			judgmentBaseDataByCaseNum: [
				{
					JUDGMENT_NUMBER: '', //判决书文号
					DOCUMENT_NAME: '', //判决书名称
					TRIAL_PROCEDURE: '', //审理程序
					PUBLIC_PROSECUTION_DATE: '', //公诉日期
					JUDGMENT_DATE: '', //判决日期
				},
			],
		},
		//根据案例编号获取的侦查机关基础信息
		policeStationInfoByCaseNum: {
			policeStationDataByCaseNum: [
				{
					INVESTIGATION_AGENCY_NUMBER: '', //侦查机关编号
					NAME_OF_INVESTIGATION_AGENCY: '', //侦查机关名称
					INVESTIGATIVE_AGENCY_LEVEL: '', //侦查机关级别
				},
			],
		},
		//根据案例编号查询到的公诉机关信息
		publicProsecutionAgencyInfoByCaseNum: {
			publicProsecutionAgencyDataByCaseNum: [
				{
					PROCURATORATE_NUMBER: '', //检察院编号
					NAME_OF_PROCURATORATE: '', //检察院名称
					PROCURATORATE_LEVEL: '', //检察院级别
				},
			],
		},
		//根据案例编号查询审判机关信息
		courtInfoByCaseNum: {
			courtDataByCaseNum: [
				{
					COURT_NUMBER: '', //法院编号
					COURT_NAME: '', //法院名称
					COURT_LEVEL: '', //法院级别
				},
			],
		},
	}),
	actions: {
		//查询所有的判决书数据
		inquiryAllJudgments(context) {
			request({
				method: 'post',
				url: 'queryAllJudgmentInfo.do',
			})
				.then(response => {
					if (response.status === 200) {
						console.log('查询所有的案例数据成功', response.data)
						context.commit('updateAllJudgment', response.data)
					}
				})
				.catch(err => {
					return err
				})
		},
		//根据案例编号查询判决书基础数据
		inquiryJudgmentBaseDataByCaseNum(context, caseNum) {
			request({
				method: 'post',
				url: 'queryJudgmentInfoByCaseNum.do',
				data: caseNum,
			})
				.then(response => {
					if (response.status === 200) {
						console.log('根据案例数据查询判决书基础数据成功', response.data)
						context.commit('updateJudgmentBaseInfo', response.data)
					}
				})
				.catch(error => {
					return error
				})
		},
		//根据案例编号查询侦查机关信息
		inquiryPoliceStationInfoByCaseNum(context, caseNum) {
			request({
				method: 'post',
				url: 'queryPoliceInfoByCaseNum.do',
				data: caseNum,
			})
				.then(response => {
					if (response.status === 200) {
						console.log('根据案例编号查询侦查机关信息成功', response.data)
						context.commit('updatePoliceStationData', response.data)
					}
				})
				.catch(error => {
					return error
				})
		},
		//根据案例编号查询公诉机关信息
		inquiryPubliceTrialStationByCaseNum(context, caseNum) {
			request({
				method: 'post',
				url: 'queryProcuratorateInfoByCaseNum.do',
				data: caseNum,
			})
				.then(response => {
					if (response.status === 200) {
						console.log('根据案例编号查询公诉机关信息成功')
						context.commit('updatePubliceTrialStationData', response.data)
					}
				})
				.catch(error => {
					return error
				})
		},
		//根据案例编号查询审判机关信息
		inquiryCourtInfoByCaseNum(context, caseNum) {
			request({
				method: 'post',
				url: 'queryCourtInfoByCaseNum.do',
				data: caseNum,
			})
				.then(response => {
					if (response.status === 200) {
						console.log('根据案例编号查询审判机关信息成功', response.data)
						context.commit('updateCourtData', response.data)
					}
				})
				.catch(error => {
					return error
				})
		},
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
		updatePubliceNum(state, publicData) {
			state.procuratorateNumber = publicData.data.procuratorateNumber
		},
		// 更新判决书基础数据
		updateJudgmentBaseInfo(state, judgmentBaseData) {
			state.judgmentBaseInfoByCaseNum.judgmentBaseDataByCaseNum = judgmentBaseData
		},
		//更新根据案例编号查询到的侦查机关数据
		updatePoliceStationData(state, policeData) {
			state.policeStationInfoByCaseNum.policeStationDataByCaseNum = policeData
		},
		//更新根据案例编号查询到的公诉机关信息
		updatePubliceTrialStationData(state, PubliceTrialStationData) {
			state.publicProsecutionAgencyInfoByCaseNum.publicProsecutionAgencyDataByCaseNum = PubliceTrialStationData
		},
		//更新根据案例编号查询到的审判机关信息
		updateCourtData(state, courtData) {
			state.courtInfoByCaseNum.courtDataByCaseNum = courtData
		},
		//更新全部判决书数据
		updateAllJudgment(state, allJudgment) {
			state.allJudgmentInfo.allJudgmentData = allJudgment
		},
	},
}
export default judgmentInfo
