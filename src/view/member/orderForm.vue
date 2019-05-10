<template>
	<div class="main">
		<div class="list" v-if="dataList.has_exchanged">
			<router-link :to="'/member/orderFormDetail?order_id='+item.order_id" class="list_item" v-for="(item,index) in dataList.has_exchanged" :key="index">
				<img :src="item.coupon_image" class="itme_img" />
				<div class="iitem_fr">
					<div class="fr_title">{{item.coupon_name}}</div>
					<div class="fr_text">有效期:{{item.use_date}}</div>
					<div class="fr_text fr_br">不可与其他卡券同时使用，每张单仅限用一次。</div>
					<div class="fr_text">兑换日期:{{item.exchange_time}}</div>
				</div>
			</router-link>
		</div>
		<!-- 没有数据 -->
		<div class="noData" v-else>
			<div class="container">
				<span class="container_t">您暂无购买的优惠</span>
				<span class="container_b"><router-link to="/goods/goodsList">逛逛商城</router-link></span>
			</div>
		</div>
		<div class="goods" v-if="dataList.hot_sale">
			<div class="title">热销排行</div>
			<div class="list">
				<div class="list_item" v-for="(item,index) in dataList.hot_sale" :key="index">
					<router-link :to="'/goods/goodsDetail?coupon_id='+item.coupon_id">
						<img :src="item.coupon_image">
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {orderList} from "@/api/member";
	export default{
		name: "OrderForm",
		data() {
			return{
				dataList:[],
			}
		},
		/**
		 * 组件模板
		 */
		components: {
	    },
		/**
		 * 事件函数
		 */
		 methods:{
		 	//列表数据
		 	orderList(){
				let data = {user_id:this.$store.state.appCommon.user_id}
		 		orderList(data).then((res)=>{
		 			if(res.data.code == 200)
		 			{
						 console.log(res.data)
		 				this.dataList = res.data.data
		 			}
		 		})
		 	}
		 },
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		 //挂载结束
		mounted(){
			this.orderList();
		},
		activated(){
			document.title = '兑换订单';
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		background: #F0EFF4;
		.list{
			width: 100%;
			padding:(20px/$px) + rem (30px/$px) + rem;
			box-sizing: border-box;
			.list_item{
				width: 100%;
				background: #fff;
				height: (215px/$px) + rem;
				margin-bottom: (20px/$px) + rem;
				border-radius: (5px/$px) + rem;
				overflow: hidden;
				display: flex;
				flex-direction: row;
				.itme_img{
					width: (290px/$px) + rem;
					height: (215px/$px) + rem;
				}
				.iitem_fr{
					width: (400px/$px) + rem;
					height: (215px/$px) + rem;
					padding: (5px/$px) + rem (10px/$px) + rem;
					box-sizing: border-box;
					display: flex;
					flex-flow: column;
					justify-content: space-between;
					.fr_title{
						color: #FF9000;
						font-size: (30px/$px) + rem;
						display: flex;
               			width: 100%;
						// .fr_title——font{
						// 	font-size: (32px/$px) + rem;
						// 	font-weight: bold;
						// }
					}
					.fr_text{
						color: #AAAAAA;
						font-size: (22px/$px) + rem;
					}
					.fr_br{
						border-bottom: solid 1px #E4E4E4;
						padding-bottom: (5px/$px) + rem;
						font-size: (20px/$px) + rem;
					}
				/*	.fr_ab{
						position: absolute;
						top: (60px/$px) + rem;
						right: (20px/$px) + rem;
					}*/
				}

			}
		}
		.tabRow{
			width: 100%;
			background: #fff;
			display: flex;
			.tabCol{
				width: 50%;
				height: (80px/$px) + rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: (30px/$px) + rem;
				&.active{
					border-bottom: solid (4px/$px) + rem #FF9000;
				}
			}
		}
		.noData{
			width: 100%;
			padding: (20px/$px) + rem (30px/$px) + rem;
			box-sizing: border-box;
			.container{
				width: 100%;
				background: #fff;
				border-radius: (10px/$px) + rem;
				display: flex;
				align-items: center;
				flex-flow: column;
				justify-content: center;
				padding: (45px/$px) + rem 0;
				font-size: (30px/$px) + rem;
				.container_t{
					color: #BFBFBF;
					margin-bottom: (30px/$px) + rem;
				}
				.container_b{
					width:(220px/$px) +rem; 
					height: (60px/$px) + rem;
					background: #FF9000;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: (30px/$px) + rem;
					a{
						color: #fff;
					}
				}
			}
		}
		.goods{
			width: 100%;
			background: #fff;
			border-top-left-radius: (5px/$px) + rem;
			border-top-right-radius: (5px/$px) + rem;
			.title{
				font-size: (30px/$px) + rem;
				height: (80px/$px) + rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.list{
				width: 100%;
				padding: 0 (30px/$px) + rem;
				box-sizing: border-box;
				.list_item{
					width: 100%;
					border-radius: (20px/$px) + rem;
					overflow: hidden;
					margin-bottom: (30px/$px) + rem;
				}
			}
		}
	}
	
</style>