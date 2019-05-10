const app = {
	state:{
		hasMsg:false,		//判断提示组件显示隐藏this.$store.state.appCommon.hasMsg = true;this.$store.dispatch('hasMsg');
		ImageFull:false,	//判断图片是否全屏	
		user_id:JSON.parse(localStorage.getItem("user"))?JSON.parse(localStorage.getItem("user")).user_id:"",			//用户id'
		phone:JSON.parse(localStorage.getItem("user"))?JSON.parse(localStorage.getItem("user")).phone:"",			//用户手机
	},
	mutations:{
		hasMsg(state){
			state.hasMsg = !state.hasMsg
		},
		ImageFull(state){
			state.ImageFull = !state.ImageFull
		},
		updateUserId(state, userId) {
			state.user_id = userId
		},
		updatePhone(state, phone) {
			state.phone = phone
		}
	},
	actions: {
		hasMsg ({ commit }) {
			setTimeout(() => {
				commit('hasMsg')
		    }, 1000)
		},
		ImageFull ({ commit }) {
			commit('ImageFull');
		},
	}
}

export default app;
