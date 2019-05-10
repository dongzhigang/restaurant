<!-- 我的积分-积分获取 -->
<template>
	<div>
		<div class="list" v-for="(item,index) in scoreEarn" :key="index">
			<div class="list_item">餐厅:{{item.canteen_name}}</div>
			<div class="list_item list_item——active">
				<div class="list_item_fr">
					<span class="list_item_span">消费总额:<b class="list_item——color">¥{{item.money_cost}}</b></span>
					<span class="list_item_span">获得积分:<b class="list_item——color">{{item.earn_points}}</b></span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			scoreEarn:Array
		},
		name: "IntegralAcquire",
		data(){
			return{
			}
		},
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		mounted(){
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.list{
		width: 100%;
		background: #fff;
		padding: 0 (30px/$px) + rem;
		box-sizing: border-box;
		display: flex;
		border-bottom: solid 1px #F0EFF4;
		&:last-child{
			border-bottom:none;
		}
		.list_item{
			width: 50%;
			font-size: (26px/$px) + rem;
			text-align: left;
			padding:(10px/$px) + rem 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			&.list_item——active{
				padding-left: (50px/$px) + rem;
			}
			.list_item_fr{
				width: 100%;
				.list_item_span{
					width: 100%;
					display: block;
					.list_item——color{
						color: #FF9000
					}
				}
			}
		}
	}
</style>