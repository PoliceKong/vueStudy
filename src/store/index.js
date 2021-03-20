import Vuex from 'vuex'
import Vue from 'vue'
import caseInfo from '@/store/modules/caseInfo'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		caseInfo,
	},
})
export default store
