<template>
	<div class="register">
		<el-form ref="form" :model="form" label-width="100px">
			<el-form-item label="案件名称:">
				<el-input v-model="form.caseName"></el-input>
			</el-form-item>
			<el-form-item label="案件来源:">
				<el-select v-model="form.caseRes" placeholder="请选择案件来源" style="float: left">
					<el-option label="公安机关" value="公安机关"></el-option>
					<el-option label="市场监督管理部门" value="市场监督管理部门"></el-option>
					<el-option label="法院判决" value="法院判决"></el-option>
					<el-option label="检察机关" value="检察机关"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="发案时间:">
				<el-col :span="11">
					<el-date-picker
						v-model="form.caseDate"
						format="yyyy 年 MM 月 dd 日"
						placeholder="选择日期"
						style="width: 200px; float: left"
						type="date"
						value-format="yyyy-MM-dd"
					></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="发案地点:">
				<el-input v-model="form.locationC"></el-input>
			</el-form-item>
			<el-form-item label="涉案金额:">
				<el-input v-model="form.moneyCount" style="width: 200px; float: left"></el-input>
				<span style="float: left; margin-left: 10px">万元</span>
			</el-form-item>
			<el-form-item label="涉案人数">
				<el-input v-model="form.personCount" style="float: left; width: 100px"></el-input>
				<span style="float: left; margin-left: 10px">人</span>
			</el-form-item>
			<el-form-item label="案情简介">
				<el-input v-model="form.caseInfo" type="textarea"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">修改</el-button>
				<el-button>保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'RegisterCase',
	data() {
		return {
			disabled: false,
			form: {
				caseNum: '',
				caseName: '',
				caseRes: '',
				caseDate: '',
				locationC: '',
				moneyCount: '',
				personCount: '',
				caseInfo: '',
			},
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!')
		},
	},
	created() {
		console.log('前端获得的state中的数据', this.$store.state.caseInfo)
		this.$store.dispatch('inquireCaseInfo')
		this.disabled = false
		// this.caseNum = this.$store.state.caseInfo.caseNum
		// this.form.caseName = this.$store.state.caseInfo.caseName
		// this.form.caseRes = this.$store.state.caseInfo.caseRes
		// this.form.caseDate = this.$store.state.caseInfo.caseDate
		// this.form.locationC = this.$store.state.caseInfo.locationC
		// this.form.moneyCount = this.$store.state.caseInfo.moneyCount
		// this.form.personCount = this.$store.state.caseInfo.personCount
		// this.form.caseInfo = this.$store.state.caseInfo.caseInfo
		this.form = this.$store.state.caseInfo
		console.log('前端FORM数据是', this.form)
	},
}
</script>
