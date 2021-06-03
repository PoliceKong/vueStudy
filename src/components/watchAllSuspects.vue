<template>
	<div>
		<el-table :data="allSuspectInfo" max-height="600px" style="width: 100%">
			<el-table-column fixed label="嫌疑人编号" prop="SUSPECT_NUMBER" width="120"></el-table-column>
			<el-table-column label="身份类别" prop="SUBJECT_CATEGORY" width="100"></el-table-column>
			<el-table-column label="姓名" prop="NAME_OF_SUSPECT" width="100"></el-table-column>
			<el-table-column label="性别" prop="SUSPECT_GENDER" width="70"></el-table-column>
			<el-table-column label="民族" prop="NATION" width="70"></el-table-column>
			<el-table-column label="文化程度" prop="EDUCATION" width="100"></el-table-column>
			<el-table-column label="出生日期" prop="DATE_OF_BIRTH" width="120"></el-table-column>
			<el-table-column label="籍贯" prop="HOMETOWN" width="120"></el-table-column>
			<el-table-column label="户籍地址" prop="RESIDENCE_ADDRESS" width="120"></el-table-column>
			<el-table-column label="现住址" prop="CURRENT_ADDRESS" width="120"></el-table-column>
			<el-table-column label="工作单位" prop="EMPLOYER" width="120"></el-table-column>
			<el-table-column label="职业" prop="OCCUPATION" width="100"></el-table-column>
			<el-table-column label="犯罪时间" prop="CRIME_TIME" width="120"></el-table-column>
			<el-table-column label="犯罪年龄" prop="AGE_OF_CRIME" width="80"></el-table-column>
			<el-table-column label="前科状况" prop="CRIMINAL_HISTORY" width="120"></el-table-column>
			<el-table-column label="犯罪行为" prop="CRIMINAL_BEHAVIOR" width="380"></el-table-column>
			<!--			<el-table-column fixed="right" label="操作" width="120">-->
			<!--				<template slot-scope="scope">-->
			<!--					<el-button size="small" type="text" @click.native.prevent="deleteRow(scope.$index, suspectInfoByCaseNum)">-->
			<!--						移除-->
			<!--					</el-button>-->
			<!--					<el-button size="small" type="text" @click="viewSuspectInfo(scope.$index)">编辑</el-button>-->
			<!--				</template>-->
			<!--			</el-table-column>-->
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'watchAllSuspects',
	computed: {
		allSuspectInfo: function() {
			return this.$store.state.suspectInfo.allSuspect.allSuspectInfo
		},
	},
}
</script>

<style scoped></style>
