<template>
	<div>
		<el-table :data="judgmentInfoByCaseNum" border style="width: 100%">
			<el-table-column fixed prop="JUDGMENT_NUMBER" label="判决书文号" width="260"></el-table-column>
			<el-table-column prop="DOCUMENT_NAME" label="文书名称" width="510"></el-table-column>
			<el-table-column prop="TRIAL_PROCEDURE" label="审理程序" width="100"></el-table-column>
			<el-table-column prop="PUBLIC_PROSECUTION_DATE" label="公诉日期" width="120"></el-table-column>
			<el-table-column prop="JUDGMENT_DATE" label="判决日期" width="120"></el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, judgmentInfoByCaseNum)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'watchJudgmentInfo',
	methods: {
		handleClick(row) {
			console.log(row)
		},
		deleteRow(index, rows) {
			rows.splice(index, 1)
		},
	},
	computed: {
		judgmentInfoByCaseNum: function() {
			let judgmentInfoResult
			judgmentInfoResult = this.$store.state.judgmentInfo.judgmentBaseInfoByCaseNum.judgmentBaseDataByCaseNum
			return judgmentInfoResult
		},
	},
}
</script>

<style scoped></style>
