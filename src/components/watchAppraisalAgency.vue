<template>
	<div>
		<el-table :data="JdJgDataByCase" border style="width: 100%">
			<el-table-column fixed prop="IDENTIFICATION_AGENCY_NUMBER" label="鉴定机构编号" width="150"></el-table-column>
			<el-table-column prop="NAME_OF_APPRAISAL_AGENCY" label="鉴定机构名称" width="120"></el-table-column>
			<el-table-column prop="TYPE_OF_CERTIFICATION_AGENCY" label="鉴定机构类别" width="120"></el-table-column>
			<el-table-column prop="ADMINISTRATIVE_DIVISIONS" label="鉴定机构行政区划" width="140"></el-table-column>
			<el-table-column prop="IDENTIFICATION_SCOPE" label="鉴定范围" width="300"></el-table-column>
			<el-table-column prop="APPRAISAL_QUALIFICATION" label="鉴定资质" width="120"></el-table-column>
			<el-table-column prop="APPRAISER_NAME" label="鉴定人姓名" width="120"></el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, JdJgDataByCase)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'watchAppraisalAgency',
	methods: {
		handleClick(row) {
			console.log(row)
		},
		deleteRow(index, rows) {
			rows.splice(index, 1)
		},
	},
	computed: {
		JdJgDataByCase: function() {
			return this.$store.state.poisonsInfo.byCaseNumInquiryJdJgData.byCaseNumInquiryJdJgDataResult
		},
	},

	data() {
		return {
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333,
				},
			],
		}
	},
}
</script>

<style scoped></style>
