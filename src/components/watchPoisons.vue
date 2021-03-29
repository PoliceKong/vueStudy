<template>
	<div>
		<el-table :data="selectPoisonResult" style="width: 100%" max-height="1500">
			<el-table-column fixed prop="POISON_NUMBER" label="毒害物编号" width="150"></el-table-column>
			<el-table-column prop="SCIENTIFIC_NAME_OF_POISON" label="毒害物学名" width="150"></el-table-column>
			<el-table-column prop="POISON_ALIAS_01" label="毒害别名01" width="150"></el-table-column>
			<el-table-column prop="POISON_ALIAS_02" label="毒害物别名02" width="150"></el-table-column>
			<el-table-column prop="TOXIC_CHEMICAL_COMPOSITION" label="毒害物化学成分" width="180"></el-table-column>
			<el-table-column prop="ACTUAL_MEASUREMENT_OF_POISON" label="毒害物化学成分含量" width="180"></el-table-column>
			<el-table-column fixed="right" label="操作" width="200">
				<template slot-scope="scope">
					<el-button
						type="text"
						size="small"
						@click.native.prevent="regsiterAccreditationBodies(scope.$index, selectPoisonResult)"
					>
						添加鉴定机构
					</el-button>
					<el-button type="text" size="small">
						编辑
					</el-button>
					<el-button @click.native.prevent="deleteRow(scope.$index, selectPoisonResult)" type="text" size="small">
						移除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog v-bind="$attrs" v-on="$listeners" @close="onClose" title="鉴定机构注册" :visible.sync="addAppraisalAgencyDialogVisible">
			<el-form
				ref="judgmentsForm"
				:model="appraisalAgencyData"
				:rules="rules"
				size="medium"
				label-width="100px"
				label-position="left"
			>
				<el-form-item label-width="120px" label="鉴定机构名称" prop="NAME_OF_APPRAISAL_AGENCY">
					<el-input
						v-model="appraisalAgencyData.NAME_OF_APPRAISAL_AGENCY"
						placeholder="请输入鉴定机构名称"
						clearable
						:style="{ width: '100%' }"
					></el-input>
				</el-form-item>
				<el-form-item label-width="120px" label="鉴定机构类别" prop="TYPE_OF_CERTIFICATION_AGENCY">
					<el-select
						v-model="appraisalAgencyData.TYPE_OF_CERTIFICATION_AGENCY"
						placeholder="请选择鉴定机构类别"
						clearable
						:style="{ width: '100%' }"
					>
						<el-option
							v-for="(item, index) in TYPE_OF_CERTIFICATION_AGENCYOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label-width="140px" label="鉴定机构行政区划" prop="ADMINISTRATIVE_DIVISIONS">
					<el-input
						v-model="appraisalAgencyData.ADMINISTRATIVE_DIVISIONS"
						placeholder="请输入鉴定机构行政区划"
						clearable
						prefix-icon="el-icon-location"
						:style="{ width: '100%' }"
					></el-input>
				</el-form-item>
				<el-form-item label="鉴定项目" prop="IDENTIFICATION_SCOPE">
					<el-select
						v-model="appraisalAgencyData.IDENTIFICATION_SCOPE"
						placeholder="请选择鉴定项目"
						clearable
						:style="{ width: '100%' }"
					>
						<el-option
							v-for="(item, index) in IDENTIFICATION_SCOPEOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="鉴定资质" prop="APPRAISAL_QUALIFICATION">
					<el-select
						v-model="appraisalAgencyData.APPRAISAL_QUALIFICATION"
						placeholder="请选择鉴定资质"
						clearable
						:style="{ width: '100%' }"
					>
						<el-option
							v-for="(item, index) in APPRAISAL_QUALIFICATIONOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="鉴定人" prop="APPRAISER_NAME">
					<el-input
						v-model="appraisalAgencyData.APPRAISER_NAME"
						placeholder="请输入鉴定人"
						clearable
						:style="{ width: '100%' }"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="close">取消</el-button>
				<el-button type="primary" @click="handelConfirm">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { request } from '@/network/request'

export default {
	data() {
		return {
			inheritAttrs: false,
			addAppraisalAgencyDialogVisible: false,
			props: [],
			appraisalAgencyData: {
				NAME_OF_APPRAISAL_AGENCY: '',
				TYPE_OF_CERTIFICATION_AGENCY: '',
				ADMINISTRATIVE_DIVISIONS: '',
				IDENTIFICATION_SCOPE: '',
				APPRAISAL_QUALIFICATION: '',
				APPRAISER_NAME: '',
				POISON_NUMBER: '',
			},
			rules: {
				NAME_OF_APPRAISAL_AGENCY: [],
				TYPE_OF_CERTIFICATION_AGENCY: [],
				ADMINISTRATIVE_DIVISIONS: [],
				IDENTIFICATION_SCOPE: [],
				APPRAISAL_QUALIFICATION: [],
				APPRAISER_NAME: [],
			},
			TYPE_OF_CERTIFICATION_AGENCYOptions: [
				{
					label: '1-司法部和省司法厅登记的司法鉴定机构',
					value: '司法部和省司法厅登记的司法鉴定机构',
				},
				{
					label: '2-公安机关鉴定机构',
					value: '公安机关鉴定机构',
				},
			],
			IDENTIFICATION_SCOPEOptions: [
				{
					label: '1-法医类检验鉴定',
					value: '法医类检验鉴定',
				},
				{
					label: '2-痕迹检验鉴定',
					value: '痕迹检验鉴定',
				},
				{
					label: '3-理化检验鉴定',
					value: '理化检验鉴定',
				},
				{
					label: '4-文件检验鉴定',
					value: '文件检验鉴定',
				},
				{
					label: '5-声像资料检验鉴定',
					value: '声像资料检验鉴定',
				},
				{
					label: '6-电子证据检验鉴定',
					value: '电子证据检验鉴定',
				},
				{
					label: '7-心理测试',
					value: '心理测试',
				},
				{
					label: '8-警犬鉴别',
					value: '警犬鉴别',
				},
				{
					label: '9-司法会计鉴定',
					value: '司法会计鉴定',
				},
				{
					label: '10-知识产权司法鉴定',
					value: '知识产权司法鉴定',
				},
			],
			APPRAISAL_QUALIFICATIONOptions: [
				{
					label: '1-计量认证:CMA是中国珠宝鉴定机构设立的必备资质',
					value: '计量认证CMA',
				},
				{
					label: '2-审查认可：CAL由国家认监委和地方质检部门对鉴定机构的综合水平进行审查',
					value: '审查认可CAL',
				},
				{
					label: '3-实验室认可：CNAS是各实验室自愿参加的评定',
					value: '实验室认可CNAS',
				},
			],
		}
	},
	methods: {
		deleteRow(index, rows) {
			rows.splice(index, 1)
		},
		regsiterAccreditationBodies(index, poisonRows) {
			this.appraisalAgencyData.POISON_NUMBER = poisonRows[index].POISON_NUMBER //获取毒害物编号
			this.addAppraisalAgencyDialogVisible = true
		},
		onClose() {
			this.$refs['judgmentsForm'].resetFields()
		},
		close() {
			this.addAppraisalAgencyDialogVisible = false
		},
		handelConfirm() {
			this.$refs['judgmentsForm'].validate(valid => {
				if (!valid) return
				request({
					method: 'post',
					url: 'jiandingjigou.do',
					data: this.appraisalAgencyData,
				})
					.then(response => {
						if (response.status === 201) {
							console.log('鉴定机构注册成功')
							this.close()
						}
					})
					.catch(error => {
						alert('鉴定机构注册失败')
						console.log(error)
						this.close()
					})
			})
		},
	},
	computed: {
		selectPoisonResult: function() {
			return this.$store.state.poisonsInfo.inquiryAllPoisonData.inquiryPoisonResult
		},
	},
}
</script>
