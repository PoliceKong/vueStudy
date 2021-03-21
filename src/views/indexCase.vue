<template>
	<div id="caseD">
		<el-container style="margin-top: -50px; width: 100%">
			<el-header height="100px">
				<div style="margin-top: 30px">
					<table>
						<tr>
							<th>案件名称：</th>
							<th>
								{{ this.$store.state.caseInfo.caseName }}
							</th>
							<th style="padding-left: 20px">案件编号：</th>
							<th>
								{{ this.$store.state.caseInfo.caseNum }}
							</th>
						</tr>
					</table>

					<div class="elB">
						<el-button plain type="primary" @click="addCaseDialogVisible = true">案件登记</el-button>
						<el-button plain type="success" @click="viewCaseInfo">案件查询</el-button>
					</div>
				</div>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-button icon="el-icon-s-home" plain style="font-size: 20px" type="primary" @click="toCaseInfo">案情</el-button>

					<el-button icon="el-icon-s-custom" plain style="font-size: 20px" type="primary" @click="toSuspects">嫌疑人</el-button>

					<router-link to="/test">
						<el-button icon="el-icon-menu" plain style="font-size: 20px" type="primary">测试</el-button>
					</router-link>
				</el-aside>
				<el-container>
					<el-main>
						<router-view></router-view>
					</el-main>
				</el-container>
			</el-container>
			<el-container>
				<el-footer style="font-size: 16px; padding-top: 15px">
					危害食品安全刑事案例录入系统 copyright@kongqingxiaoly@163.com
				</el-footer>
			</el-container>
		</el-container>
		<el-dialog :visible.sync="addCaseDialogVisible" title="案件注册">
			<el-form ref="diaCaseFormRef" :model="diaCaseForm" label-width="100px">
				<el-form-item label="案件名称:">
					<el-input v-model="diaCaseForm.diaCaseName"></el-input>
				</el-form-item>
				<el-form-item label="案件来源:">
					<el-select v-model="diaCaseForm.diaCaseRes" placeholder="请选择案件来源" style="float: left">
						<el-option label="公安机关" value="公安机关"></el-option>
						<el-option label="市场监督管理部门" value="市场监督管理部门"></el-option>
						<el-option label="法院判决" value="法院判决"></el-option>
						<el-option label="检察机关" value="检察机关"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发案时间:">
					<el-col :span="11">
						<el-date-picker
							v-model="diaCaseForm.diaCaseDate"
							format="yyyy 年 MM 月 dd 日"
							placeholder="选择日期"
							style="width: 200px; float: left"
							type="date"
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="发案地点:">
					<el-input v-model="diaCaseForm.diaLocationC"></el-input>
				</el-form-item>
				<el-form-item label="涉案金额:">
					<el-input v-model="diaCaseForm.diaMoneyCount" style="width: 200px; float: left"></el-input>
					<span style="float: left; margin-left: 10px">万元</span>
				</el-form-item>
				<el-form-item label="涉案人数">
					<el-input v-model="diaCaseForm.diaPersonCount" style="float: left; width: 100px"></el-input>
					<span style="float: left; margin-left: 10px">人</span>
				</el-form-item>
				<el-form-item label="案情简介">
					<el-input v-model="diaCaseForm.diaCaseInfo" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="addCase">保存</el-button>
				<el-button type="primary" @click="resetDiaoLogCase">重置</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'indexCase',
	data() {
		return {
			addCaseDialogVisible: false, //控制对话框显示
			diaCaseForm: {
				diaCaseName: '',
				diaCaseRes: '',
				diaCaseDate: '',
				diaLocationC: '',
				diaMoneyCount: '',
				diaPersonCount: '',
				diaCaseInfo: '',
			},
		}
	},
	methods: {
		//重置输入
		resetDiaoLogCase() {
			this.diaCaseForm.diaCaseName = ''
			this.diaCaseForm.diaCaseRes = ''
			this.diaCaseForm.diaCaseInfo = ''
			this.diaCaseForm.diaPersonCount = ''
			this.diaCaseForm.diaLocationC = ''
			this.diaCaseForm.diaMoneyCount = ''
			this.diaCaseForm.diaCaseDate = ''
		},
		//注册案件
		addCase() {
			if (this.diaCaseForm.diaCaseName === '') {
				alert('请输入案件信息')
			} else {
				this.$store.dispatch('addCase', {
					CASE_NAME: this.diaCaseForm.diaCaseName,
					CASE_SOURCE: this.diaCaseForm.diaCaseRes,
					TIME_OF_CASE: this.diaCaseForm.diaCaseDate,
					LOCATION_OF_CASE: this.diaCaseForm.diaLocationC,
					AMOUNT_INVOLVED: this.diaCaseForm.diaMoneyCount,
					NUMBER_OF_OFFENDERS: this.diaCaseForm.diaPersonCount,
					BRIEF_INTRODUCTION: this.diaCaseForm.diaCaseInfo,
				})
				this.addCaseDialogVisible = false
				this.resetDiaoLogCase()
			}
		},

		toCaseInfo() {
			let activePath = this.$route.path
			if (activePath === '/indexCase') {
				alert('当前就是案情页面')
			} else {
				this.$router.push('/indexCase')
			}
		},
		toSuspects() {
			if (this.$route.path === '/addSuspect') {
				alert('当前正在嫌疑人页面，无需跳转')
			} else {
				this.$router.push('/addSuspect')
			}
		},
		//跳转到首页，查询案件信息，显示案件信息列表
		viewCaseInfo() {
			this.$router.push('/inquiryCase')
		},
	},
}
</script>
<style>
.elB {
	margin-top: -30px;
	float: right;
}

.el-header {
	background-color: #5184cd;
	text-align: center;
	color: #ffffff;
	font-size: 20px;
}

.el-footer {
	background-color: #5184cd;
	text-align: center;
	color: #ffffff;
	font-size: 20px;
}

.el-aside {
	background-color: #d3dce6;
	color: #eae4e4;
	text-align: center;
	line-height: 200px;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
	line-height: 20px;
}
</style>
