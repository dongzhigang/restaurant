<!-- 我的积分-积分支出 -->
<template>
	<div class="list">
		<div class="item" v-for="(item,index) in scoreEarn" :key="index">
			<img :src="item.coupon_image" class="item_img">
			<div class="item_info">
				<div class="item_lt">
					<div class="title">{{item.coupon_name}}</div>
					<div class="item_lt_a number">订单编号: {{item.order_num}}</div>
					<div class="item_lt_a">日期: {{item.create_time}}</div>
				</div>
				<!-- <div class="item_rt"><img src="@/assets/icon/icon14.png"></div> -->
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			scoreEarn:Array
		},
		name: "IntegralExpend",
		data(){
			return{

			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.list{
		width: 100%;
		padding: 0 (30px/$px) + rem;
		box-sizing: border-box;
		.item{
			width: 100%;
			margin-top: (20px/$px) + rem;
			background: #fff;		
			height: (150px/$px) + rem;
			border-radius: (10px/$px) + rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			overflow:hidden;
			.item_img{
				width: (290px/$px) + rem;
				height: (150px/$px) + rem;
			}
			.item_info{
				height: px2rem(150px);
				display:flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				padding: 0 (20px/$px) + rem;
				box-sizing: border-box;
				.item_lt{
					height: (150px/$px) + rem;					
					padding: (5px/$px) + rem 0;
					box-sizing: border-box;
					display: flex;
					flex-flow: column;
					justify-content: space-around;
					text-align: left;
					.title{
						width: 100%;
						font-size: (30px/$px) + rem;
						color: #FF9000;
						font-weight: bold;
						span{
							font-size: (24px/$px) + rem;
							color: #1A1A1A;
						}
					}
					.item_lt_a{
						width: 100%;
						font-size: (22px/$px) + rem;
						color: #AAAAAA;
					}
					.number{
						border-bottom: solid 1px #F0EFF4;
					}
				}
				.item_rt{
					display: flex;
					align-items: center;
					padding-right: (10px/$px) + rem;
					width: (18px/$px) + rem;
					height: (30px/$px) + rem;
				}
			}
		}
	}
</style>