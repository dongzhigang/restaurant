<!-- 下单菜单 -->
<template>
	<div class="myOrder">
		<div class="food_info">
			<div class="title">
				<span class="title_a">{{mainData.canteen_name}}</span>
				<img class="title_img" src="@/assets/icon/icon19.png">
			</div>
			<div class="time">{{mainData.create_time}}</div>
			<div class="btn">
				<span class="btn_a">就餐桌号：<label>{{mainData.desk_no}}</label></span>
				<span class="btn_a"><span v-if="mainData.discount_price != '0.00'">已优惠<label class="btn_a——jq">{{mainData.discount_price}}</label></span>应收金额：<label>{{mainData.should_pay}}</label></span>
			</div>
		</div>
		<div class="order_box">
			<div class="order_list">
				<div class="list_item">
					 <span>点餐日期</span>
					 <span class="item_b">{{time}}</span>
				</div>
				<div class="list_item">
					 <span>订单编号</span>
					 <span class="item_b">{{mainData.order_num}}</span>
				</div>
			</div>
		</div>
		<div class="record">我的菜单,共10条点菜记录</div>
		<!-- <div class="tabel tabel_active">
			<div class="tabel_name">加菜</div>
			<div class="tabel_title tabel_h">
				<div>商品</div>
				<div>
					<span>价格</span>
					<span>数量</span>
				</div>
			</div>
			<div class="tabel_row" v-if="mainData.food_list.length > 0">
				<div class="tabel_col tabel_h" v-for="(item,index) in mainData.food_list" :key="index">
					<div class="food_name tabel_col_add">{{item.food_name}}</div>
					<div class="col_clor">
						<span class="col_fs1">¥<label class="col_fs">{{item.price}}</label></span>
						<span class="tabel_col_add">x{{item.quantity}}</span>
					</div>
				</div>
			</div>
			<NoData v-else />
		</div> -->
		<div class="tabel">
			<div class="tabel_title tabel_h">
				<div>商品</div>
				<div>
					<span>价格</span>
					<span>数量</span>
				</div>
			</div>
			<div class="tabel_row" v-if="mainData.food_list.length > 0">
				<div class="tabel_col tabel_h" v-for="(item,index) in mainData.food_list" :key="index">
					<div class="food_name">{{item.food_name}}</div>
					<div class="col_clor">
						<div class="col_fs3" v-if="item.is_limited">限{{item.limited_num}}份</div>
						<div class="col_fs1">¥<label class="col_fs">{{item.is_limited?item.price:item.original_price}}</label></div>
						<div class="col_fs2 span_a" v-if="item.is_limited">¥{{item.original_price}}</div>
						<div class="col_fs4">x{{item.quantity}}</div>
					</div>
				</div>
			</div>
			<NoData v-else />
		</div>
	</div>
</template>
<script>
	import Wechat from "@/assets/wechat";
	import wx from 'weixin-js-sdk';
	import {orderDetail} from "@/api/template";
	import NoData from "@/components/common/noData";
	import {returnFloat} from "@/assets/common";
	export default{
		name:"MyOrderMenu",
		data(){
			return{
				order_id:"",	//订单id
				mainData:{
					canteen_name:"--",
					create_time:"--",
					desk_no:"--",
					should_pay:"--",
					time:"--",
					order_num:"--",
					food_list:[],
				},
				time:'',
			}
		},
		/**
		 * 组件模板
		 */
		components: {
	    	NoData,
	    },
		/**
		 * 事件函数
		 */
		methods:{
			//页面数据
			orderDetail(){
				let data = {
					order_id:this.order_id,
				}
				orderDetail(data).then((res)=>{
					console.log(res)
					if(res.data.code == 200){
						this.mainData = res.data.data;
						this.time = this.dateReplace(res.data.data.create_time);
					}
				}).catch(()=>{

				})
			},
			//日期替换-
			dateReplace(time){
				let array = time.split(" ");
				let arr = array[0].split("-");
				return arr[0] + "年" + arr[1] + "月" + arr[2] + "日" + array[1]
			},
			//微信内置地图
			openLocation(){
				let location = this.current_lng_lat.split(",");
				let that = this;
				Wechat();
				wx.ready(function(){// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					wx.openLocation({
						latitude: location[0], // 纬度，浮点数，范围为90 ~ -90
						longitude: location[1], // 经度，浮点数，范围为180 ~ -180。
						name: that.StoreData.canteen_name, // 位置名
						address: that.StoreData.address, // 地址详情说明
						scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
						infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
					});
				});
			},
		},
		/**
		 * 生命周期
		 */
		//创建完毕状态
		created(){
			this.order_id = this.$route.query.order_id || 231;
		},
		//挂载结束
		mounted(){
			document.title = '下单菜单';
			this.orderDetail()
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.myOrder{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		.food_info{
			width: 100%;
			background: #fff;
			padding:0 (27px/$px) + rem;
			box-sizing: border-box;
			display: flex;
			flex-flow: column;
			.title{
				width: 100%;
				height: (100px/$px) + rem;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.title_a{
					font-size: (36px/$px) + rem;
					color: #333;
					font-weight: bold;
				}
				.title_img{
					width: (41px/$px) + rem;
					height: (54px/$px) + rem;
				}
			}
			.time{	
				font-size: (24px/$px) + rem;
				color: #000;
				display: flex;
				align-items: center;
				font-family:SourceHanSansCN-Normal;
			}
			.btn{
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				font-size: (24px/$px) + rem;
				color: #333;
				margin-top: (20px/$px) + rem;
				margin-bottom: (28px/$px) + rem;
				.btn_a{
					display: flex;
					align-items: center;
					font-size: (28px/$px) + rem;
					label{
						color: #FF9000;
						font-size: (38px/$px) + rem;
						&.btn_a——jq{
							font-size: (30px/$px) + rem;
							margin-right: (10px/$px) + rem;
						}
					}
				}
			}
		}
		.order_box{
			padding-top: (15px/$px) + rem;
			background: #F0EFF4;
			.order_list{
				width: 100%;
				height: (144px/$px) + rem;
				padding:0 (30px/$px) + rem;
				box-sizing: border-box;
				background: #fff;
				.list_item{
					width: 100%;
					height: (60px/$px) + rem;
					font-size: (28px/$px) + rem;
					color: #BABABA;
					display: flex;
					align-items: center;
					.item_b{
						color: #000;
						margin-left: (90px/$px) + rem;
						font-size: (26px/$px) + rem;
					}
				}
			}
		}
		.record{
			background: #F0EFF4;
			font-size: (30px/$px) + rem;
			color: #333;
			width: 100%;
			height: (80px/$px) + rem;
			padding:0 (30px/$px) + rem;
			box-sizing: border-box;
			display: flex;
			align-items: center;
		}
		.tabel_active{
			margin-bottom: (20px/$px) + rem;
			.tabel_name{
				height: (80px/$px) + rem;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FF9000;
				font-size: (36px/$px) + rem;
				font-weight: bold;
			}
		}
		.tabel{
			width: 100%;
			padding:0 (30px/$px) + rem;
			background: #fff;
			box-sizing: border-box;
			text-align: left;
			flex-flow: column;
			justify-content: space-around;
			.tabel_h{
				width: 100%;
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				span{
					display: inline-block;
					text-align: right;
					width: (100px/$px) + rem;
					// &.span_a{
					// 	width: (300px/$px) + rem;
					// }
				}
			}
			.tabel_title{
				font-size: (26px/$px) + rem;
				color: #999;
				height: (60px/$px) + rem;
			}
			.tabel_row{
				width: 100%;
				.tabel_col_add{
					color: #FF9000;					
				}
				.tabel_col{
					font-size: (30px/$px) + rem;
					font-weight: bold;
					color: #000;
					height: (80px/$px) + rem;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.food_name{
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						padding-right: (30px/$px) + rem;
						box-sizing: border-box;
					}
					.col_clor{
						color: #333333;
						display: flex;	
						align-items: center;
						justify-content: flex-end;					
					}
					.col_fs{
						font-size: (33px/$px) + rem;
						color: #FF9000;
					}
					.col_fs1{
						color: #FF9000;
					}
					.col_fs2{
						font-size: (24px/$px) + rem;
						color: #9A9A9A;
						text-decoration: line-through;
						margin:0 (5px/$px) + rem;
					}
					.col_fs3{
						font-size: (24px/$px) + rem;
						color: #FF9000;
						margin-right: (10px/$px) + rem;
					}
					.col_fs4{
						width: (50px/$px) + rem;
						display: flex;
						justify-content: flex-end;
						color: #FF9000;
					}
				}
			}
		}
	}
</style>