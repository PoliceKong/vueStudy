<template>
	<div>
		<span style="float: left;margin-top: -15px">
			<el-button icon="el-icon-circle-plus" type="primary" @click="addSusPectDialogVisible = true">添加嫌疑人</el-button>
			<el-button icon="el-icon-search" type="warning" @click="inquiryAllsuspect">更新查询</el-button>
		</span>
		<el-table :data="suspects" max-height="600px" style="width: 100%">
			<el-table-column fixed label="嫌疑人编号" prop="SUSPECT_NUMBER" width="120"></el-table-column>
			<el-table-column label="身份类别" prop="SUBJECT_CATEGORY" width="100"></el-table-column>
			<el-table-column label="姓名" prop="NAME_OF_SUSPECT" width="100"></el-table-column>
			<el-table-column label="性别" prop="SUSPECT_GENDER" width="70"></el-table-column>
			<el-table-column label="民族" prop="NATION" width="70"></el-table-column>
			<el-table-column label="文化程度" prop="EDUCATION" width="100"></el-table-column>
			<el-table-column label="出生日期" prop="DATE_OF_BIRTH" width="120"></el-table-column>
			<el-table-column label="籍贯" prop="HOMETOWN" width="120"></el-table-column>
			<el-table-column label="户籍地址" prop="RESIDENCE_ADDRESS" width="120"></el-table-column>
			<el-table-column label="现住址" prop="CURRENT_ADDRESS" width="120"></el-table-column>
			<el-table-column label="工作单位" prop="EMPLOYER" width="120"></el-table-column>
			<el-table-column label="职业" prop="OCCUPATION" width="100"></el-table-column>
			<el-table-column label="犯罪时间" prop="CRIME_TIME" width="120"></el-table-column>
			<el-table-column label="犯罪年龄" prop="AGE_OF_CRIME" width="80"></el-table-column>
			<el-table-column label="前科状况" prop="CRIMINAL_HISTORY" width="120"></el-table-column>
			<el-table-column label="犯罪行为" prop="CRIMINAL_BEHAVIOR" width="380"></el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button size="small" type="text" @click.native.prevent="deleteRow(scope.$index, suspects)">
						移除
					</el-button>
					<el-button size="small" type="text" @click="viewSuspectInfo(scope.$index, suspects)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :before-close="handleClose" :visible.sync="addSusPectDialogVisible" title="嫌疑人信息登记" width="50%">
			<el-form ref="susPectForms" :model="suspectsForms" :rules="formsRules" label-position="left" label-width="100px">
				<el-form-item label="嫌疑人姓名" prop="suspName">
					<el-input
						v-model="suspectsForms.suspName"
						class="inputclass"
						clearable
						placeholder="请输入嫌疑人姓名"
						style="width: 300px;float: left"
					></el-input>
				</el-form-item>
				<el-form-item label="身份类别" prop="identityCategory">
					<el-select
						v-model="suspectsForms.identityCategory"
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
					<el-radio-group v-model="suspectsForms.sex" size="medium" style="float: left;margin-top: 13px">
						<el-radio v-for="(item, index) in sexOptions" :key="index" :disabled="item.disabled" :label="item.value">
							{{ item.label }}
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="民族" prop="nation">
					<el-select v-model="suspectsForms.nation" class="inputclass" clearable placeholder="请选择民族" style="float: left">
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
						v-model="suspectsForms.birthday"
						class="inputclass"
						clearable
						format="yyyy-MM-dd"
						placeholder="请选择出生日期"
						style="float: left"
						value-format="yyyy-MM-dd"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="文化程度" prop="degreeOf">
					<el-select
						v-model="suspectsForms.degreeOf"
						class="inputclass"
						clearable
						placeholder="请选择文化程度"
						style="float: left"
					>
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
					<el-select v-model="suspectsForms.occupation" class="inputclass" clearable placeholder="请选择职业" style="float: left">
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
						v-model="suspectsForms.nativePlace"
						class="inputclass"
						clearable
						placeholder="请输入籍贯"
						style="width: 400px;float: left"
					></el-input>
				</el-form-item>
				<el-form-item label="户籍地址" prop="permanentAddress">
					<el-input
						v-model="suspectsForms.permanentAddress"
						class="inputclass"
						clearable
						placeholder="请输入户籍地址"
						style="float: left"
					></el-input>
				</el-form-item>
				<el-form-item label="现住址" prop="currentAddress">
					<el-input
						v-model="suspectsForms.currentAddress"
						class="inputclass"
						clearable
						placeholder="现住址现住址"
						style="float: left"
					></el-input>
				</el-form-item>
				<el-form-item label="工作单位" prop="work">
					<el-input
						v-model="suspectsForms.work"
						class="inputclass"
						clearable
						placeholder="工作单位"
						style="float: left"
					></el-input>
				</el-form-item>
				<el-form-item label="犯罪日期" prop="crimeDay">
					<el-date-picker
						v-model="suspectsForms.crimeDay"
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
						v-model="suspectsForms.criminalRecord"
						class="inputclass"
						clearable
						placeholder="请输入前科情况"
						style="float: left"
					></el-input>
				</el-form-item>
				<el-form-item label="犯罪行为" prop="criminalAct">
					<el-input
						v-model="suspectsForms.criminalAct"
						autosize
						class="inputclass"
						clearable
						placeholder="请输入犯罪行为"
						style="float: left"
						type="textarea"
					></el-input>
				</el-form-item>
				<el-form-item label="刑罚种类" prop="typeOfPenalty">
					<el-checkbox-group v-model="suspectsForms.typeOfPenalty" :min="1" size="medium" style="float: left">
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
					<el-checkbox-group v-model="suspectsForms.accusation" :min="1" size="medium">
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
				<el-form-item>
					<el-button icon="el-icon-circle-plus-outline" size="medium" type="text" @click="addLegalDialog = true">
						添加法条依据
					</el-button>
				</el-form-item>
				<el-form-item label="是否缓刑" prop="probation">
					<el-radio-group v-model="suspectsForms.probation" size="medium" style="float: left;margin-top: 13px">
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
						v-model="suspectsForms.amountOf"
						class="inputclass"
						clearable
						placeholder="请输入罚金数额"
						style="float: left;width: 300px"
					>
						<template slot="append">万元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="是否追缴违法所得" label-width="160px" prop="illegalIncome">
					<el-radio-group v-model="suspectsForms.illegalIncome" size="medium" style="float: left;margin-top: 13px">
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
						v-model="suspectsForms.lightenThe"
						autosize
						class="inputclass"
						clearable
						placeholder="请输入从轻情节"
						style="float: left"
						type="textarea"
					></el-input>
				</el-form-item>
				<el-form-item label="刑罚期限" prop="termOf">
					<el-input
						v-model="suspectsForms.termOf"
						class="inputclass"
						clearable
						placeholder="请输入刑罚期限"
						style="float: left;width: 220px"
					>
						<template slot="append">个月</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="suspectSubmitForm">提交</el-button>
					<el-button @click="resetSuspectForm">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-drawer title="添加法条依据" :visible.sync="addLegalDialog" direction="ltr" custom-class="legal_drawer" ref="legal_drawer">
			<div class="legal-drawer__content">
				<el-form ref="legalsForm" :model="legalData" :rules="legalRules" size="medium" label-width="100px" label-position="left">
					<ul v-for="(legal, index) in legalData.legalInfo" :key="index">
						<el-form-item label="法案名称" prop="actName">
							<el-select v-model="legal.actName" placeholder="请选择法案名称" clearable :style="{ width: '100%' }">
								<el-option
									v-for="(item, index) in actNameOptions"
									:key="index"
									:label="item.label"
									:value="item.value"
									:disabled="item.disabled"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="条款" prop="actClauseIndex">
							<el-input
								v-model="legal.actClauseIndex"
								placeholder="请输入具体条款索引，例：一百四十"
								clearable
								:style="{ width: '100%' }"
							></el-input>
						</el-form-item>
						<el-form-item label-width="110px" label="条款详细内容" prop="legal_content">
							<el-input
								v-model="legal.legal_content"
								type="textarea"
								placeholder="请输入条款详细内容"
								:style="{ width: '100%' }"
							></el-input>
						</el-form-item>
						<el-form-item>
							<el-button
								circle
								icon="el-icon-delete"
								style="float: right;margin-right: 30px"
								type="primary"
								@click.prevent="removeLegal(legal)"
							></el-button>
						</el-form-item>
					</ul>
					<el-divider></el-divider>
					<el-form-item size="large">
						<el-button icon="el-icon-circle-plus" @click="addLegal">增加</el-button>
						<el-button icon="el-icon-success" type="primary" @click="addLegalDialog = false">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-drawer>
	</div>
</template>

<script>
import { request } from '@/network/request'
import { getCrimeAge } from '@/network/computeAge'

export default {
	name: 'addSuspect',
	data() {
		return {
			addSusPectDialogVisible: false,
			addLegalDialog: false,
			legalData: {
				legalInfo: [
					{
						actName: '',
						actClauseIndex: '',
						legal_content: '',
					},
				],
			},
			legalRules: {
				actName: [],
				actClauseIndex: [],
				legal_content: [],
			},
			actNameOptions: [
				{
					label: '1-《中华人民共和国刑法》',
					value: '《中华人民共和国刑法》',
				},
				{
					label: '2-《中华人民共和国刑事诉讼法》',
					value: '《中华人民共和国刑事诉讼法》',
				},
				{
					label: '3-《中华人民共和国食品安全法》',
					value: '《中华人民共和国食品安全法》',
				},
				{
					label: '4-《最高人民法院最高人民检察院关于办理危害食品安全刑事案件适用法律若干问题的解释》',
					value: '《最高人民法院最高人民检察院关于办理危害食品安全刑事案件适用法律若干问题的解释》',
				},
			],
			formLabelWidth: '80px',
			timer: null,
			suspectsForms: {
				suspName: '',
				identityCategory: '自然人',
				sex: '',
				nation: '汉族',
				birthday: null,
				degreeOf: '',
				occupation: '',
				nativePlace: '',
				permanentAddress: '',
				currentAddress: '',
				work: '',
				crimeDay: null,
				criminalRecord: '',
				criminalAct: '',
				typeOfPenalty: [],
				accusation: [],
				probation: '',
				amountOf: '',
				illegalIncome: '',
				lightenThe: '',
				termOf: '',
			},
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
						required: true,
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

			suspects: [],
		}
	},
	computed: {},
	watch: {},
	created() {
		//创建时查询所有嫌疑人
		this.inquiryAllsuspect()
	},
	mounted() {},
	methods: {
		//删除嫌疑人
		deleteRow(index, rows) {
			rows.splice(index, 1)
		},
		handleClose() {
			this.addSusPectDialogVisible = false
		},
		suspectSubmitForm() {
			this.addSusPectDialogVisible = false
			this.$refs['susPectForms'].validate(valid => {
				if (!valid) return
				// 提交表单
				this.registerSuspectsData()
			})
		},
		// legalSubmitForm() {
		// 	this.$refs['legalsForm'].validate(valid => {
		// 		if (valid) {
		// 		}
		// 	})
		// },
		removeLegal(legal) {
			let index = this.legalData.legalInfo.indexOf(legal)
			if (index !== -1) {
				this.legalData.legalInfo.splice(index, 1)
			}
		},
		addLegal() {
			this.legalData.legalInfo.push({ actName: '', actClauseIndex: '', legal_content: '' })
		},
		//注册嫌疑人基本信息
		registerSuspectsData() {
			let suspectData = {
				CASE_NUMBER: this.$store.state.caseInfo.caseNum,
				SUBJECT_CATEGORY: this.suspectsForms.identityCategory, //人员类别
				NAME_OF_SUSPECT: this.suspectsForms.suspName, //嫌疑人姓名
				SUSPECT_GENDER: this.suspectsForms.sex, //性别
				NATION: this.suspectsForms.nation, //民族
				EDUCATION: this.suspectsForms.degreeOf, //文化程度
				DATE_OF_BIRTH: this.suspectsForms.birthday, //出生日期
				HOMETOWN: this.suspectsForms.nativePlace, //籍贯
				RESIDENCE_ADDRESS: this.suspectsForms.permanentAddress, //户籍地址
				CURRENT_ADDRESS: this.suspectsForms.currentAddress, //现住址
				EMPLOYER: this.suspectsForms.work, //工作单位
				OCCUPATION: this.suspectsForms.occupation, //职业
				CRIME_TIME: this.suspectsForms.crimeDay, //犯罪时间
				AGE_OF_CRIME: getCrimeAge(this.suspectsForms.birthday, this.suspectsForms.crimeDay), //犯罪年龄
				CRIMINAL_HISTORY: this.suspectsForms.criminalRecord, //前科
				CRIMINAL_BEHAVIOR: this.suspectsForms.criminalAct, //犯罪行为
			}
			// console.log(this.DATE_OF_BIRTH, this.CRIME_TIME)
			// suspectData.AGE_OF_CRIME = getCrimeAge(this.suspectsForms.birthday, this.suspectsForms.crimeDay)
			request({
				method: 'post',
				url: 'suspect.do',
				data: suspectData,
			})
				.then(response => {
					if (response.status === 201) {
						alert('嫌疑人信息注册成功！')
						this.$store.commit('updateSuspectNumber', response)
						this.registerVerdict() //注册裁决结果
						this.addCrime() //注册罪名
					}
				})
				.catch(error => {
					alert('嫌疑人信息注册失败！')
					console.log(error)
				})
		},
		//注册裁决结果
		registerVerdict() {
			let verdictData = {
				TYPE_OF_PENALTY: this.suspectsForms.typeOfPenalty.toString(), //数组格式
				PENALTY_PERIOD: this.suspectsForms.termOf, //刑罚期限
				IS_PROBATION: this.suspectsForms.probation, //是否缓刑
				FINE_AMOUNT: this.suspectsForms.amountOf, //罚金数额
				IS_ILLEGAL_INCOME: this.suspectsForms.illegalIncome, //是否追缴违法所得
				LIGHT_PLOT: this.suspectsForms.lightenThe, //从轻情节
				SUSPECT_NUMBER: this.$store.state.suspectInfo.suspectNumber, //嫌疑人编号
			}

			request({
				method: 'post',
				url: 'judgResult.do',
				data: verdictData,
			})
				.then(response => {
					if (response.status === 201) {
						//更新裁决结果编号
						this.$store.commit('updateJudgmentNumber', response)
						// console.log(response)
						this.registerLegal()
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		//注册罪名信息
		addCrime() {
			if (this.suspectsForms.accusation.length) {
				let crimeData = {
					SUSPECT_NUMBER: this.$store.state.suspectInfo.suspectNumber,
					CHARGE: '',
				}
				for (let index in this.suspectsForms.accusation) {
					crimeData.CHARGE = this.suspectsForms.accusation[index]
					request({
						method: 'post',
						url: 'addCrime.do',
						data: crimeData,
					})
						.then(response => {
							if (response.status === 201) {
								console.log('罪名注册成功')
							}
						})
						.catch(err => {
							console.log('罪名注册失败', err)
						})
				}
			}
		},
		//添加法条信息
		registerLegal() {
			let legalSubmitData = {
				JUDGMENT_RESULT_NUMBER: this.$store.state.suspectInfo.judgmentNumber,
				ACT_NAME: '',
				ACT_CLAUSE: '',
				LEGAL_CONTENT: '',
			}
			// alert(this.legalData.legalInfo.length)
			if (this.legalData.legalInfo.length > 0) {
				for (let index in this.legalData.legalInfo) {
					legalSubmitData.ACT_NAME = this.legalData.legalInfo[index].actName
					legalSubmitData.ACT_CLAUSE = this.legalData.legalInfo[index].actClauseIndex
					legalSubmitData.LEGAL_CONTENT = this.legalData.legalInfo[index].legal_content
					if (legalSubmitData.ACT_NAME !== '' && legalSubmitData.ACT_CLAUSE !== '') {
						request({
							method: 'post',
							url: 'addLegal.do',
							data: legalSubmitData,
						})
							.then(response => {
								if (response.status === 201) {
									console.log('法条注册成功')
								}
							})
							.catch(err => {
								console.log(err)
							})
					}
				}
			}
		},
		resetSuspectForm() {
			this.$refs['susPectForms'].resetFields()
		},
		inquiryAllsuspect() {
			request({
				method: 'post',
				url: 'queryAllsuspect.do',
			})
				.then(response => {
					if (response.status === 200) {
						this.suspects = response.data //返回的数据
					} else {
						alert('嫌疑人查询失败！')
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		//根据嫌疑人编号查询嫌疑人的所有数据，传给store保存
		viewSuspectInfo(index, suspects) {
			let suspectNumber = {
				SUSPECT_NUMBER: suspects[index].SUSPECT_NUMBER,
			}
			this.$store.dispatch('inquiryOneSuspectInfo', suspectNumber)
			this.$router.push('/suspects') //跳转到嫌疑人详细信息页面
		},
	},
}
</script>

<style scoped></style>
