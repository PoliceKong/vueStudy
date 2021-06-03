<template>
	<div>
		<el-table :data="allPoisonData" style="width: 100%" max-height="1500">
			<el-table-column fixed prop="POISON_NUMBER" label="毒害物编号" width="150"></el-table-column>
			<el-table-column prop="SCIENTIFIC_NAME_OF_POISON" label="毒害物学名" width="150"></el-table-column>
			<el-table-column prop="POISON_ALIAS_01" label="毒害别名01" width="150"></el-table-column>
			<el-table-column prop="POISON_ALIAS_02" label="毒害物别名02" width="150"></el-table-column>
			<el-table-column prop="TOXIC_CHEMICAL_COMPOSITION" label="毒害物化学成分" width="180"></el-table-column>
			<el-table-column prop="ACTUAL_MEASUREMENT_OF_POISON" label="毒害物化学成分含量" width="180"></el-table-column>
			<!--			<el-table-column fixed="right" label="操作" width="200">-->
			<!--				<template slot-scope="scope">-->
			<!--					<el-button-->
			<!--						type="text"-->
			<!--						size="small"-->
			<!--						@click.native.prevent="regsiterAccreditationBodies(scope.$index, selectPoisonByCaseNumResult)"-->
			<!--					>-->
			<!--						添加鉴定机构-->
			<!--					</el-button>-->
			<!--					<el-button type="text" size="small">-->
			<!--						编辑-->
			<!--					</el-button>-->
			<!--					<el-button @click.native.prevent="deleteRow(scope.$index, selectPoisonByCaseNumResult)" type="text" size="small">-->
			<!--						移除-->
			<!--					</el-button>-->
			<!--				</template>-->
			<!--			</el-table-column>-->
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'watchAllPoisons',
	computed: {
		allPoisonData: function() {
			return this.$store.state.poisonsInfo.inquiryAllPoisonData.inquiryPoisonResult
		},
	},
}
</script>

<style scoped></style>
