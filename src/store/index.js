import Vuex from 'vuex'
import Vue from 'vue'
import caseInfo from '@/store/modules/caseInfo'
import suspectInfo from '@/store/modules/suspectInfo'
import foodsInfo from '@/store/modules/foodInfo'
import judgmentInfo from '@/store/modules/judgmentInfo'
import poisonsInfo from '@/store/modules/poisonsInfo'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		caseInfo: caseInfo,
		suspectInfo: suspectInfo,
		foodsInfo: foodsInfo,
		judgmentInfo: judgmentInfo,
		poisonsInfo: poisonsInfo,
	},
})
export default store
