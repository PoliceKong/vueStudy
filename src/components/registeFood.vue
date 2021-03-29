<template>
	<div>
		<span>
			<el-button
				icon="el-icon-circle-plus-outline"
				plain
				style="float: left;margin-top: -10px"
				type="primary"
				@click="addFoodDialogVisible = true"
			>
				添加涉案食品
			</el-button>
			<el-button icon="el-icon-search" plain style="float: left;margin-top: -10px" type="success">查询涉案食品</el-button>
			<el-button icon="el-icon-search" plain style="float: left;margin-top: -10px" type="warning" @click="toWatchPoisons">
				查询毒害物
			</el-button>
			<el-button icon="el-icon-search" plain style="float: left;margin-top: -10px" type="info">查询鉴定机构</el-button>
		</span>
		<router-view></router-view>
		<el-dialog
			v-bind="$attrs"
			v-on="$listeners"
			:visible.sync="addFoodDialogVisible"
			title="添加涉案食品"
			@close="onClose"
			@open="onOpen"
		>
			<el-row :gutter="15">
				<el-form ref="foodForm" :model="formData" :rules="rules" label-position="left" label-width="100px" size="medium">
					<el-col :span="24">
						<el-form-item label="食品名称" prop="foodName">
							<el-input
								v-model="formData.foodName"
								:style="{ width: '100%' }"
								clearable
								placeholder="请输入食品名称"
								prefix-icon="el-icon-tableware"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="食品种类" prop="kindsOffood">
							<el-select
								v-model="formData.kindsOfFood"
								:style="{ width: '100%' }"
								clearable
								filterable
								placeholder="请选择食品种类"
							>
								<el-option
									v-for="(item, index) in kindsOfFoodOptions"
									:key="index"
									:disabled="item.disabled"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="食品成分" prop="foodIngredients">
							<el-select
								v-model="formData.foodIngredients"
								:style="{ width: '100%' }"
								clearable
								filterable
								placeholder="请选择食品成分"
							>
								<el-option
									v-for="(item, index) in foodIngredientsOptions"
									:key="index"
									:disabled="item.disabled"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="食品数量" prop="foodQuantity">
							<el-input
								v-model="formData.foodQuantity"
								:style="{ width: '100%' }"
								clearable
								placeholder="请输入食品数量+计量单位"
								prefix-icon="el-icon-s-help"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="9">
						<el-form-item prop="poisonous">
							<el-button icon="el-icon-circle-plus-outline" size="medium" type="text" @click="poisonDialog = true">
								添加毒害物
							</el-button>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
			<div slot="footer">
				<el-button @click="close">取消</el-button>
				<el-button type="primary" @click="handleConfirm">提交</el-button>
			</div>
		</el-dialog>
		<el-drawer ref="drawer" :visible.sync="poisonDialog" custom-class="demo-drawer" direction="rtl" size="550px" title="添加毒害物">
			<div class="demo-drawer__content">
				<el-form
					ref="poisionsForm"
					:model="poisonsData"
					label-position="left"
					label-width="100px"
					size="medium"
					style="margin-left: 20px"
				>
					<ul v-for="poision in poisonsData.poisonData" :key="poision.key" class="infinite-list" style="width: 400px">
						<el-form-item label="毒害物学名" prop="poisonName">
							<el-input
								v-model="poision.poisonName"
								:style="{ width: '100%' }"
								clearable
								placeholder="请输入毒害物学名"
							></el-input>
						</el-form-item>
						<el-form-item label="毒害物别名01" prop="poisonName01">
							<el-input
								v-model="poision.poisonName01"
								:style="{ width: '100%' }"
								clearable
								placeholder="请输入毒害物别名01"
							></el-input>
						</el-form-item>
						<el-form-item label="毒害物别名02" prop="poisonName02">
							<el-input
								v-model="poision.poisonName02"
								:style="{ width: '100%' }"
								clearable
								placeholder="请输入毒害物别名02"
							></el-input>
						</el-form-item>
						<el-form-item label="化学成分" prop="poisonChemical">
							<el-input
								v-model="poision.poisonChemical"
								:style="{ width: '100%' }"
								clearable
								placeholder="请输入毒害物化学成分"
							></el-input>
						</el-form-item>
						<el-form-item label="成分含量" prop="poisonChemicalContent">
							<el-input
								v-model="poision.poisonChemicalContent"
								:style="{ width: '100%' }"
								clearable
								placeholder="请输入毒害物化学成分含量"
							></el-input>
						</el-form-item>
						<el-form-item>
							<el-button
								circle
								icon="el-icon-delete"
								style="float: right"
								type="primary"
								@click.prevent="removePosition(poision)"
							></el-button>
						</el-form-item>
					</ul>
					<el-divider></el-divider>
					<el-form-item>
						<el-button icon="el-icon-circle-plus" type="primary" @click="addPoison">增加</el-button>
						<el-button icon="el-icon-success" type="primary" @click="poisonDialog = false">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-drawer>
	</div>
</template>
<script>
import { request } from '@/network/request'
export default {
	inheritAttrs: false,
	components: {},
	props: [],
	data() {
		return {
			foodNumber: '',
			addFoodDialogVisible: false,
			poisonDialog: false,
			formLabelWidth: '80px',
			formData: {
				foodName: '',
				kindsOfFood: '',
				foodIngredients: '',
				foodQuantity: '',
			},
			poisonsData: {
				poisonData: [
					{
						poisonName: '',
						poisonName01: '',
						poisonName02: '',
						poisonChemical: '',
						poisonChemicalContent: '',
						key: Date.now(),
					},
				],
			},

			rules: {
				foodName: [],
				kindsOfFood: [],
				foodIngredients: [],
				foodQuantity: [],
			},
			kindsOfFoodOptions: [
				{
					label: '1-乳及乳制品(特殊膳食用食品特殊膳食用食品涉及品种除外)',
					value: '乳及乳制品(特殊膳食用食品特殊膳食用食品涉及品种除外)',
				},
				{
					label: '2-脂肪，油和乳化脂肪制品',
					value: '脂肪,油和乳化脂肪制品',
				},
				{
					label: '3-冷冻饮品',
					value: '冷冻饮品',
				},
				{
					label: '4-水果、蔬菜(包括块根类)、豆类、食用菌、藻类、坚果以及籽类等',
					value: '水果、蔬菜(包括块根类)、豆类、食用菌、藻类、坚果以及籽类等',
				},
				{
					label: '5-可可制品、巧克力和巧克力制品(包括代可可脂巧克力及制品)以及糖果',
					value: '可可制品、巧克力和巧克力制品(包括代可可脂巧克力及制品)以及糖果',
				},
				{
					label: '6-粮食和粮食制品,包括大米、面粉、杂粮、块根植物、豆类和玉米提取的淀粉等(不包括07.0类)',
					value: '粮食和粮食制品,包括大米、面粉、杂粮、块根植物、豆类和玉米提取的淀粉等(不包括07.0类',
				},
				{
					label: '7-焙烤制品',
					value: '焙烤制品',
				},
				{
					label: '8-肉及肉制品',
					value: '肉及肉制品',
				},
				{
					label: '9-水产及其制品(包括鱼类、甲壳类、贝类、软体类、棘皮类等水产及其加工制品等）',
					value: '水产及其制品(包括鱼类、甲壳类、贝类、软体类、棘皮类等水产及其加工制品等）',
				},
				{
					label: '10-蛋及蛋制品',
					value: '蛋及蛋制品',
				},
				{
					label: '11-甜味料，包括蜂蜜',
					value: '甜味料,包括蜂蜜',
				},
				{
					label: '12-调味品',
					value: '调味品',
				},
				{
					label: '13-特殊膳食用食品',
					value: '特殊膳食用食品',
				},
				{
					label: '14-饮料类',
					value: '饮料类',
				},
				{
					label: '15-酒类',
					value: '酒类',
				},
				{
					label: '16-其他类别',
					value: '其他类别',
				},
			],
			foodIngredientsOptions: [
				{
					label: '1-巴氏杀菌乳、灭菌乳和调制乳',
					value: '巴氏杀菌乳、灭菌乳和调制乳',
				},
				{
					label: '2-发酵乳和风味发酵乳',
					value: '发酵乳和风味发酵乳',
				},
				{
					label: '3-乳粉(包括加糖乳粉)和奶油粉及其调制产品',
					value: '乳粉(包括加糖乳粉)和奶油粉及其调制产品',
				},
				{
					label: '4-炼乳及其调制产品',
					value: '炼乳及其调制产品',
				},
				{
					label: '5-稀奶油(淡奶油)及其类似品',
					value: '稀奶油(淡奶油)及其类似品',
				},
				{
					label: '6-干酪和再制干酪及其类似品',
					value: '干酪和再制干酪及其类似品',
				},
				{
					label: '7-以乳为主要配料的即食风味食品或其预制产品(不包括冰淇淋和风味发酵乳)',
					value: '以乳为主要配料的即食风味食品或其预制产品(不包括冰淇淋和风味发酵乳)',
				},
				{
					label: '8-其他乳制品(如乳清粉、酪蛋白粉等)',
					value: '其他乳制品(如乳清粉、酪蛋白粉等)',
				},
				{
					label: '9-基本不含水的脂肪和油',
					value: '基本不含水的脂肪和油',
				},
				{
					label: '10-水油状脂肪乳化制品',
					value: '水油状脂肪乳化制品',
				},
				{
					label: '11-水油状脂肪乳化制品类以外的脂肪乳化制品,包括混合的和(或)调味的脂肪乳化制品',
					value: '水油状脂肪乳化制品类以外的脂肪乳化制品,包括混合的和(或)调味的脂肪乳化制品',
				},
				{
					label: '12-脂肪类甜品',
					value: '脂肪类甜品',
				},
				{
					label: '13-其他油脂或油脂制品',
					value: '其他油脂或油脂制品',
				},
				{
					label: '14-冰淇淋、雪糕类',
					value: '冰淇淋、雪糕类',
				},
				{
					label: '15-风味冰、冰棍类',
					value: '风味冰、冰棍类',
				},
				{
					label: '16-食用冰',
					value: '食用冰',
				},
				{
					label: '17-其他冷冻饮品',
					value: '其他冷冻饮品',
				},
				{
					label: '18-水果',
					value: '水果',
				},
				{
					label: '19-蔬菜',
					value: '蔬菜',
				},
				{
					label: '20-食用菌和藻类',
					value: '食用菌和藻类',
				},
				{
					label: '21-豆类制品',
					value: '豆类制品',
				},
				{
					label: '22-坚果和籽类',
					value: '坚果和籽类',
				},
				{
					label: '23-可可制品、巧克力和巧克力制品,包括代可可脂巧克力及制品',
					value: '可可制品、巧克力和巧克力制品,包括代可可脂巧克力及制品',
				},
				{
					label: '24-糖果',
					value: '糖果',
				},
				{
					label: '25-糖果和巧克力制品包衣',
					value: '糖果和巧克力制品包衣',
				},
				{
					label: '26-装饰糖果(如工艺造型,或用于蛋糕装饰)、顶饰(非水果材料)和甜汁',
					value: '装饰糖果(如工艺造型,或用于蛋糕装饰)、顶饰(非水果材料)和甜汁',
				},
				{
					label: '27-原粮',
					value: '原粮',
				},
				{
					label: '28-大米及其制品',
					value: '大米及其制品',
				},
				{
					label: '29-小麦粉及其制品',
					value: '小麦粉及其制品',
				},
				{
					label: '30-杂粮粉及其制品',
					value: '杂粮粉及其制品',
				},
				{
					label: '31-淀粉及淀粉类制品',
					value: '淀粉及淀粉类制品',
				},
				{
					label: '32-即食谷物,包括碾轧燕麦(片)',
					value: '即食谷物,包括碾轧燕麦(片)',
				},
				{
					label: '33-方便米面制品',
					value: '方便米面制品',
				},
				{
					label: '34-冷冻米面制品',
					value: '冷冻米面制品',
				},
				{
					label: '35-谷类和淀粉类甜品(如米布丁、木薯布丁)',
					value: '谷类和淀粉类甜品(如米布丁、木薯布丁)',
				},
				{
					label: '36-粮食制品馅料',
					value: '粮食制品馅料',
				},
				{
					label: '37-面包',
					value: '面包',
				},
				{
					label: '38-糕点',
					value: '糕点',
				},
				{
					label: '39-饼干',
					value: '饼干',
				},
				{
					label: '40-焙烤食品馅料及表面用挂浆',
					value: '焙烤食品馅料及表面用挂浆',
				},
				{
					label: '41-其他焙烤食品',
					value: '其他焙烤食品',
				},
				{
					label: '42-生、鲜肉',
					value: '生、鲜肉',
				},
				{
					label: '43-预制肉制品',
					value: '预制肉制品',
				},
				{
					label: '44-熟肉制品',
					value: '熟肉制品',
				},
				{
					label: '45-肉制品的可食用动物肠衣类',
					value: '肉制品的可食用动物肠衣类',
				},
				{
					label: '46-鲜水产',
					value: '鲜水产',
				},
				{
					label: '47-冷冻水产品及其制品',
					value: '冷冻水产品及其制品',
				},
				{
					label: '48-预制水产品(半成品)',
					value: '预制水产品(半成品)',
				},
				{
					label: '49-熟制水产品(可直接食用）',
					value: '熟制水产品(可直接食用）',
				},
				{
					label: '50-水产品罐头',
					value: '水产品罐头',
				},
				{
					label: '51-其他水产品及其制品',
					value: '其他水产品及其制品',
				},
				{
					label: '52-鲜蛋',
					value: '鲜蛋',
				},
				{
					label: '53-再制蛋(不改变物理）',
					value: '再制蛋(不改变物理）',
				},
				{
					label: '54-蛋制品(改变其物理性状)',
					value: '蛋制品(改变其物理性状)',
				},
				{
					label: '55-其他蛋制品',
					value: '其他蛋制品',
				},
				{
					label: '56-食糖',
					value: '食糖',
				},
				{
					label: '57-淀粉糖(果糖,葡萄糖、饴糖、部分转化糖等)',
					value: '淀粉糖(果糖,葡萄糖、饴糖、部分转化糖等)',
				},
				{
					label: '58-蜂蜜及花粉',
					value: '蜂蜜及花粉',
				},
				{
					label: '59-餐桌甜味料',
					value: '餐桌甜味料',
				},
				{
					label: '60-调味糖浆',
					value: '调味糖浆',
				},
				{
					label: '61-其他甜味料',
					value: '其他甜味料',
				},
				{
					label: '62-盐及代盐制品',
					value: '盐及代盐制品',
				},
				{
					label: '63-鲜味剂和助鲜剂',
					value: '鲜味剂和助鲜剂',
				},
				{
					label: '64-醋',
					value: '醋',
				},
				{
					label: '65-酱油',
					value: '酱油',
				},
				{
					label: '66-酱及酱制品',
					value: '酱及酱制品',
				},
				{
					label: '67-料酒及制品',
					value: '料酒及制品',
				},
				{
					label: '68-香辛料类',
					value: '香辛料类',
				},
				{
					label: '69-复合调味料',
					value: '复合调味料',
				},
				{
					label: '70-其他调味料',
					value: '其他调味料',
				},
				{
					label: '71-婴幼儿配方食品',
					value: '婴幼儿配方食品',
				},
				{
					label: '72-婴幼儿辅助食品',
					value: '婴幼儿辅助食品',
				},
				{
					label: '73-其他特殊膳食用食品',
					value: '其他特殊膳食用食品',
				},
				{
					label: '74-包装饮用水',
					value: '包装饮用水',
				},
				{
					label: '75-果蔬汁类及其饮料',
					value: '果蔬汁类及其饮料',
				},
				{
					label: '76-蛋白饮料',
					value: '蛋白饮料',
				},
				{
					label: '77-碳酸饮料',
					value: '碳酸饮料',
				},
				{
					label: '78-茶、咖啡、植物(类)饮料',
					value: '茶、咖啡、植物(类)饮料',
				},
				{
					label: '79-固体饮料',
					value: '固体饮料',
				},
				{
					label: '80-特殊用途饮料',
					value: '特殊用途饮料',
				},
				{
					label: '81-风味饮料',
					value: '风味饮料',
				},
				{
					label: '82-其他类饮料',
					value: '其他类饮料',
				},
				{
					label: '83-蒸馏酒',
					value: '蒸馏酒',
				},
				{
					label: '84-配制酒',
					value: '配制酒',
				},
				{
					label: '85-发酵酒',
					value: '发酵酒',
				},
				{
					label: '86-果冻',
					value: '果冻',
				},
				{
					label: '87-茶叶、咖啡和茶制品',
					value: '茶叶、咖啡和茶制品',
				},
				{
					label: '88-胶原蛋白肠衣',
					value: '胶原蛋白肠衣',
				},
				{
					label: '89-酵母及酵母类制品',
					value: '酵母及酵母类制品',
				},
				{
					label: '90-膨化食品',
					value: '膨化食品',
				},
				{
					label: '91-其他',
					value: '其他',
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
			this.$refs['foodForm'].resetFields()
		},
		close() {
			this.addFoodDialogVisible = false
			this.$emit('update:visible', false)
		},
		//食品信息提交按钮
		handleConfirm() {
			this.$refs['foodForm'].validate(valid => {
				if (!valid) return
				this.registerFood()
				this.close()
			})
		},
		//增加毒害物
		addPoison() {
			this.poisonsData.poisonData.push({
				poisonName: '',
				poisonName01: '',
				poisonName02: '',
				poisonChemical: '',
				poisonChemicalContent: '',
				key: Date.now(),
			})
		},
		removePosition(item) {
			let index = this.poisonsData.poisonData.indexOf(item)
			if (index !== -1) {
				this.poisonsData.poisonData.splice(index, 1)
			}
		},
		registerFood() {
			let foodInfo = {
				CASE_NUMBER: this.$store.state.caseInfo.caseNum,
				FOOD_NAME: this.formData.foodName,
				FOOD_TYPE: this.formData.kindsOfFood,
				FOOD_INGREDIENTS: this.formData.foodIngredients,
				FOOD_QUANTITY: this.formData.foodQuantity,
			}
			request({
				method: 'post',
				url: 'casefood.do',
				data: foodInfo,
			})
				.then(response => {
					if (response.status === 201) {
						console.log('涉案食品注册成功')
						this.foodNumber = response.data.foodNumber
						this.$store.commit('updateFoodNumber', response)
						this.registerPosition()
					}
				})
				.catch(err => {
					console.log('涉案食品注册失败')
					console.log(err)
				})
		},
		registerPosition() {
			let posionInfo = {
				FOOD_NUMBER: this.foodNumber,
				SCIENTIFIC_NAME_OF_POISON: '',
				POISON_ALIAS_01: '',
				POISON_ALIAS_02: '',
				TOXIC_CHEMICAL_COMPOSITION: '',
				ACTUAL_MEASUREMENT_OF_POISON: '',
			}
			if (this.poisonsData.poisonData.length > 0) {
				for (let index in this.poisonsData.poisonData) {
					posionInfo.SCIENTIFIC_NAME_OF_POISON = this.poisonsData.poisonData[index].poisonName
					posionInfo.POISON_ALIAS_01 = this.poisonsData.poisonData[index].poisonName01
					posionInfo.POISON_ALIAS_02 = this.poisonsData.poisonData[index].poisonName02
					posionInfo.TOXIC_CHEMICAL_COMPOSITION = this.poisonsData.poisonData[index].poisonChemical
					posionInfo.ACTUAL_MEASUREMENT_OF_POISON = this.poisonsData.poisonData[index].poisonChemicalContent
					request({
						method: 'post',
						url: 'poison.do',
						data: posionInfo,
					})
						.then(response => {
							if (response.status === 201) {
								console.log('毒害物注册成功')
								this.$store.commit('updatePositionNumber', response.data.poisonNum)
							}
						})
						.catch(err => {
							console.log('注册毒害物失败')
							console.log(err)
						})
				}
			} else {
				console.log('毒害物数据为空')
			}
		},
		toWatchPoisons() {
			if (this.$route.path !== '/watchPoison') {
				this.$store.dispatch('inquiryPoisonData').then(() => {
					this.$router.push('/watchPoison')
				})
			} else {
				this.$store.dispatch('inquiryPoisonData')
			}
		},
	},
}
</script>
<style>
.el-drawer.rtl {
	overflow: scroll;
}
</style>
