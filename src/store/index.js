import Vue from 'vue'
import vuex from 'vuex'
import appCommon from './modules/appCommon'
import getters from './getters'
Vue.use(vuex);
var store = new vuex.Store({//store对象
    modules: {
    	appCommon,
    },
    getters
})
export default store