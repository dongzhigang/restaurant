<template>
	<div class="orderDetail">
		<div class="orderDetail_img">
			<img :src="detailsData.coupon_image">
		</div>
		<div class="orderDetail_content">
			<div class="orderDetail_title">{{detailsData.coupon_name}}</div>
			<div class="orderDetail_docs">订单状态:兑换成功</div>
		</div>
		<div class="orderDetail_btn">
			<div class="orderDetail_btn_item">
				<span>购券积分:</span>
				<span class="orderDetail_btn——gray">{{detailsData.exchange_name}}</span>
			</div>
			<div class="orderDetail_btn_item">
				<span>订单编号:</span>
				<span class="orderDetail_btn——gray">{{detailsData.order_num}}</span>
			</div>
			<div class="orderDetail_btn_item">
				<span>下单时间:</span>
				<span class="orderDetail_btn——gray">{{detailsData.create_time}}</span>
			</div>
		</div>
		<div class="orderDetail_but">
			<router-link class="orderDetail_but_a" :to="'/scanCode/takingOrderDetails?food_id='+detailsData.food_id">查看商品详情</router-link>
		</div>
	</div>
</template>
<script>
	import {orderDetail} from "@/api/member";
	export default{
		name:'OrderFormDetail',
		data(){
			return{
				order_id:1,
				detailsData:{},
			}
		},
		/**
		 * 事件
		 */
		methods:{
			//数据
			orderDetail(){
				let data = {
					order_id:this.order_id
				}
				orderDetail(data).then((res)=>{
					console.log(res)
					this.detailsData = res.data.data
				})
			}
		},
		/**
		 * 生命周期
		 */
		//创建完毕状态
		created(){
			this.order_id = this.$route.query.order_id
		},
		//挂载结束
		mounted(){
			document.title = '订单详情';
			this.orderDetail()
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.orderDetail{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		padding:(20px/$px) + rem (30px/$px) + rem;
		box-sizing: border-box;
		.orderDetail_img{
			width: 100%;
			height: (365px/$px) + rem;
			border-top-left-radius: (15px/$px) + rem;
			border-top-right-radius: (15px/$px) + rem;
			overflow:hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.orderDetail_content{
			width: 100%;
			height: (180px/$px) + rem;
			background: #fff;
			padding:0 (20px/$px) + rem;
			box-sizing: border-box;
			display: flex;
			justify-content: space-around;
			flex-flow: column;
			.orderDetail_title{
				font-size: (36px/$px) + rem;
				color: #1A1A1A;
				font-weight: bold;
				display: flex;
				align-items: center;
			}
			.orderDetail_docs{
				font-size: (24px/$px) + rem;
				color: #AAAAAA;
			}
		}
		.orderDetail_btn{
			width: 100%;
			margin-top: (25px/$px) + rem;
			padding: (20px/$px) + rem;
			box-sizing: border-box;
			background: #fff;
			border-bottom-left-radius: (10px/$px) + rem;
			border-bottom-right-radius: (10px/$px) + rem;
			.orderDetail_btn_item{
				width: 100%;
				height: (48px/$px) + rem;
				display: flex;
				align-items: center;
				font-size: (24px/$px) + rem;
				color: #AAAAAA;
			}
			.orderDetail_btn——gray{
				font-size: (26px/$px) + rem;
				color: #1A1A1A;
				margin-left: (20px/$px) + rem;
			}
		}
		.orderDetail_but{
			width: 100%;
			margin-top: (64px/$px) + rem;
			display: flex;
			justify-content: center;
			.orderDetail_but_a{
				width: (655px/$px) + rem;
				height: (82px/$px) + rem;
				background: #FF9000;
				border-radius: (41px/$px) + rem;
				color: #fff;
				font-size: (30px/$px) + rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>