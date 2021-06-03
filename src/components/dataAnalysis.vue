<template>
	<div>
		<span style="float: left;margin-top: -15px">
			<el-button icon="el-icon-circle-plus" type="primary" @click="inquiryAllSuspect">所有嫌疑人</el-button>
			<el-button icon="el-icon-search" type="warning" @click="inquiryAllFoodsData">所有食品</el-button>
			<el-button icon="el-icon-circle-plus" type="primary" @click="inquiryAllPoison">所有毒害物</el-button>
			<el-button icon="el-icon-search" type="warning" @click="inquiryAllJudgments">所有判决书</el-button>
		</span>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'dataAnalysis',
	created() {
		this.inquiryAllJudgments()
	},
	methods: {
		//查询所有的犯罪嫌疑人数据
		inquiryAllSuspect() {
			if (this.$route.path === '/watchAllSuspects') {
				this.$store.dispatch('inquiryAllSuspect')
			} else {
				this.$store.dispatch('inquiryAllSuspect')
				this.$router.push('/watchAllSuspects')
			}
		},
		//查询素有的涉案食品
		inquiryAllFoodsData() {
			if (this.$route.path === '/watchAllFood') {
				this.$store.dispatch('inquiryAllFoodsInfo')
			} else {
				this.$store.dispatch('inquiryAllFoodsInfo')
				this.$router.push('/watchAllFood')
			}
		},
		//查询所有的毒害物
		inquiryAllPoison() {
			if (this.$route.path === '/watchAllPoisons') {
				this.$store.dispatch('inquiryPoisonData')
			} else {
				this.$store.dispatch('inquiryPoisonData')
				this.$router.push('/watchAllPoisons')
			}
		},
		//查询所有判决书
		inquiryAllJudgments() {
			if (this.$route.path === '/watchJudgment') {
				this.$store.dispatch('inquiryAllJudgments')
			} else {
				this.$store.dispatch('inquiryAllJudgments')
				this.$router.push('/watchJudgment')
			}
		},
	},
}
</script>

<style scoped></style>
