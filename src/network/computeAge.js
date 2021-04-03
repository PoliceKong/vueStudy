export function getCrimeAge(birDate, crimeDate) {
	let returnAge
	if (birDate !== null && crimeDate !== null) {
		//格式出生罪时间
		let birArr = birDate.split('-')
		let birYear = birArr[0]
		let birMonth = birArr[1]
		let birDay = birArr[2]
		//格式犯罪时间
		let crimeArr = crimeDate.split('-')
		let crimeYear = crimeArr[0]
		let crimeMonth = crimeArr[1]
		let crimeDay = crimeArr[2]
		if (crimeYear === birYear) {
			returnAge = 0 //
		} else {
			let ageDiff = crimeYear - birYear //
			if (ageDiff > 0) {
				if (crimeMonth === birMonth) {
					let dayDiff = crimeDay - birDay //
					if (dayDiff < 0) {
						returnAge = ageDiff - 1
					} else {
						returnAge = ageDiff
					}
				} else {
					let monthDiff = crimeMonth - birMonth //
					if (monthDiff < 0) {
						returnAge = ageDiff - 1
					} else {
						returnAge = ageDiff
					}
				}
			} else {
				alert('出生日期晚于今天，数据有误,请重新填写！')
				return '出生日期晚于今天，数据有误' //返回-1 表示出生日期输入错误 晚于今天
			}
		}
		return returnAge
	}
}
