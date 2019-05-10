<template>
	<div class="main">
		<div class="rows">
			<div class="rows_col " :class="colIndex == 0?'active':''" @click="tabIndex(0)">积分获取</div>
			<div class="rows_col" :class="colIndex == 1?'active':''" @click="tabIndex(1)">积分支出</div>
		</div>
		<div class="tabList" v-if="colIndex==0?scoreEarnData.length:scoreUsedData.length">
			<IntegralAcquire v-if="colIndex == 0" :score-earn="scoreEarnData" />
			<IntegralExpend v-else :score-earn="scoreUsedData" />
		</div>
		<div class="noData" v-else>暂无数据记录</div>
	</div>
</template>
<script>
	import {scoreEarn,scoreUsed} from "@/api/member";
	import IntegralAcquire from "@/components/integral/integralAcquire"
	import IntegralExpend from "@/components/integral/integralExpend"
	export default{
		name: "Detail",
		data() {
			return{
				hasData:true,
				colIndex:0,
				//积分数据
				scoreEarnData:[],
				scoreUsedData:[],
			}
		},
		/**
		 * 事件函数
		 */
		methods:{
			tabIndex(index) {
				this.colIndex = index
				
			},
			//积分获取
			scoreEarn(){
				let data = {user_id:this.$store.state.appCommon.user_id}
				scoreEarn(data).then((res)=>{
					if(res.data.code == 200){
						this.scoreEarnData = res.data.data
						// 	
					}
				}).catch(()=>{

				})
			},
			//积分支出
			scoreUsed(){
				let data = {user_id:this.$store.state.appCommon.user_id}
				scoreUsed(data).then((res)=>{
					if(res.data.code == 200){
						this.scoreUsedData = res.data.data
					}
				}).catch(()=>{

				})
			}
		},
		/**
		 * 组件模板
		 */
		components: {
			IntegralAcquire,
			IntegralExpend
	    },
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		mounted(){
			document.title = '积分明细';
			this.scoreEarn();
			this.scoreUsed();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";
	
	.main{
		width: 100%;
		background: #F0EFF4;
		.rows{
			position: relative;
			width: 100%;
			height: (80px/$px) + rem;
			display: flex;
			background: #fff;
			border-bottom: solid 1px #F0EFF4;
			z-index: 2;
			.rows_col{
				width: 50%;
				font-size: (30px/$px) + rem;
				text-align: center;
				line-height: (80px/$px) + rem;
				&.active{
					border-bottom: solid (4px/$px)+rem #FF9000;
				}
				a{
					display: block;
					color: #000;
				}
			}
		}
		.tabList{
			width: 100%;
			z-index: 2;
		}
		.noData{
			position: fixed;
			z-index: 1;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			font-size: (30px/$px) + rem;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #AFAFAF;
		}
	}
</style>