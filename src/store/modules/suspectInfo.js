import { request } from '@/network/request'

const suspectInfo = {
	state: () => ({
		suspectNumber: '',
		judgmentNumber: '',
		//犯罪嫌疑人数据临时暂存对象，仅临时存储当前犯罪嫌疑人的基础数据
		oneSuspectInfo: {
			suspectNum: '', //嫌疑人编号
			identityCategory: '', //身份类别
			suspectName: '', //嫌疑人姓名
			sex: '', //行别
			nation: '', //民族
			degreeOf: '', //学历
			birthday: '', //生日
			nativePlace: '', //籍贯
			permanentAddress: '', //户籍地址
			currentAddress: '', //现住址
			work: '', //工作单位
			occupation: '', //职业
			crimeDay: '', //犯罪时间
			criminalRecord: '', //前科状况
			criminalAct: '', //犯罪行为
			judgmentResultNumber: '', //裁决结果编号
			typeOfPenalty: [], //刑罚种类
			accusation: [], //触犯的罪名
			penaltyPeriod: '', //刑罚期限
			isProbation: '', //是否缓刑
			fineAmount: '', //罚金数额
			isIllegalIncome: '', //是都追缴违法所得
			lightPlot: '', //从轻情节
		},
		suspectInfoByCaseNum: {
			suspectDataByCaseNum: [],
		},
		allSuspect: { allSuspectInfo: [] }, //数据库中存储的所有犯罪嫌疑人的数据
	}),
	actions: {
		//查询数据库中存储的所有犯罪嫌疑人的数据
		inquiryAllSuspect(context) {
			request({
				method: 'POST',
				url: 'queryAllsuspect.do',
			})
				.then(response => {
					if (response.status === 200) {
						console.log('全部犯罪嫌疑人数据查询成功')
						context.commit('updateAllSuspectData', response.data)
					}
				})
				.catch(error => {
					return error
				})
		},
		//根据案例编号查询嫌疑人信息
		inquirySuspectDataByCaseNum(context, caseNum) {
			request({
				method: 'post',
				url: 'querySuspectDataByCaseNum.do',
				data: caseNum,
			})
				.then(response => {
					if (response.status === 200) {
						console.log('根据案例编号查询嫌疑人数据成功')
						context.commit('updateSuspectDataByCaseNum', response.data)
					}
				})
				.catch(error => {
					console.log('根据案例编号查询嫌疑人数据失败')
					return error
				})
		},
		//根据嫌疑人编号查询裁决结果
		inquiryJudgMentResultBySuspectId(context, index) {
			request({
				method: 'post',
				url: 'queryJudgmentResultBySuspectNum.do',
				data: { SUSPECT_NUMBER: context.state.suspectInfoByCaseNum.suspectDataByCaseNum[index].SUSPECT_NUMBER },
			})
				.then(response => {
					if (response.status === 200) {
						context.commit('updateJudgmentResult', response.data[0])
						console.log('根据嫌疑人编号查询裁决结果成功', response.data[0])
					}
				})
				.catch(error => {
					return error
				})
		},
		//根据犯罪嫌疑人编号查询涉嫌的罪名数据
		inquiryChargeBySuspectNum(context, index) {
			request({
				method: 'post',
				url: 'queryChargeResultBySuspectNum.do',
				data: { SUSPECT_NUMBER: context.state.suspectInfoByCaseNum.suspectDataByCaseNum[index].SUSPECT_NUMBER },
			})
				.then(response => {
					if (response.status === 200) {
						context.commit('updateChargeResultBySuspectNum', response.data)
					}
				})
				.catch(error => {
					return error
				})
		},
		//根据嫌疑人编号更新嫌疑人基础数据
		updateSuspectBaseInfoByNum(context, suspectInfo) {
			request({
				method: 'post',
				url: 'updateSuspectBaseIndo.do',
				data: suspectInfo,
			})
				.then(response => {
					if (response.status === 201) {
						console.log('嫌疑人数据更新成功')
					}
				})
				.catch(error => {
					return error
				})
		},
		//根据裁决结果编号更新裁决结果信息
		updateJudgmentResult(context, judgmentResult) {
			request({
				method: 'post',
				url: 'updateJudgmentResultByNum.do',
				data: judgmentResult,
			})
				.then(response => {
					if (response.status === 201) {
						console.log('根据裁决结果编号更新裁决结果数据成功')
					}
				})
				.catch(error => {
					return error
				})
		},
		//根据罪名编号更新罪名数据
		updateChargeData(context, chargeData) {
			if (chargeData.length > 0) {
				console.log('当前的罪名是', chargeData)
				for (let index in chargeData) {
					request({
						method: 'post',
						url: 'updateChargeInfoByNum.do',
						data: { COUNT_NUMBER: chargeData[index].COUNT_NUMBER, CHARGE: chargeData[index].CHARGE },
					})
				}
			}
		},
	},
	mutations: {
		//更新犯罪嫌疑人编号
		updateSuspectNumber(state, suspect) {
			state.suspectNumber = suspect.data.suspectNumber
		},
		//更新裁决结果编号
		updateJudgmentNumber(state, judgment) {
			console.log('裁决编号是judgment', judgment)
			state.judgmentNumber = judgment.data.judgmentResultNum
		},
		//更新查询到的单个犯罪嫌疑人的数据
		updateSuspectInfoBySuspectNum(state, index) {
			state.oneSuspectInfo.suspectNum = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].SUSPECT_NUMBER //更新嫌疑人编号
			state.oneSuspectInfo.identityCategory = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].SUBJECT_CATEGORY //人员类别
			state.oneSuspectInfo.suspectName = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].NAME_OF_SUSPECT //姓名
			state.oneSuspectInfo.sex = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].SUSPECT_GENDER //性别
			state.oneSuspectInfo.nation = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].NATION //民族
			state.oneSuspectInfo.degreeOf = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].EDUCATION //文化程度
			state.oneSuspectInfo.birthday = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].DATE_OF_BIRTH //出生日期
			state.oneSuspectInfo.nativePlace = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].HOMETOWN //籍贯
			state.oneSuspectInfo.permanentAddress = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].RESIDENCE_ADDRESS //户籍地址
			state.oneSuspectInfo.currentAddress = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].CURRENT_ADDRESS //现住址
			state.oneSuspectInfo.work = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].EMPLOYER //工作单位
			state.oneSuspectInfo.occupation = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].OCCUPATION //职业
			state.oneSuspectInfo.crimeDay = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].CRIME_TIME //犯罪时间
			state.oneSuspectInfo.criminalRecord = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].CRIMINAL_HISTORY //前科
			state.oneSuspectInfo.criminalAct = state.suspectInfoByCaseNum.suspectDataByCaseNum[index].CRIMINAL_BEHAVIOR //犯罪行为
			console.log('查询到的犯罪嫌疑人名称是', state.oneSuspectInfo.suspectName)
		},
		//更新根据案例编号查询到的嫌疑人数据
		updateSuspectDataByCaseNum(state, suspectData) {
			state.suspectInfoByCaseNum.suspectDataByCaseNum = suspectData
		},
		//更新根据犯罪嫌疑人编号裁决结果数据
		updateJudgmentResult(state, judgmentResult) {
			state.oneSuspectInfo.typeOfPenalty = judgmentResult.TYPE_OF_PENALTY.split(',') //更新刑罚种类
			state.oneSuspectInfo.penaltyPeriod = judgmentResult.PENALTY_PERIOD //更新刑罚期限
			state.oneSuspectInfo.isProbation = judgmentResult.IS_PROBATION //是否缓刑
			state.oneSuspectInfo.fineAmount = judgmentResult.FINE_AMOUNT //罚金数额
			state.oneSuspectInfo.isIllegalIncome = judgmentResult.IS_ILLEGAL_INCOME //是否追缴违法所得
			state.oneSuspectInfo.lightPlot = judgmentResult.LIGHT_PLOT //从轻情节
		},
		//更新根据犯罪嫌疑人编号查询罪名数据
		updateChargeResultBySuspectNum(state, chargeResult) {
			if (chargeResult.length > 0) {
				for (let index in chargeResult) {
					state.oneSuspectInfo.accusation.push(chargeResult[index].CHARGE)
				}
			}
			console.log('查询到的罪名信息是', chargeResult)
		},
		//更新所有的犯罪嫌疑人数据
		updateAllSuspectData(state, allSuspectData) {
			state.allSuspect.allSuspectInfo = allSuspectData
		},
	},
}
export default suspectInfo
