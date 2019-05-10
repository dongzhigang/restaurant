<template>
	<div class="main">
		<div class="menu_box">
			<div class="menu_rows">
				<div class="rows_col">
					<span class="rows_col——w">我在<b>{{desk_no}}</b>桌</span>
					<div class="rows_col——ab col——w">
						<router-link :to="'/scanCode/takingOrder?canteen_id='+canteen_id+'&desk_no=1'+desk_no">+加菜</router-link>
					</div>
				</div>
				<div class="rows_col">
					<span>共: <b class="rows_col——color">{{count}}</b>道菜</span>
					<div class="rows_col——ab">
						<div class="rows_col_yh">已优惠<label>¥{{discountsSum}}</label>合计 ¥<b>{{total}}</b>元</div>
					</div>
				</div>
			</div>
			<div class="menu_list" v-if="muneListData.length>0">
				<div class="list_itme" v-for="(item,index) in muneListData" :key="index" @touchstart="touchstart" @touchmove="touchmove">
					<img src="@/assets/tem/tem06.png" class="fl_img">
					<div class="fl_msg">
						<div class="fl_title">
							<span>{{item.food_name}}</span>
							<div class="item_fr">
								<span class="fr_a" v-if="item.is_limited">¥{{item.original_price}}</span>
								<span class="fr_b" >¥<b>{{item.is_limited?item.current_price:item.original_price}}</b></span>
							</div>
						</div>
						<div class="fl_num">
							<span>x{{item.quantity}}</span>
							<span class="limit" v-if="item.is_limited">{{item.discount}}折/限{{item.limited_num}}份</span>
							<span class="fl_num_b" v-if="item.coupon_order_id">已使用优惠券抵扣</span>
						</div>
					</div>
					<!-- <div class="item_fr">
						<span class="fr_a">¥{{item.original_price}}</span>
						<span class="fr_b">¥<b>{{item.current_price}}</b></span>
					</div> -->
					<div class="item_del" @click="menuFoodDelete(index,item.menu_id)">删除</div>
				</div>
			</div>
			<div class="menu_no" v-else>没有菜单,请<router-link :to="'/scanCode/takingOrder?desk_no='+desk_no+'&canteen_id='+canteen_id" >重新点菜</router-link></div>
			{{url}}
			<div class="menu_bt">
				<div class="bt_box" @click="confirmOrder">确认下单</div>
			</div>
		</div>
		<!-- 弹窗 -->
		<div class="dialog" v-if="hasDialog">
			<div class="dialog_msg">
				<img src="@/assets/icon/cgxd.png" class="dialog_img">
				<span>菜品已成功下单</span>
			</div>
		</div>
		<!-- 加载loading组件 -->
		<Loading v-if="!isLoad" />
		<!-- 提示组件 -->
		<HintMsg :hintMsg="msg" v-if="hasMsg" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import {menuList,menuFoodDelete,orderCreate,menuOrderPay,menuOrderResult} from "@/api/scanCode";
	import {returnFloat} from "@/assets/common";
	import HintMsg from "@/components/common/hintMsg";
	import Loading from "@/components/common/loading";
	// import { setTimeout } from 'timers';
	import wx from 'weixin-js-sdk';
import { setTimeout } from 'timers';
	export default{
		inject:['reload'],
		name:"MyMenu",
		data() { 
			return{
				hasDialog:false,
				canteen_id:"",			//店铺id
				desk_no:"",				//餐桌号
				muneListData:[],	//菜单列表
				total:0,	//总价
				discountsSum:0,	//优惠金额
				count:0,	//数量
				isLoad:false,//判断是否有数据,true是加载完成，false是加载中
				msg:'',
				url:"",
			}
		},
		/**
	     * 计算属性
	     */
	    computed: {
	    	...mapGetters([
		      'hasMsg',     // ...
		    ])
		},
		/**
		 * 组件模板
		 */
		components: {
	    	Loading,
	    	HintMsg,
	    },
		/**
		 * 事件函数
		 */
		methods:{
			//菜单列表
			menuList(){
				let data = {
					canteen_id:this.canteen_id,
					user_id:this.$store.state.appCommon.user_id
				}
				menuList(data).then((res)=>{
					let total=0,count=0,total_price=0;
					if (res.data.code == 200) {
						this.isLoad = true;
						this.muneListData = res.data.data;
						res.data.data.map((v,i,arr)=>{
							if(v.coupon_order_id){ //优惠
								//限制份数。超过的份数用原价
								if(v.is_limited){
									if(v.quantity > v.limited_num){
										total = parseFloat(returnFloat(total)) + parseFloat(v.current_price)*v.limited_num + parseFloat(v.original_price)*(v.quantity - 1 -v.limited_num);
									}else{
										total = parseFloat(returnFloat(total)) + parseFloat(v.current_price)*(v.quantity - 1);
									}
								}else{
									total = parseFloat(returnFloat(total)) + parseFloat(v.original_price)*(v.quantity - 1);
								}
							}else{	//总计
								//限制份数。超过的份数用原价
								if(v.is_limited){
									if(v.quantity > v.limited_num){
										total = parseFloat(returnFloat(total)) + (parseFloat(v.original_price)*(v.quantity - v.limited_num) + parseFloat(v.current_price)*v.limited_num);
									}else{
										total = parseFloat(returnFloat(total)) + parseFloat(v.current_price)*v.limited_num;
									}
								}else{
									total = parseFloat(returnFloat(total)) + parseFloat(v.original_price)*v.quantity;
								}
							}
							count += v.quantity;
							//总计
							total_price = parseFloat(returnFloat(total_price)) + parseFloat(v.original_price)*v.quantity;
						})
						let discountsSum = parseFloat(total_price) - parseFloat(total);
						this.count = count
						this.total = returnFloat(total);	//实计
						this.discountsSum = returnFloat(discountsSum);
					}else{
						this.isLoad = true;
					}
				}).catch(()=>{
					this.$router.push({name:"LoadFail"});
				})
			},
			//当手指触摸屏幕时触发
			touchstart(event){
				this.startX = event.changedTouches[0].pageX;
			},
			//当手指在屏幕上滑动时
			touchmove(event){
				this.endX = event.changedTouches[0].pageX;
				let that = event.currentTarget;
				let child = that.lastChild;
				let childW = child.clientWidth;
				if(this.endX - this.startX > 0){//向右滑
					that.style.marginLeft = "0px";
				}else{//向左滑
					if(Math.abs(this.endX - this.startX) > childW){
						that.style.marginLeft = -childW + "px";
					}
				}
			},
			//删除菜单
			menuFoodDelete(index,id){
				let data = {
					menu_id:id
				}
				menuFoodDelete(data).then((res)=>{
					if(res.data.code == 200){
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
						setTimeout(()=>{
							this.reload();
						},1000)
					}else{
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
					}
				}).catch(()=>{
					
				})
			},
			//确认下单,创建订单
			confirmOrder(){
				let data= {
					user_id:this.$store.state.appCommon.user_id,
					order_price:this.total,			//订单价格 (保留两位小数)
					canteen_id:this.canteen_id,			//餐厅Id
					desk_no:this.desk_no,				//餐桌号
					food_list:this.muneListData,			//菜品列表
					discount_price:this.discountsSum,
				}
				// console.log(data);
				// return;
				if(!this.muneListData.length){//判断有没有菜品
					this.msg = "请去添加菜";
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
					return false;
				}
				orderCreate(data).then((res)=>{
					if(res.data.code == 200){
						this.order_id = res.data.data.order_id
						this.order_num = res.data.data.order_num
						//创建订单成功，调用支付接口
						this.menuOrderPay();
						// setTimeout(function(){
						// 	this.$router.push({name:"MyOrderMenu",query:{order_id:res.data.data.order_id}})
						// }.bind(this),1000)
					}else{
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
					}
				})
			},
			//支付接口
			menuOrderPay(){
				let data = {
					price:this.total,		//订单总价
					order_id:this.order_id,	//订单id
					order_num:this.order_num,	//订单编号
					openid:JSON.parse(localStorage.getItem("user")).openid,		//openid
				}
				let that = this;
				menuOrderPay(data).then((res)=>{
					if(res.data == "401"){
						this.msg = "参数有误";
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
					}else if(res.data == "402"){
						this.msg = "订单已支付，请勿重复操作！";
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
					}else{
						if (typeof WeixinJSBridge == "undefined"){
							if( document.addEventListener ){
								document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
							}else if (document.attachEvent){
								document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
								document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
							}
						}else{
							//调用微信支付api
							this.jsApiParameters = res.data;
							onBridgeReady();
						}
					}
				}).catch(()=>{
					this.msg = "提交出错，请联系管理员处理";
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
				})
				//调用微信支付api
				let onBridgeReady = ()=>{
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest',
						that.jsApiParameters,
						function(res){
							if(res.err_msg == "get_brand_wcpay_request:ok" ){
								// 使用以上方式判断前端返回,微信团队郑重提示：
								//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
								//订单支付成功更新（更新订单状态,更新用户增加积分，推送模板消息）
								let data1 = {
									order_id:that.order_id,	//订单id
									openid:JSON.parse(localStorage.getItem("user")).openid,		//openid
									pay_result:1,
									price:that.total,
								}
								//付款成功，跳转到订单详情
								that.$router.push({name:"MyOrderMenu",query:{order_id:that.order_id}})
								that.menuOrderResult(data1)
							}else{
								that.msg = "支付失败";
								that.$store.state.appCommon.hasMsg = true;
								that.$store.dispatch('hasMsg');
								let data2 = {
									order_id:that.order_id,	//订单id
									openid:JSON.parse(localStorage.getItem("user")).openid,		//openid
									pay_result:2,
									fail_msg:res.errMsg
								}
								that.menuOrderResult(data2)
								//支付失败，返回上一页
								setTimeout(function(){
									that.$router.go(-1);
								},1000)
							}
						}
					);
				}
			},
			//订单支付结果更新,支付成功或失败都调用
			menuOrderResult(data){
				menuOrderResult(data).then((res)=>{
					// if(res.data.code == 200){
					// 	this.msg = res.data.msg;
					// 	this.$store.state.appCommon.hasMsg = true;
					// 	this.$store.dispatch('hasMsg');
					// }else{
					// 	this.msg = "订单异常，请联系技术人员!";
					// 	this.$store.state.appCommon.hasMsg = true;
					// 	this.$store.dispatch('hasMsg');
					// }
				})
			},
		},
		/**
		 * 生命周期
		 */
		//挂载结束
		mounted(){
			document.title = '我的菜单';
			this.desk_no = this.$route.query.desk_no ;  //餐桌号
			this.canteen_id = this.$route.query.canteen_id ;	//店铺id
			this.menuList();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		position: relative;
		.menu_box{
			width: 100%;
			padding:0 (10px/$px) + rem; 
			padding-top: (30px/$px) + rem;
			padding-bottom: (105px/$px) + rem;
			box-sizing: border-box;
			.menu_rows{
				width: 100%;
				background: #fff;
				border-radius: (10px/$px) + rem;
				.rows_col{
					border-bottom: solid 1px #E2E1E6;
					height: (80px/$px) + rem;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 0 (20px/$px) + rem;
					box-sizing: border-box;
					color: #1A1A1A;
					font-size: (26px/$px) + rem;
					position: relative;
					.rows_col——w{
						width: 100%;
						color: #9A9A9A;
						display: flex;
						align-items: center;
						b{
							color: #1A1A1A;
							width: (58px/$px) + rem;
							height: (31px/$px) + rem;
							border: solid 1px #E2E1E6;
							border-radius: (16px/$px) + rem;
							display:flex;
							align-items: center;
							justify-content: center;
							margin:0 (5px/$px) + rem;
						}
					}
					label{
						margin-right: (20px/$px) + rem;
						color: #FF9000;
					}
					.rows_col——color{
						color: #FF9000;
						border: none;
						width: auto;
					}
					.rows_col——ab{
						.rows_col_yh{
							color: #1A1A1A;
							b{
								font-size: (30px/$px) + rem;
							}
						}
						&.col——w{
							width: (110px/$px) + rem;
							text-align: right;
						}
						span{
							width: 100%;
							height: (56px/$px) + rem;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #FF9000;
							border-radius: (16px/$px) + rem;
							border:solid 1px #E2E1E6;
						}
						a{
							color: #FF9000;
						}
					}
				}
			}
			.menu_list{
				width: 100%;
				background: #fff;
				margin-top: (26px/$px) + rem;
				overflow:hidden;
				.list_itme{
					width: 100%;
					padding: (14px/$px) +rem (20px/$px) +rem;
					box-sizing: border-box;
					border-bottom: solid 1px #E2E1E6;
					display: flex;
					flex-direction: row;
					height: (130px/$px) + rem;
					box-sizing: border-box;
					transition:all 1s;
					position: relative;
					.fl_img{
						width: (132px/$px) + rem;
						height: (105px/$px) + rem;
						border-radius: (6px/$px) + rem;
						overflow: hidden;
					}
					.fl_msg{
						width: 100%;
						padding-left: (22px/$px) +rem;
						.fl_title{
							font-size: (26px/$px) + rem;
							color: #1A1A1A;
							width: 100%;
							height: (50px/$px) + rem;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							.item_fr{
								display: flex;
								align-items: center;
								.fr_a{
									font-size: (24px/$px) + rem;
									color: #9A9A9A;
									text-decoration: line-through;
								}
								.fr_b{
									font-size: (24px/$px) + rem;
									color: #1A1A1A;
									margin-left: (30px/$px) + rem;
									b{
										font-size: (30px/$px) + rem;
									}
								}
							}
						}
						.fl_num{
							font-size: (24px/$px) + rem;
							color: #ACABB1;
							height: (40px/$px) + rem;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							.limit{
								font-size: (20px/$px) + rem;
								color: #FF9000;
							}
							.fl_num_b{
								font-size: (24px/$px) + rem;
								color: #FF9000;
							}
						}
					}					
					.item_del{
						position: absolute;
						top: 0;
						right: -(130px/$px) + rem;
						width: (130px/$px) + rem;
						height: (130px/$px) + rem;
						background: #FF0000;
						color: #fff;
						font-size: (30px/$px) + rem;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
			.menu_no{
				width: 100%;
				font-size: (30px/$px) + rem;
				margin-top: (200px/$px) + rem;
				display: flex;
				align-items: center;
				justify-content: center;
				a{
					color: red;
				}
			}
			.menu_bt{
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				height: (105px/$px) + rem;
				padding: 0 (10px/$px) + rem;
				box-sizing: border-box;
				.bt_box{
					width: 100%;
					height: (83px/$px) + rem;
					font-size: (30px/$px) + rem;
					color:#fff;
					background: #FF9000;
					border-radius: (10px/$px) + rem;
					height: (83px/$px) + rem;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		.dialog{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.dialog_msg{
				width: (530px/$px) + rem;
				height: (290px/$px) + rem;
				border-radius: (10px/$px) + rem;
				background:rgba(0,0,0,0.6);
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: column;
				font-size: (34px/$px) + rem;
				color: #fff;
				.dialog_img{
					width: (132px/$px) + rem;
					height: (131px/$px) + rem;
				}
				span{
					line-height: (80px/$px) + rem;
				}
			}
		}
	}
</style>