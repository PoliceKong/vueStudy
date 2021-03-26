import { request } from '@/network/request'

const suspectInfo = {
	state: {
		suspectNumber: '',
		judgmentNumber: '',
		oneSuspectInfo: {
			identityCategory: '', //身份类别
			suspName: '', //嫌疑人姓名
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
		},
	},
	actions: {
		//查询单个犯罪嫌疑人的详细信息
		inquiryOneSuspectInfo(context, suspectNum) {
			request({ method: 'post', url: 'queryOnesuspect.do', data: suspectNum })
				.then(response => {
					if (response.status === 200) {
						context.commit('updateSuspectInfo', response)
					} else {
						console.log('嫌疑人详细数据查询失败')
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
	},
	mutations: {
		updateSuspectNumber(state, suspect) {
			state.suspectNumber = suspect.data.suspectNumber
		},
		//更新裁决结果编号
		updateJudgmentNumber(state, judgment) {
			console.log('裁决编号是judgment', judgment)
			state.judgmentNumber = judgment.data.judgmentResultNum
		},
		updateSuspectInfo(state, suspectResult) {
			state.oneSuspectInfo.identityCategory = suspectResult.data[0].SUBJECT_CATEGORY
			state.oneSuspectInfo.suspName = suspectResult.data[0].NAME_OF_SUSPECT
			state.oneSuspectInfo.sex = suspectResult.data[0].SUSPECT_GENDER
			state.oneSuspectInfo.nation = suspectResult.data[0].NATION
			state.oneSuspectInfo.degreeOf = suspectResult.data[0].EDUCATION
			state.oneSuspectInfo.birthday = suspectResult.data[0].DATE_OF_BIRTH
			state.oneSuspectInfo.nativePlace = suspectResult.data[0].HOMETOWN //籍贯
			state.oneSuspectInfo.permanentAddress = suspectResult.data[0].RESIDENCE_ADDRESS //户籍地址
			state.oneSuspectInfo.currentAddress = suspectResult.data[0].CURRENT_ADDRESS //现住址
			state.oneSuspectInfo.work = suspectResult.data[0].EMPLOYER //工作单位
			state.oneSuspectInfo.occupation = suspectResult.data[0].OCCUPATION //职业
			state.oneSuspectInfo.crimeDay = suspectResult.data[0].CRIME_TIME //犯罪时间
			state.oneSuspectInfo.criminalRecord = suspectResult.data[0].CRIMINAL_HISTORY //前科
			state.oneSuspectInfo.criminalAct = suspectResult.data[0].CRIMINAL_BEHAVIOR //犯罪行为
		},
	},
}
export default suspectInfo
