<template>
	<div>
		<el-form
			ref="forms"
			:model="linkSuspectInfo"
			:rules="formsRules"
			label-position="left"
			label-width="100px"
			v-bind:disabled="disabled"
		>
			<el-form-item label="嫌疑人姓名" prop="suspectName">
				<el-input
					v-model="linkSuspectInfo.suspectName"
					class="inputclass"
					clearable
					placeholder="请输入嫌疑人姓名"
					style="width: 300px;float: left"
				></el-input>
			</el-form-item>
			<el-form-item label="身份类别" prop="identityCategory">
				<el-select
					v-model="linkSuspectInfo.identityCategory"
					class="inputclass"
					clearable
					placeholder="请选择身份类别"
					style="float: left"
				>
					<el-option
						v-for="(item, index) in identityCategoryOptions"
						:key="index"
						:disabled="item.disabled"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="linkSuspectInfo.sex" size="medium" style="float: left;margin-top: 13px">
					<el-radio v-for="(item, index) in sexOptions" :key="index" :disabled="item.disabled" :label="item.value">
						{{ item.label }}
					</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="民族" prop="nation">
				<el-select v-model="linkSuspectInfo.nation" class="inputclass" clearable placeholder="请选择民族" style="float: left">
					<el-option
						v-for="(item, index) in nationOptions"
						:key="index"
						:disabled="item.disabled"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="出生日期" prop="birthday">
				<el-date-picker
					v-model="linkSuspectInfo.birthday"
					class="inputclass"
					clearable
					format="yyyy-MM-dd"
					placeholder="请选择出生日期"
					style="float: left"
					value-format="yyyy-MM-dd"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="文化程度" prop="degreeOf">
				<el-select v-model="linkSuspectInfo.degreeOf" class="inputclass" clearable placeholder="请选择文化程度" style="float: left">
					<el-option
						v-for="(item, index) in degreeOfOptions"
						:key="index"
						:disabled="item.disabled"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="职业" prop="occupation">
				<el-select v-model="linkSuspectInfo.occupation" class="inputclass" clearable placeholder="请选择职业" style="float: left">
					<el-option
						v-for="(item, index) in occupationOptions"
						:key="index"
						:disabled="item.disabled"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="籍贯" prop="nativePlace">
				<el-input
					v-model="linkSuspectInfo.nativePlace"
					class="inputclass"
					clearable
					placeholder="请输入籍贯"
					style="width: 400px;float: left"
				></el-input>
			</el-form-item>
			<el-form-item label="户籍地址" prop="permanentAddress">
				<el-input
					v-model="linkSuspectInfo.permanentAddress"
					class="inputclass"
					clearable
					placeholder="请输入户籍地址"
					style="float: left"
				></el-input>
			</el-form-item>
			<el-form-item label="现住址" prop="currentAddress">
				<el-input
					v-model="linkSuspectInfo.currentAddress"
					class="inputclass"
					clearable
					placeholder="现住址现住址"
					style="float: left"
				></el-input>
			</el-form-item>
			<el-form-item label="工作单位" prop="work">
				<el-input v-model="linkSuspectInfo.work" class="inputclass" clearable placeholder="工作单位" style="float: left"></el-input>
			</el-form-item>
			<el-form-item label="犯罪日期" prop="crimeDay">
				<el-date-picker
					v-model="linkSuspectInfo.crimeDay"
					class="inputclass"
					clearable
					format="yyyy-MM-dd"
					placeholder="请选择犯罪日期"
					style="float: left"
					value-format="yyyy-MM-dd"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="前科情况" prop="criminalRecord">
				<el-input
					v-model="linkSuspectInfo.criminalRecord"
					class="inputclass"
					clearable
					placeholder="请输入前科情况"
					style="float: left"
				></el-input>
			</el-form-item>
			<el-form-item label="犯罪行为" prop="criminalAct">
				<el-input
					v-model="linkSuspectInfo.criminalAct"
					class="inputclass"
					clearable
					placeholder="请输入犯罪行为"
					style="float: left"
					type="textarea"
					autosize
				></el-input>
			</el-form-item>
			<el-form-item label="刑罚种类" prop="typeOfPenalty">
				<el-checkbox-group v-model="linkSuspectInfo.typeOfPenalty" :min="1" size="medium" style="float: left">
					<el-checkbox
						v-for="(item, index) in typeOfPenaltyOptions"
						:key="index"
						:disabled="item.disabled"
						:label="item.value"
						style="float: left"
					>
						{{ item.label }}
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="触犯罪名" prop="accusation">
				<el-checkbox-group v-model="linkSuspectInfo.accusation" :min="1" size="medium">
					<el-checkbox
						v-for="(item, index) in accusationOptions"
						:key="index"
						:disabled="item.disabled"
						:label="item.value"
						style="float: left"
					>
						{{ item.label }}
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="是否缓刑" prop="probation">
				<el-radio-group v-model="linkSuspectInfo.isProbation" size="medium" style="float: left;margin-top: 13px">
					<el-radio
						v-for="(item, index) in probationOptions"
						:key="index"
						:disabled="item.disabled"
						:label="item.value"
						style="float: left"
					>
						{{ item.label }}
					</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="罚金数额" prop="amountOf">
				<el-input
					v-model="linkSuspectInfo.fineAmount"
					class="inputclass"
					clearable
					placeholder="请输入罚金数额"
					style="float: left;width: 300px"
				>
					<template slot="append">万元</template>
				</el-input>
			</el-form-item>
			<el-form-item label="是否追缴违法所得" label-width="160px" prop="illegalIncome">
				<el-radio-group v-model="linkSuspectInfo.illegalIncome" size="medium" style="float: left;margin-top: 13px">
					<el-radio
						v-for="(item, index) in illegalIncomeOptions"
						:key="index"
						:disabled="item.disabled"
						:label="item.value"
						style="float: left"
					>
						{{ item.label }}
					</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="从轻情节" prop="lightenThe">
				<el-input
					v-model="linkSuspectInfo.lightPlot"
					class="inputclass"
					clearable
					placeholder="请输入从轻情节"
					style="float: left"
				></el-input>
			</el-form-item>
			<el-form-item label="刑罚期限" prop="termOf">
				<el-input
					v-model="linkSuspectInfo.penaltyPeriod"
					class="inputclass"
					clearable
					placeholder="请输入刑罚期限"
					style="float: left;width: 220px"
				>
					<template slot="append">个月</template>
				</el-input>
			</el-form-item>
		</el-form>
		<el-button type="primary" @click="change">修改</el-button>
		<el-button @click="updateForm">保存</el-button>
	</div>
</template>
<script>
import { getCrimeAge } from '@/network/computeAge'

export default {
	components: {},
	props: [],
	data() {
		return {
			disabled: true,
			formsRules: {
				suspName: [
					{
						required: true,
						message: '请输入嫌疑人姓名',
						trigger: 'blur',
					},
				],
				identityCategory: [
					{
						required: true,
						message: '请选择身份类别',
						trigger: 'change',
					},
				],
				sex: [
					{
						required: true,
						message: '性别不能为空',
						trigger: 'change',
					},
				],
				nation: [
					{
						required: true,
						message: '请选择民族',
						trigger: 'change',
					},
				],
				birthday: [],
				degreeOf: [],
				occupation: [],
				nativePlace: [],
				permanentAddress: [],
				currentAddress: [],
				work: [],
				crimeDay: [],
				criminalRecord: [],
				criminalAct: [
					{
						required: true,
						message: '请输入犯罪行为',
						trigger: 'blur',
					},
				],
				typeOfPenalty: [
					{
						required: true,
						type: 'array',
						message: '请至少选择一个刑罚种类',
						trigger: 'change',
					},
				],
				accusation: [
					{
						required: true,
						type: 'array',
						message: '请至少选择一个罪名',
						trigger: 'change',
					},
				],
				probation: [
					{
						required: false,
						message: '是否缓刑不能为空',
						trigger: 'change',
					},
				],
				amountOf: [],
				illegalIncome: [],
				lightenThe: [],
				termOf: [],
			},
			identityCategoryOptions: [
				{
					label: '自然人',
					value: '自然人',
				},
				{
					label: '单位法人',
					value: '单位法人',
				},
				{
					label: '单位负责人',
					value: '单位负责人',
				},
				{
					label: '一般员工',
					value: '一般员工',
				},
			],
			sexOptions: [
				{
					label: '男',
					value: '男',
				},
				{
					label: '女',
					value: '女',
				},
			],
			nationOptions: [
				{
					label: '01-汉族',
					value: '汉族',
				},
				{
					label: '02-壮族',
					value: '满族',
				},
				{
					label: '03-满族',
					value: '满族 ',
				},
				{
					label: '04-回族',
					value: '回族',
				},
				{
					label: '05-苗族',
					value: '苗族',
				},
				{
					label: '06-维吾尔族',
					value: '维吾尔族',
				},
				{
					label: '07-土家族 ',
					value: '土家族 ',
				},
				{
					label: '08-彝族',
					value: '彝族',
				},
				{
					label: '09-蒙古族',
					value: '蒙古族',
				},
				{
					label: '10-藏族',
					value: '藏族',
				},
				{
					label: '11-布依族',
					value: '布依族',
				},
				{
					label: '12-侗族',
					value: '侗族',
				},
				{
					label: '13-瑶族',
					value: '瑶族',
				},
				{
					label: '14-朝鲜族',
					value: '朝鲜族',
				},
				{
					label: '15-白族',
					value: '白族',
				},
				{
					label: '16-哈尼族',
					value: '哈尼族',
				},
				{
					label: '17-哈萨克族',
					value: '哈萨克族',
				},
				{
					label: '18-黎族',
					value: '黎族',
				},
				{
					label: '19-傣族 ',
					value: '傣族 ',
				},
				{
					label: '20-畲族',
					value: '畲族',
				},
				{
					label: '21-僳僳族',
					value: '僳僳族',
				},
				{
					label: '22-仡佬族',
					value: '仡佬族',
				},
				{
					label: '23-东乡族',
					value: '东乡族',
				},
				{
					label: '24-拉祜族',
					value: '拉祜族',
				},
				{
					label: '25-水族',
					value: '水族',
				},
				{
					label: '26-佤族 ',
					value: '佤族 ',
				},
				{
					label: '27-纳西族',
					value: '纳西族',
				},
				{
					label: '28-羌族 ',
					value: '羌族 ',
				},
				{
					label: '29-土族',
					value: '土族',
				},
				{
					label: '30-仫佬族',
					value: ' 仫佬族',
				},
				{
					label: '31-锡伯族',
					value: '锡伯族',
				},
				{
					label: '32-柯尔克孜族',
					value: '柯尔克孜族',
				},
				{
					label: '33-达翰尔族',
					value: '达翰尔族',
				},
				{
					label: '34-景颇族',
					value: '景颇族',
				},
				{
					label: '35-毛南族',
					value: '毛南族',
				},
				{
					label: '36-撒拉族',
					value: '撒拉族',
				},
				{
					label: '37-布朗族',
					value: '布朗族',
				},
				{
					label: '38-塔吉克族',
					value: '塔吉克族',
				},
				{
					label: '39-阿昌族',
					value: '阿昌族',
				},
				{
					label: '40-普米族',
					value: '普米族',
				},
				{
					label: '41-鄂温克族',
					value: '鄂温克族',
				},
				{
					label: '42-怒族 ',
					value: '怒族',
				},
				{
					label: '43-京族',
					value: '京族',
				},
				{
					label: '44-基诺族',
					value: '基诺族',
				},
				{
					label: '45-德昂族',
					value: '德昂族',
				},
				{
					label: '46-保安族',
					value: '保安族',
				},
				{
					label: '47-俄罗斯族',
					value: '俄罗斯族',
				},
				{
					label: '48-裕固族',
					value: '裕固族',
				},
				{
					label: '49-乌孜别克族',
					value: '乌孜别克族',
				},
				{
					label: '50-门巴族',
					value: '门巴族',
				},
				{
					label: '51-鄂伦春族',
					value: '鄂伦春族',
				},
				{
					label: '52-独龙族',
					value: '独龙族',
				},
				{
					label: '53-塔塔尔族',
					value: '塔塔尔族',
				},
				{
					label: '54-赫哲族',
					value: '赫哲族',
				},
				{
					label: '55-高山族',
					value: '高山族',
				},
				{
					label: '56-珞巴族',
					value: '珞巴族',
				},
			],
			degreeOfOptions: [
				{
					label: '文盲',
					value: '文盲',
				},
				{
					label: '小学',
					value: '小学',
				},
				{
					label: '初中',
					value: '初中',
				},
				{
					label: '高中',
					value: '高中',
				},
				{
					label: '中专',
					value: '中专',
				},
				{
					label: '高职技校',
					value: '高职技校',
				},
				{
					label: '大专',
					value: '大专',
				},
				{
					label: '大学',
					value: '大学',
				},
				{
					label: '硕士',
					value: '硕士',
				},
				{
					label: '博士',
					value: '博士',
				},
			],
			occupationOptions: [
				{
					label: '无业',
					value: '无业',
				},
				{
					label: '农民',
					value: '农民',
				},
				{
					label: '个体工商户',
					value: '个体工商户',
				},
				{
					label: '公司职员',
					value: '公司职员',
				},
				{
					label: '教师',
					value: '教师',
				},
				{
					label: '政府职员',
					value: '政府职员',
				},
				{
					label: '公务员',
					value: '公务员',
				},
				{
					label: '医生',
					value: '医生',
				},
				{
					label: '警察',
					value: '警察',
				},
				{
					label: '军人',
					value: '军人',
				},
			],
			typeOfPenaltyOptions: [
				{
					label: '管制',
					value: '管制',
				},
				{
					label: '拘役',
					value: '拘役',
				},
				{
					label: '有期徒刑',
					value: '有期徒刑',
				},
				{
					label: '无期徒刑',
					value: '无期徒刑',
				},
				{
					label: '死刑',
					value: '死刑',
				},
				{
					label: '罚金',
					value: '罚金',
				},
				{
					label: '剥夺政治权利',
					value: '剥夺政治权利',
				},
				{
					label: '没收财产',
					value: '没收财产',
				},
				{
					label: '驱逐出境',
					value: '驱逐出境',
				},
			],
			accusationOptions: [
				{
					label: '生产、销售不符合安全标准的食品罪',
					value: '生产、销售不符合安全标准的食品罪',
				},
				{
					label: '生产、销售有毒有害食品罪',
					value: '生产、销售有毒有害食品罪',
				},
				{
					label: '生产、销售伪劣产品罪',
					value: '生产、销售伪劣产品罪',
				},
				{
					label: '非法经营罪',
					value: '非法经营罪',
				},
				{
					label: '假冒注册商标罪',
					value: '假冒注册商标罪',
				},
				{
					label: '销售假冒注册商标的商品罪',
					value: '销售假冒注册商标的商品罪',
				},
				{
					label: '投放危险物质罪',
					value: '投放危险物质罪',
				},
				{
					label: '以危险方法危害公共安全罪',
					value: '以危险方法危害公共安全罪',
				},
				{
					label: '食品监管渎职罪',
					value: '食品监管渎职罪',
				},
			],
			probationOptions: [
				{
					label: '是',
					value: '是',
				},
				{
					label: '否',
					value: '否',
				},
			],
			illegalIncomeOptions: [
				{
					label: '是',
					value: '是',
				},
				{
					label: '否',
					value: '否',
				},
			],
		}
	},
	computed: {
		linkSuspectInfo: function() {
			return this.$store.state.suspectInfo.oneSuspectInfo
		},
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		change() {
			this.disabled = false
		},
		updateForm() {
			this.disabled = true
			console.log('新填入的罪名是', this.$store.state.suspectInfo.oneSuspectInfo.accusation)
			this.$refs['forms'].validate(valid => {
				if (valid) {
					this.$store
						.dispatch('updateSuspectBaseInfoByNum', {
							SUBJECT_CATEGORY: this.linkSuspectInfo.identityCategory,
							NAME_OF_SUSPECT: this.linkSuspectInfo.suspectName,
							SUSPECT_GENDER: this.linkSuspectInfo.sex,
							NATION: this.linkSuspectInfo.nation,
							EDUCATION: this.linkSuspectInfo.degreeOf,
							DATE_OF_BIRTH: this.linkSuspectInfo.birthday,
							HOMETOWN: this.linkSuspectInfo.nativePlace,
							RESIDENCE_ADDRESS: this.linkSuspectInfo.permanentAddress,
							CURRENT_ADDRESS: this.linkSuspectInfo.currentAddress,
							EMPLOYER: this.linkSuspectInfo.work,
							OCCUPATION: this.linkSuspectInfo.occupation,
							CRIME_TIME: this.linkSuspectInfo.crimeDay,
							AGE_OF_CRIME: getCrimeAge(this.linkSuspectInfo.birthday, this.linkSuspectInfo.crimeDay),
							CRIMINAL_HISTORY: this.linkSuspectInfo.criminalRecord,
							CRIMINAL_BEHAVIOR: this.linkSuspectInfo.criminalAct,
							SUSPECT_NUMBER: this.linkSuspectInfo.suspectNum,
						})
						.then(() => {
							this.$store.dispatch('updateJudgmentResult', {
								JUDGMENT_RESULT_NUMBER: this.linkSuspectInfo.judgmentResultNumber,
								TYPE_OF_PENALTY: this.linkSuspectInfo.typeOfPenalty.toString(),
								PENALTY_PERIOD: this.linkSuspectInfo.penaltyPeriod,
								IS_PROBATION: this.linkSuspectInfo.isProbation,
								FINE_AMOUNT: this.linkSuspectInfo.fineAmount,
								IS_ILLEGAL_INCOME: this.linkSuspectInfo.isIllegalIncome,
								LIGHT_PLOT: this.linkSuspectInfo.lightPlot,
							})
							//this.$store.dispatch('updateChargeData', this.linkSuspectInfo.accusation)
						})
						.catch(err => {
							alert('更新失败' + err)
						})
				}
				// 提交表单
			})
		},
	},
}
</script>
<style></style>
