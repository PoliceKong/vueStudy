<template>
	<div id="'inquiryCase'" style="margin-top: -50px;height: 100%">
		<el-container style="height: 100%">
			<el-header height="100px">
				<el-row style="margin-top: 10px">
					<span style="color: white;margin-right: 30px " />
					危害食品安全刑事案例录入系统
					<el-button icon="el-icon-thumb" type="primary" @click="addCaseDialogVisible = true">案件注册</el-button>
					<el-button icon="el-icon-search" type="success" @click="queryAllCases">案件查询</el-button>
				</el-row>
			</el-header>
			<el-main style="height:100%">
				<div>
					<el-table :data="allCaseInformation" :height="fullHeight" :max-height="fullHeight" border="border" style="width: 100%">
						<el-table-column fixed label="案件编号" prop="CASE_NUMBER" width="130"></el-table-column>
						<el-table-column label="案件名称" prop="CASE_NAME" width="180"></el-table-column>
						<el-table-column label="案件来源" prop="CASE_SOURCE" width="150"></el-table-column>
						<el-table-column label="发案时间" prop="TIME_OF_CASE" width="150"></el-table-column>
						<el-table-column label="发案地点" prop="LOCATION_OF_CASE" width="180"></el-table-column>
						<el-table-column label="涉案金额" prop="AMOUNT_INVOLVED" width="80"></el-table-column>
						<el-table-column label="犯罪人数" prop="NUMBER_OF_OFFENDERS" width="80"></el-table-column>
						<el-table-column label="简要案情" prop="BRIEF_INTRODUCTION" width="380"></el-table-column>
						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button size="small" type="text" @click.native.prevent="deleteRow(scope.$index, allCaseInformation)">
									移除
								</el-button>
								<el-button size="small" type="text" @click="viewCaseInformation(scope.$index, allCaseInformation)">
									查看
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-main>
			<el-footer style="color: white">
				公安备案号11010502030143 京ICP备19004658号 京网文〔2020〕1039-165号
			</el-footer>
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
							style="width: 200px;float: left"
							type="date"
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="发案地点:">
					<el-input v-model="diaCaseForm.diaLocationC"></el-input>
				</el-form-item>
				<el-form-item label="涉案金额:">
					<el-input v-model="diaCaseForm.diaMoneyCount" style="width: 200px;float:left;"></el-input>
					<span style="float: left;margin-left: 10px">万元</span>
				</el-form-item>
				<el-form-item label="涉案人数">
					<el-input v-model="diaCaseForm.diaPersonCount" style="float: left;width: 100px"></el-input>
					<span style="float: left;margin-left: 10px">人</span>
				</el-form-item>
				<el-form-item label="案情简介">
					<el-input v-model="diaCaseForm.diaCaseInfo" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="registeredCases">保存</el-button>
				<el-button type="primary" @click="resetInformation">重置</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { request } from '@/network/request'

export default {
	name: 'InquiryCase',
	data() {
		return {
			fullHeight: '',
			addCaseDialogVisible: false, //控制对话框显示
			caseDate: {
				caseNum: '', //存储案件编号，更新vuex中的案件编号
				caseName: '',
			},
			diaCaseForm: {
				diaCaseName: '',
				diaCaseRes: '',
				diaCaseDate: '',
				diaLocationC: '',
				diaMoneyCount: '',
				diaPersonCount: '',
				diaCaseInfo: '',
			},
			allCaseInformation: [],
		}
	},
	methods: {
		registeredCases() {
			if (this.diaCaseForm.diaCaseName === '') {
				alert('请填写案件信息')
			} else {
				request({
					method: 'post',
					url: 'caseRg.do',
					data: {
						CASE_NAME: this.diaCaseForm.diaCaseName,
						CASE_SOURCE: this.diaCaseForm.diaCaseRes,
						TIME_OF_CASE: this.diaCaseForm.diaCaseDate,
						LOCATION_OF_CASE: this.diaCaseForm.diaLocationC,
						AMOUNT_INVOLVED: this.diaCaseForm.diaMoneyCount,
						NUMBER_OF_OFFENDERS: this.diaCaseForm.diaPersonCount,
						BRIEF_INTRODUCTION: this.diaCaseForm.diaCaseInfo,
					},
				})
					.then(response => {
						if (response.status === 201) {
							console.log('案件注册成功')
							this.addCaseDialogVisible = false
							alert('案件注册成功')
							this.resetInformation()
						}
					})
					.catch(error => {
						console.log('案件注册失败', error)
					})
			}
		},
		resetInformation() {
			this.diaCaseForm.diaCaseName = ''
			this.diaCaseForm.diaCaseRes = ''
			this.diaCaseForm.diaCaseInfo = ''
			this.diaCaseForm.diaPersonCount = ''
			this.diaCaseForm.diaLocationC = ''
			this.diaCaseForm.diaMoneyCount = ''
			this.diaCaseForm.diaCaseDate = ''
		},
		queryAllCases() {
			request({
				url: 'queryAllCases.do',
				method: 'post',
			}).then(response => {
				if (response.status === 200) {
					console.log('案件查询成功')
					console.log('屏幕高度是', this.fullHeight)
					this.allCaseInformation = response.data
					console.log(this.allCaseInformation)
				}
			})
		},
		deleteRow(index, rows) {
			rows.splice(index, 1)
		},
		viewCaseInformation(index, rows) {
			this.caseDate.caseNum = rows[index].CASE_NUMBER
			this.caseDate.caseName = rows[index].CASE_NAME
			this.$store.commit('updateCaseNumber', this.caseDate)
			this.$router.push('/indexCase')
		},
	},
	created() {
		this.fullHeight = window.innerHeight - 218
		this.queryAllCases()
	},
	mounted() {
		const that = this
		window.onresize = () => {
			return (() => {
				window.fullHeight = window.innerHeight - 220
				that.fullHeight = window.fullHeight
			})()
		}
	},
	watch: {
		fullHeight(val) {
			if (!this.timer) {
				this.fullHeight = val
				this.timer = true
				let that = this
				setTimeout(function() {
					that.timer = false
				}, 400)
			}
		},
	},
}
</script>

<style scoped>
html,
body {
	height: 100%;
	margin: 0;
	padding: 0;
}

.el-header,
.el-footer {
	background-color: #4b94f3;
	color: #333;
	text-align: center;
	line-height: 60px;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
	line-height: 160px;
}

body > .el-container {
	margin-bottom: -40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>
