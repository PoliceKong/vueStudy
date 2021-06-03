<template>
	<div class="register">
		<el-form ref="form" :model="caseBaseInfo" label-width="100px" v-bind:disabled="disabled">
			<el-form-item label="案件名称:">
				<el-input v-model="caseBaseInfo.CASE_NAME"></el-input>
			</el-form-item>
			<el-form-item label="案件来源:">
				<el-select v-model="caseBaseInfo.CASE_SOURCE" placeholder="请选择案件来源" style="float: left">
					<el-option label="公安机关" value="公安机关"></el-option>
					<el-option label="市场监督管理部门" value="市场监督管理部门"></el-option>
					<el-option label="法院判决" value="法院判决"></el-option>
					<el-option label="检察机关" value="检察机关"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="发案时间:">
				<el-col :span="11">
					<el-date-picker
						v-model="caseBaseInfo.TIME_OF_CASE"
						format="yyyy 年 MM 月 dd 日"
						placeholder="选择日期"
						style="width: 200px; float: left"
						type="date"
						value-format="yyyy-MM-dd"
					></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="发案地点:">
				<el-input v-model="caseBaseInfo.LOCATION_OF_CASE"></el-input>
			</el-form-item>
			<el-form-item label="涉案金额:">
				<el-input v-model="caseBaseInfo.AMOUNT_INVOLVED" style="width: 200px; float: left"></el-input>
				<span style="float: left; margin-left: 10px">万元</span>
			</el-form-item>
			<el-form-item label="涉案人数">
				<el-input v-model="caseBaseInfo.NUMBER_OF_OFFENDERS" style="float: left; width: 100px"></el-input>
				<span style="float: left; margin-left: 10px">人</span>
			</el-form-item>
			<el-form-item label="案情简介">
				<el-input v-model="caseBaseInfo.BRIEF_INTRODUCTION" type="textarea" autosize></el-input>
			</el-form-item>
		</el-form>
		<el-button type="primary" @click="changeCaseBaseInfo">修改</el-button>
		<el-button @click="updateCaseInfo">保存</el-button>
	</div>
</template>

<script>
export default {
	name: 'RegisterCase',
	data() {
		return {
			disabled: true,
		}
	},
	methods: {
		changeCaseBaseInfo() {
			this.disabled = false
		},
		//更新要修改的案件信息
		updateCaseInfo() {
			this.disabled = true
			this.$store.dispatch('updateBaseCaseInfoByCaseNum', this.$store.state.caseInfo.caseBaseInfoByCaseNum)
		},
	},
	created() {
		this.$store.dispatch('inquireCaseInfo')
		this.disabled = true
	},
	computed: {
		//获取案例基础数据的更新
		caseBaseInfo: function() {
			return this.$store.state.caseInfo.caseBaseInfoByCaseNum
		},
	},
}
</script>
