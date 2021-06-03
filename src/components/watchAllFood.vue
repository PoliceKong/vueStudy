<template>
	<div>
		<el-table :data="AllFoodData" border style="width: 100%">
			<el-table-column fixed prop="FOOD_NUMBER" label="食品编号" width="150"></el-table-column>
			<el-table-column prop="FOOD_NAME" label="食品名称" width="200"></el-table-column>
			<el-table-column prop="FOOD_TYPE" label="食品类型" width="300"></el-table-column>
			<el-table-column prop="FOOD_INGREDIENTS" label="食品成分" width="300"></el-table-column>
			<el-table-column prop="FOOD_QUANTITY" label="食品数量" width="120"></el-table-column>
			<!--			<el-table-column fixed="right" label="操作" width="100">-->
			<!--				<template slot-scope="scope">-->
			<!--					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>-->
			<!--					<el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, selectFoodsByCaseNum)">-->
			<!--						删除-->
			<!--					</el-button>-->
			<!--				</template>-->
			<!--			</el-table-column>-->
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'watchAllFood',
	computed: {
		AllFoodData: function() {
			return this.$store.state.foodsInfo.inquiryAllFoods.foodResultArray
		},
	},
}
</script>

<style scoped></style>
