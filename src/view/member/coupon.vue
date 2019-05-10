<!-- 优惠卷 -->
<template>
	<div class="main">
		<div class="list">
			<div class="list_item" :class="index==0?'active':''" @click="tabIndex
			(0)">未使用({{unusedData.length}}张)</div>
			<div class="list_item" :class="index==1?'active':''" @click="tabIndex
			(1)">已使用({{employData.length}}张)</div>
			<div class="list_item" :class="index==2?'active':''" @click="tabIndex
			(2)">已失效({{loseEfficacyData.length}}张)</div>
		</div>
		<keep-alive>
			<Unused v-if="index==0" :dataList="unusedData" />
			<Employ v-else-if="index==1" :dataList="employData" />
			<LoseEfficacy v-else :dataList="loseEfficacyData" />
		</keep-alive>
	</div>
</template>
<script>
	import Unused from "@/components/coupon/unused"
	import Employ from "@/components/coupon/employ"
	import LoseEfficacy from "@/components/coupon/loseEfficacy"
	import {myCoupon} from "@/api/member";
	export default{
		name: "Coupon",
		data() {
			return{
				index:0,
				unusedData:[],		//未使用
				employData:[],		//已使用
				loseEfficacyData:[],	//已失效
			}
		},
		/**
		 * 事件函数
		 */
		methods:{
			//切换
			tabIndex(index) {
				this.index = index;
				//判断是否有缓冲数据
				if(!this.unusedData.length > 0){
					this.myCoupon(this.index);
				}else if(!this.employData.length){
					this.myCoupon(this.index);
				}else if(!this.loseEfficacyData.length>0){
					this.myCoupon(this.index);
				}
			},
			//优惠卷数据
			myCoupon(index){
				for(let i=index;i<3;i++){
					let data = {
						used_status:i + 1,
						user_id:this.$store.state.appCommon.user_id,
					}
					myCoupon(data).then((res)=>{
						if (res.data.code == 200) {
							switch(i){
								case 0:
									this.unusedData = res.data.data
									break;
								case 1:
									this.employData = res.data.data
									break;
								case 2:
									this.loseEfficacyData = res.data.data
									break;
							}
						}
					})
				}
			}
		},
		
		/**
		 * 组件模板
		 */
		components: {
			Unused,
			Employ,
			LoseEfficacy,
		},

		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		mounted(){
			document.title = '我的优惠卷';
			this.myCoupon(this.index);
		},
		activated(){
			document.title = '我的优惠卷';
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		position: relative;
		z-index: 1;
		.list{
			width: 100%;
			background: #fff;
			height: (70px/$px) + rem;
			border-bottom: solid 1px #E2E1E6;
			display: flex;
			align-items: center;
			.list_item{
				width: 33.33%;
				height: (70px/$px) + rem;
				line-height:  (70px/$px) + rem;
				color: #1A1A1A;
				font-size: (28px/$px) + rem;
				display: flex;
				justify-content: center;
				&.active{
					border-bottom: solid (4px/$px) + rem #FF9000;
				}
			}
		}
	}
</style>