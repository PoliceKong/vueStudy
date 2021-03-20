<template>
	<div class="register">
		<el-form ref="form" :model="form" label-width="100px">
			<el-form-item label="案件名称:">
				<el-input
					v-model="form.caseName"
					:disabled="form.disabled"
				></el-input>
			</el-form-item>
			<el-form-item label="案件来源:">
				<el-select
					v-model="form.caseRes"
					:disabled="form.disabled"
					placeholder="请选择案件来源"
					style="float: left"
				>
					<el-option label="公安机关" value="公安机关"></el-option>
					<el-option
						label="市场监督管理部门"
						value="市场监督管理部门"
					></el-option>
					<el-option label="法院判决" value="法院判决"></el-option>
					<el-option label="检察机关" value="检察机关"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="发案时间:">
				<el-col :span="11">
					<el-date-picker
						v-model="form.caseDate"
						:disabled="form.disabled"
						format="yyyy 年 MM 月 dd 日"
						placeholder="选择日期"
						style="width: 200px; float: left"
						type="date"
						value-format="yyyy-MM-dd"
					></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="发案地点:">
				<el-input
					v-model="form.locationC"
					:disabled="form.disabled"
				></el-input>
			</el-form-item>
			<el-form-item label="涉案金额:">
				<el-input
					v-model="form.moneyCount"
					:disabled="form.disabled"
					style="width: 200px; float: left"
				></el-input>
				<span style="float: left; margin-left: 10px">万元</span>
			</el-form-item>
			<el-form-item label="涉案人数">
				<el-input
					v-model="form.personCount"
					:disabled="form.disabled"
					style="float: left; width: 100px"
				></el-input>
				<span style="float: left; margin-left: 10px">人</span>
			</el-form-item>
			<el-form-item label="案情简介">
				<el-input
					v-model="form.caseInfo"
					:disabled="form.disabled"
					type="textarea"
				></el-input>
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
			form: {
				caseName: '',
				caseRes: '',
				caseDate: '',
				locationC: '',
				moneyCount: '',
				personCount: '',
				caseInfo: '',
				disabled: false,
			},
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!')
		},
	},
	created() {
		this.form.caseName = this.$store.state.caseName
		this.form.caseRes = this.$store.state.caseRes
		this.form.caseDate = this.$store.state.caseDate
		this.form.locationC = this.$store.state.locationC
		this.form.moneyCount = this.$store.state.moneyCount
		this.form.personCount = this.$store.state.personCount
		this.form.caseInfo = this.$store.state.caseInfo
	},
}
</script>
