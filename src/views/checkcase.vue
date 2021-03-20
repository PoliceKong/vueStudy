<template>
	<div id="chackcase" style="margin-top: -50px;height: 100%">
		<el-container style="height: 100%">
			<el-header height="100px">
				<el-row style="margin-top: 10px">
					<span
						style="color: white;margin-right: 30px "
					/>危害食品安全刑事案例录入系统
					<el-button type="primary" @click="registercase()"
						>案件注册</el-button
					>
					<el-button type="success">案件查询</el-button>
				</el-row>
			</el-header>
			<el-main style="height:100%">
				<router-view></router-view>
			</el-main>
			<el-footer style="color: white">
				公安备案号11010502030143 京ICP备19004658号
				京网文〔2020〕1039-165号
			</el-footer>
		</el-container>
	</div>
</template>

<script>
export default {
	name: 'checkcase',
	methods: {
		registercase() {},
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
