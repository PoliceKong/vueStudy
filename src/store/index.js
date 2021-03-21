import Vuex from 'vuex'
import Vue from 'vue'
import caseInfo from '@/store/modules/caseInfo'
import suspectInfo from '@/store/modules/suspectInfo'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		caseInfo: caseInfo,
		suspectInfo: suspectInfo,
	},
})
export default store
