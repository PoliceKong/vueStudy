<template>
	<div>
		<template>
			<el-table :data="judgmentInfo" stripe style="width: 100%">
				<el-table-column prop="JUDGMENT_NUMBER" label="文书编号" width="280"></el-table-column>
				<el-table-column prop="DOCUMENT_NAME" label="文书名称" width="480"></el-table-column>
				<el-table-column prop="TRIAL_PROCEDURE" label="审理程序" width="180"></el-table-column>
				<el-table-column prop="PUBLIC_PROSECUTION_DATE" label="公诉日期" width="280"></el-table-column>
				<el-table-column prop="JUDGMENT_DATE" label="判决日期" width="280"></el-table-column>
			</el-table>
		</template>
	</div>
</template>

<script>
export default {
	name: 'watchJudgment',
	computed: {
		judgmentInfo: function() {
			return this.$store.state.judgmentInfo.allJudgmentInfo.allJudgmentData
		},
	},
}
</script>

<style scoped></style>
