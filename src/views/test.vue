<template>
	<div>
		<el-button @click="add">添加</el-button>
		<el-table :data="data">
			<el-table-column label="名称" prop="name">
				<template slot-scope="scope">
					<el-input v-model="data[scope.$index].name"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="年龄" prop="age">
				<template slot-scope="scope">
					<el-input v-model="data[scope.$index].age"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="年龄" prop="age">
				<template slot-scope="scope">
					<el-button @click="deleteRow(scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: [],
		}
	},
	methods: {
		add() {
			this.data.push({})
		},
		deleteRow(index) {
			this.data.splice(index, 1)
		},
	},
}
</script>
