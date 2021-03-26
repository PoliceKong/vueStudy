<template>
	<div>
		<span>
			<el-button
				icon="el-icon-circle-plus-outline"
				style="float: left;margin-top: -10px"
				type="primary"
				@click="addJudgementDialogVisible = true"
			>
				添加判决书
			</el-button>
			<el-button icon="el-icon-search" style="float: left;margin-top: -10px" type="success">查询审理人员</el-button>
			<el-button icon="el-icon-search" style="float: left;margin-top: -10px" type="warning">查询公诉人员</el-button>
			<el-button icon="el-icon-search" style="float: left;margin-top: -10px" type="info">查询侦查人员</el-button>
		</span>
		<!--	  下面是添加判决书的显示组件dialog-->
		<el-dialog
			v-bind="$attrs"
			v-on="$listeners"
			@open="onOpen"
			@close="onClose"
			title="登记判决书信息"
			:visible.sync="addJudgementDialogVisible"
		>
			<el-form ref="judgmentsForm" :model="judgmentDate" :rules="rules" size="medium" label-width="100px" label-position="left">
				<el-form-item label="判决书文号" prop="judgmentNumber">
					<el-input
						v-model="judgmentDate.judgmentNumber"
						placeholder="请输入判决书文号"
						show-word-limit
						clearable
						prefix-icon="el-icon-s-order"
						:style="{ width: '100%' }"
					></el-input>
				</el-form-item>
				<el-form-item label="文书名称" prop="judgmentName">
					<el-input
						v-model="judgmentDate.judgmentName"
						placeholder="请输入文书名称"
						clearable
						prefix-icon="el-icon-document-copy"
						:style="{ width: '100%' }"
					></el-input>
				</el-form-item>
				<el-form-item label="文书种类" prop="judgmentKinds">
					<el-select
						v-model="judgmentDate.judgmentKinds"
						placeholder="请选择文书种类"
						clearable
						:style="{ width: '50%', float: 'left' }"
					>
						<el-option
							v-for="(item, index) in judgmentKindsOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审理程序" prop="trialProcess">
					<el-radio-group
						v-model="judgmentDate.trialProcess"
						size="medium"
						:style="{ width: '70%', float: 'left', marginTop: '10px' }"
					>
						<el-radio v-for="(item, index) in trialProcessOptions" :key="index" :label="item.value" :disabled="item.disabled">
							{{ item.label }}
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="公诉日期" prop="publicJudgDate">
					<el-date-picker
						v-model="judgmentDate.publicJudgDate"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						:style="{ width: '50%', float: 'left' }"
						placeholder="请选择公诉日期"
						clearable
					></el-date-picker>
				</el-form-item>
				<el-form-item label="判决日期" prop="judgDate">
					<el-date-picker
						v-model="judgmentDate.judgDate"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						:style="{ width: '50%', float: 'left' }"
						placeholder="请选择判决日期"
						clearable
					></el-date-picker>
				</el-form-item>

				<el-divider></el-divider>
				<el-form-item label="检察院名称" prop="procuratorateName">
					<el-input
						v-model="judgmentDate.procuratorateName"
						placeholder="请输入检察院名称"
						clearable
						:style="{ width: '70%', float: 'left' }"
					></el-input>
				</el-form-item>
				<el-form-item label="检察院级别" prop="procuratorateKinds">
					<el-select
						v-model="judgmentDate.procuratorateKinds"
						placeholder="请选择检察院级别"
						clearable
						:style="{ width: '40%', float: 'left' }"
					>
						<el-option
							v-for="(item, index) in procuratorateKindsOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						plain
						icon="el-icon-circle-plus-outline"
						:style="{ float: 'left' }"
						@click="publiceDialog = true"
					>
						添加公诉人员
					</el-button>
				</el-form-item>
				<el-divider></el-divider>
				<el-form-item label="公安机关名称" prop="policeStationName">
					<el-input
						v-model="judgmentDate.policeStationName"
						placeholder="请输入公安机关名称"
						clearable
						:style="{ width: '70%', float: 'left' }"
					></el-input>
				</el-form-item>
				<el-form-item label="公安机关级别" prop="policeStationKinds">
					<el-select
						v-model="judgmentDate.policeStationKinds"
						placeholder="请选择公安机关级别"
						clearable
						:style="{ width: '40%', float: 'left' }"
					>
						<el-option
							v-for="(item, index) in policeStationKindsOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						plain
						icon="el-icon-circle-plus-outline"
						:style="{ float: 'left' }"
						@click="policeDialog = true"
					>
						添加侦查人员
					</el-button>
				</el-form-item>
				<el-divider></el-divider>
				<el-form-item label="法院名称" prop="courtName">
					<el-input
						v-model="judgmentDate.courtName"
						placeholder="请输入法院名称"
						clearable
						:style="{ width: '70%', float: 'left' }"
					></el-input>
				</el-form-item>
				<el-form-item label="法院级别" prop="courtKinds">
					<el-select
						v-model="judgmentDate.courtKinds"
						placeholder="请选择法院级别"
						clearable
						:style="{ width: '40%', float: 'left' }"
					>
						<el-option
							v-for="(item, index) in courtKindsOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						plain
						icon="el-icon-circle-plus-outline"
						:style="{ float: 'left' }"
						@click="trialStaffDialog = true"
					>
						添加审理人员
					</el-button>
					<el-button
						type="primary"
						plain
						icon="el-icon-circle-plus-outline"
						:style="{ float: 'left' }"
						@click="clerkDialog = true"
					>
						添加书记员
					</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="close">取消</el-button>
				<el-button type="primary" @click="handelConfirm">确定</el-button>
			</div>
		</el-dialog>
		<!--	  下面是添加人员的组件el-drawer-->
		<!--	  1.添加公诉人员-->
		<el-drawer title="添加公诉人员" :visible.sync="publiceDialog" direction="rtl" custom-class="publicer-drawer" ref="publicerDrawer">
			<div class="public_drawer_content">
				<el-form size="medium" label-width="100px" :model="publicForm">
					<el-form-item
						v-for="(publicer, index) in publicForm.publicers"
						:key="index"
						label="公诉人员姓名"
						style="margin-left: 20px"
					>
						<el-input
							v-model="publicer.publicerName"
							style="width:200px;float: left"
							placeholder="请输入公诉人员姓名"
						></el-input>
						<el-button icon="el-icon-delete" circle type="primary" @click.prevent="removePublicer(publicer)"></el-button>
					</el-form-item>
					<el-form-item>
						<el-button icon="el-icon-plus" circle type="primary" @click="addPublicer"></el-button>
					</el-form-item>
				</el-form>
				<div class="publie_drawer_footer">
					<el-button @click="publiceDialog = false">取 消</el-button>
					<el-button type="primary" @click="publiceDialog = false">完成</el-button>
				</div>
			</div>
		</el-drawer>
		<!--	  2.添加侦查人员-->
		<el-drawer title="添加侦查人员" :visible.sync="policeDialog" direction="rtl" custom-class="demo-drawer" ref="drawer">
			<div class="police_drawer_content">
				<el-form size="medium" label-width="100px" :model="policeForm">
					<el-form-item v-for="(police, index) in policeForm.polices" :key="index" label="侦查人员姓名" style="margin-left: 20px">
						<el-input v-model="police.policeName" style="width:200px;float: left" placeholder="请输入侦查人员姓名"></el-input>
						<el-button icon="el-icon-delete" circle type="primary" @click.prevent="removePolice(police)"></el-button>
					</el-form-item>
					<el-form-item>
						<el-button icon="el-icon-plus" circle type="primary" @click="addPolice"></el-button>
					</el-form-item>
				</el-form>
				<div class="police_drawer_footer">
					<el-button @click="policeeDialog = false">取 消</el-button>
					<el-button type="primary" @click="policeDialog = false">完成</el-button>
				</div>
			</div>
		</el-drawer>
		<!--	  3.添加审理人员-->
		<el-drawer title="添加审理人员" :visible.sync="trialStaffDialog" direction="rtl" custom-class="demo-drawer" ref="drawer">
			<div class="trialStaff_drawer_content">
				<el-form size="medium" label-width="100px" :model="trialStaffForm" rules="rules">
					<ul v-for="(trialStaff, index) in trialStaffForm.trialStaffs" :key="index">
						<el-form-item label="审理人员姓名" style="margin-left: 20px">
							<el-input
								v-model="trialStaff.policeName"
								style="width:200px;float: left"
								placeholder="请输入审理人员姓名"
							></el-input>
						</el-form-item>
						<el-form-item label="审理人员类别" style="margin-left: 20px">
							<el-select
								v-model="trialStaff.trialStaffKinds"
								placeholder="请选择审理人员类别"
								clearable
								:style="{ width: '70%', float: 'left' }"
							>
								<el-option
									v-for="(item, index) in trialStaffKindsOptions"
									:key="index"
									:label="item.label"
									:value="item.value"
									:disabled="item.disabled"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button
								icon="el-icon-delete"
								circle
								type="primary"
								@click.prevent="removeTrialStaff(trialStaff)"
							></el-button>
						</el-form-item>
					</ul>

					<el-form-item>
						<el-button icon="el-icon-plus" circle type="primary" @click="addTrialStaff"></el-button>
					</el-form-item>
				</el-form>
				<div class="police_drawer_footer">
					<el-button @click="trialStaffDialog = false">取 消</el-button>
					<el-button type="primary" @click="trialStaffDialog = false">完成</el-button>
				</div>
			</div>
		</el-drawer>
		<!--	  4.添加书记员-->
		<el-drawer title="添加书记员" :visible.sync="clerkDialog" direction="rtl" custom-class="demo-drawer" ref="drawer">
			<div class="clerk_drawer_content">
				<el-form size="medium" label-width="100px" :model="clerkForm">
					<el-form-item v-for="(clerk, index) in clerkForm.clerks" :key="index" label="书记员姓名" style="margin-left: 20px">
						<el-input v-model="clerk.clerkName" style="width:200px;float: left" placeholder="请输入书记员姓名"></el-input>
						<el-button icon="el-icon-delete" circle type="primary" @click.prevent="removeClerk(clerk)"></el-button>
					</el-form-item>
					<el-form-item>
						<el-button icon="el-icon-plus" circle type="primary" @click="addClerk"></el-button>
					</el-form-item>
				</el-form>
				<div class="police_drawer_footer">
					<el-button @click="clerkDialog = false">取 消</el-button>
					<el-button type="primary" @click="clerkDialog = false">完成</el-button>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script>
export default {
	name: 'judgments',
	inheritAttrs: false,
	components: {},
	props: [],
	data() {
		return {
			addJudgementDialogVisible: false,
			publiceDialog: false,
			policeDialog: false,
			trialStaffDialog: false,
			clerkDialog: false,
			publicForm: {
				publicers: [{ publicerName: '', key: Date.now() }],
			},
			policeForm: {
				polices: [{ policeName: '', key: Date.now() }],
			},
			trialStaffForm: {
				trialStaffs: [
					{
						trialStaffName: '',
						trialStaffKinds: '',
						key: Date.now(),
					},
				],
			},
			clerkForm: {
				clerks: [{ clerkName: '', key: Date.now }],
			},

			judgmentDate: {
				judgmentNumber: '',
				judgmentName: '',
				judgmentKinds: '刑事判决书',
				trialProcess: '一审',
				judgDate: '',
				publicJudgDate: '',
				procuratorateName: '',
				procuratorateKinds: '',
				policeStationName: '',
				policeStationKinds: '',
				courtName: '',
				courtKinds: '',
			},
			rules: {
				judgmentNumber: [
					{
						required: true,
						message: '请输入判决书文号',
						trigger: 'blur',
					},
				],
				judgmentName: [
					{
						required: true,
						message: '请输入文书名称',
						trigger: 'blur',
					},
				],
				judgmentKinds: [
					{
						required: true,
						message: '请选择文书种类',
						trigger: 'change',
					},
				],
				trialProcess: [
					{
						required: true,
						message: '审理程序不能为空',
						trigger: 'change',
					},
				],
				judgDate: [],
				publicJudgDate: [],
				procuratorateName: [],
				procuratorateKinds: [],
				policeStationName: [],
				policeStationKinds: [],
				courtName: [],
				courtKinds: [],
			},
			judgmentKindsOptions: [
				{
					label: '1-刑事判决书',
					value: '刑事判决书',
				},
				{
					label: '2-刑事裁定书',
					value: '刑事裁定书',
				},
			],
			trialProcessOptions: [
				{
					label: '一审',
					value: '一审',
				},
				{
					label: '二审',
					value: '二审',
				},
				{
					label: '再审',
					value: '再审',
				},
				{
					label: '终审',
					value: '终审',
				},
			],
			procuratorateKindsOptions: [
				{
					label: '1-县（区）级人民检察院',
					value: '县（区）级人民检察院',
				},
				{
					label: '2-市级人民检察院',
					value: '市级人民检察院',
				},
				{
					label: '3-省级人民检察院',
					value: '省级人民检察院',
				},
				{
					label: '4-最高人民检察院',
					value: '最高人民检察院',
				},
			],
			policeStationKindsOptions: [
				{
					label: '1-县（区）级公安机关',
					value: '县（区）级公安机关',
				},
				{
					label: '2-市级公安机关',
					value: '市级公安机关',
				},
				{
					label: '3-省级公安机关',
					value: '省级公安机关',
				},
				{
					label: '4-公安部',
					value: '公安部',
				},
			],
			courtKindsOptions: [
				{
					label: '1-基层人民法院',
					value: '基层人民法院',
				},
				{
					label: '2-中级人民法院',
					value: '中级人民法院',
				},
				{
					label: '3-高级人民法院',
					value: '高级人民法院',
				},
				{
					label: '4-最高人民法院',
					value: '最高人民法院',
				},
			],
			trialStaffKindsOptions: [
				{
					label: '1-审判长',
					value: '审判长',
				},
				{
					label: '2-审判员',
					value: '审判员',
				},
				{
					label: '3-审判员',
					value: '人民陪审员',
				},
			],
		}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		onOpen() {},
		onClose() {
			this.$refs['judgmentsForm'].resetFields()
		},
		close() {
			this.addJudgementDialogVisible = false
			this.$emit('update:visible', false)
		},
		handelConfirm() {
			this.$refs['judgmentsForm'].validate(valid => {
				if (!valid) return
				this.registerJudgment() //网络提交注册判决书信息
				this.close()
			})
		},
		addPublicer() {
			this.publicForm.publicers.push({ publicerName: '', key: Date.now() })
		},
		removePublicer(item) {
			let index = this.publicForm.publicers.indexOf(item)
			if (index !== -1) {
				this.publicForm.publicers.splice(index, 1)
			}
		},
		addPolice() {
			this.policeForm.polices.push({ policeName: '', key: Date.now() })
		},
		removePolice(item) {
			let index = this.policeForm.polices.indexOf(item)
			if (index !== -1) {
				this.policeForm.polices.splice(index, 1)
			}
		},
		addTrialStaff() {
			this.trialStaffForm.trialStaffs.push({
				trialStaffName: '',
				trialStaffKinds: '',
				key: Date.now(),
			})
		},
		removeTrialStaff(item) {
			let index = this.trialStaffForm.trialStaffs.indexOf(item)
			if (index !== -1) {
				this.trialStaffForm.trialStaffs.splice(index, 1)
			}
		},
		addClerk() {
			this.clerkForm.clerks.push({ clerkName: '', key: Date.now })
		},
		removeClerk(item) {
			let index = this.clerkForm.clerks.indexOf(item)
			if (index !== -1) {
				this.clerkForm.clerks.splice(index, 1)
			}
		},
		registerJudgment() {
			let judgmentDatas = {
				JUDGMENT_NUMBER: this.judgmentDate.judgmentNumber, //文号
				DOCUMENT_NAME: this.judgmentDate.judgmentName, //名称
				TRIAL_PROCEDURE: this.judgmentDate.trialProcess, //审理程序
				PUBLIC_PROSECUTION_DATE: this.judgmentDate.publicJudgDate, //公诉日期
				JUDGMENT_DATE: this.judgmentDate.judgDate, //判决日期
				CASE_NUMBER: this.$store.state.caseInfo.caseNum, //案件编号
			}
			let policeStationData = {
				JUDGMENT_NUMBER: this.$store.state.judgmentInfo.judgmentNumber,
				NAME_OF_INVESTIGATION_AGENCY: this.judgmentDate.policeStationName, //侦查机关名称
				INVESTIGATIVE_AGENCY_LEVE: this.judgmentDate.policeStationKinds,
			}
			let courtData = {
				JUDGMENT_NUMBER: this.$store.state.judgmentInfo.judgmentNumber,
				COURT_NAME: this.judgmentDate.courtName, //法院名称
				COURT_LEVEL: this.judgmentDate.courtKinds, //法院级别
			}
			let publiceData = {
				JUDGMENT_NUMBER: this.$store.state.judgmentInfo.judgmentNumber,
				NAME_OF_PROCURATORATE: this.judgmentDate.procuratorateName, //公诉机关名称
				PROCURATORATE_LEVEL: this.judgmentDate.procuratorateKinds, //公诉机关级别
			}

			this.$store.dispatch('registerJudgment', judgmentDatas)
			this.$store.dispatch('registerPoliceStation', policeStationData)
			this.$store.dispatch('registerCourt', courtData)
			this.$store.dispatch('registerPublication', publiceData)
		},
	},
}
</script>

<style>
.el-drawer.rtl {
	overflow: auto;
}
</style>
