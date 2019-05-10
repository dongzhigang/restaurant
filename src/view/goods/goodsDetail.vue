<template>
	<div class="main">
		<div class="banner">
			<img :src="dataObj.coupon_image">			
		</div>
		<div class="content">
			<div class="detail">
				<div class="top">
					<div class="title">{{dataObj.coupon_name}}</div>
					<div class="top_number">
						<span class="top_number——font">{{dataObj.sale_bp}}</span>
						<span>积分 </span>
						<span  v-if="dataObj.sale_price" class="top_number——font">+{{dataObj.sale_price}}</span>
						<span  v-if="dataObj.sale_price">元</span>
					</div>
					<div class="top_time">有效期:{{dataObj.begin_time}} 至 {{dataObj.end_time}}</div>
				</div>
				<router-link :to="'/store/selectStore?coupon_id='+coupon_id" class="shop">
					<span>查看适用的门店</span>
					<span class="shop_img"><img src="../../assets/icon/icon14.png"></span>
				</router-link>
				<div class="bt">
					<div class="bt_title">优惠券规则</div>
					<div class="bt_p">
						<p v-for="(item,index) in dataObj.coupon_rule" :key="index">{{index+1}}、{{item}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="btn">
			<div class="btn_box">
				<div class="btn_fl">
					<span class="btn_fl——font">{{dataObj.sale_bp}}</span>
					<span>积分</span>
				</div>
				<div class="btn_fr" @click="conversion">立即兑换</div>
			</div>
		</div>

		<!-- 兑换弹窗 -->
		<div class="dialog_box" v-if="hasConversion">
			<div class="dialog">
				<div class="dialog_title">
					<span>积分兑换</span>
					<span class="dialog_title——ab"><img src="@/assets/icon/x.png" @click="conversion"></span>
				</div>
				<div class="dialog_docs">确定使用{{dataObj.sale_bp}}积分<span v-if="dataObj.sale_price">+{{dataObj.sale_price}}元</span>兑换?</div>
				<div class="dialog_btn">
					<span @click="conversion">取消</span>
					<span @click="couponExchange(dataObj.sale_price)">确定</span>
				</div>
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
	import HintMsg from "@/components/common/hintMsg";
	import Loading from "@/components/common/loading";
	import {couponDetail,couponExchangeScore,couponExchangeWx,menuOrderPay,couponExchangeWxResult} from "@/api/goods";
	export default{
		name:"GoodsDetail",
		data() {
			return{
				dataObj:{},	//数据
				coupon_id:1,	//卡券_id
				hasConversion:false,
				isLoad:false,//判断是否有数据,true是加载完成，false是加载中
			}
		},
		/**
		 * 组件模板
		 */
		components: {
	    	Loading,
	    	HintMsg,
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
		 * 事件
		 */
		methods:{
			//兑换切换
			conversion(){
				this.hasConversion = !this.hasConversion
			},
			//数据
			couponDetail(){
				let data = {
					coupon_id:this.coupon_id,
					user_id:this.$store.state.appCommon.user_id
				}
				couponDetail(data).then((res)=>{
					if(res.data.code == 200){
						this.isLoad = true
						this.dataObj = res.data.data
					}else{
						this.isLoad = false
					}
				}).catch(()=>{
					this.$router.push({name:"LoadFail"});
				})
			},
			//立即兑换
			couponExchange(sale_price){				
				let data = {
					coupon_id:this.coupon_id,
					user_id:this.$store.state.appCommon.user_id
				}
				if(sale_price){//需要金额兑换走支付接口
					//金额+积分
					this.couponExchangeWx(data);
				}else{ //积分兑换
					//积分
					couponExchangeScore(data).then((res)=>{
						if (res.data.code == 200) {
							console.log(res.data.data)
							this.hasConversion = !this.hasConversion
						}
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
					})
				}
			},
			//(积分+金额)确认下单,创建订单
			couponExchangeWx(data){
				couponExchangeWx(data).then((res)=>{
					if(res.data.code == 200){
						this.order_id = res.data.data.order_id
						this.order_num = res.data.data.order_num
						
						//创建订单成功，调用支付接口
						this.menuOrderPay();
					}else{
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
					}
				})
			},
			//微信支付接口
			menuOrderPay(){
				let data = {
					price:this.dataObj.sale_price,		//订单价
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
							// console.log(res)
							// alert(res.err_code+res.err_desc+res.err_msg)
							// alert(res.err_msg)
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
								//付款成功，跳转到我的优惠卷详情
								that.$router.push({name:"OrderFormDetail",query:{order_id:this.order_id}})
								that.couponExchangeWxResult(data1)
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
								that.couponExchangeWxResult(data2)
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
			couponExchangeWxResult(data){
				couponExchangeWxResult(data).then((res)=>{
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
		 * @return {[type]} [description]
		 */
		//创建完毕状态
		created(){
			this.coupon_id = this.$route.query.coupon_id
		},
		//挂载结束
		mounted(){
			document.title = '商品详情';
			this.couponDetail();
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
		.banner{
			width: 100%;
			height: (450px/$px) + rem;
			img{
				height: (450px/$px) + rem;
			}
		}
		.content{
			position: absolute;
			top: (400px/$px) + rem;
			left: 0;
			width: 100%;
			padding: 0 (30px/$px) + rem;
			padding-bottom: (110px/$px) + rem;
			box-sizing: border-box;
			.detail{
				width: 100%;				
				.top{
					background: #fff;
					width: 100%;
					height:  (200px/$px) + rem;
					padding: 0 (20px/$px) + rem;
					box-sizing: border-box;
					border-radius:(10px/$px) + rem;
					color: #000;
					display: flex;
					justify-content: space-around;
					flex-flow: column;
					.title{
						width: 100%;
						padding:  (5px/$px) + rem 0;
						box-sizing: border-box;
						font-size: (36px/$px) + rem;
						display: flex;
						align-items: center;
					}
					.top_number{
						color: #FF9000;
						width: 100%;
						height: (60px/$px) + rem;
						font-size: (28px/$px) + rem;
						display: flex;
						align-items: center;
						.top_number——font{
							font-size: (36px/$px) + rem;
						}
					}
					.top_time{
						width: 100%;
						color: #AAAAAA;
						font-size: (24px/$px) + rem;
						display: flex;
						align-items: center;
						padding-bottom: (20px/$px) + rem;
					}
				}
				.shop{
					width: 100%;
					height: (80px/$px) + rem;
					display: flex;
					align-items: center;
					margin:(10px/$px) + rem 0;
					background: #fff;
					border-radius:(10px/$px) + rem;
					padding:0 (20px/$px) + rem;
					box-sizing: border-box;
					color: #1A1A1A;
					position: relative;
					font-size: (30px/$px) +rem;
					a{
						color: #1A1A1A;
					}
					.shop_img{
						position: absolute;
						right: (20px/$px) + rem;
						top: 0;
						display: flex;
						align-items: center;
						height: (80px/$px) + rem;
						img{
							width: (18px/$px) + rem;
							height: (31px/$px) + rem;
						}
					}
				}
				.bt{
					width: 100%;
					background: #fff;
					border-radius:(10px/$px) + rem;
					padding:0 (20px/$px) + rem;
					box-sizing: border-box;
					.bt_title{
						color: #1A1A1A;
						font-size: (32px/$px) + rem;
						height: (80px/$px) + rem;
						display: flex;
						align-items: center;

					}
					.bt_p{
						padding-bottom: (50px/$px) + rem;
						p{
							width: 100%;
							color:#989898;
							font-size: (24px/$px) + rem;
							text-align: left;
							padding:(5px/$px) + rem 0;
						}
					}
				}
			}
		}
		.btn{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: (100px/$px) + rem;
			.btn_box{
				max-width: 750px;
				min-width: 320px;
				margin:0 auto;
				display: flex;
				align-items: center;
				background: #fff;
				.btn_fl{
					width: (510px/$px) + rem;
					padding-left: (40px/$px) + rem;
					box-sizing: border-box;
					color: #1A1A1A;
					font-size: (24px/$px) + rem;
					text-align: left;
					.btn_fl——font{
						font-size: (36px/$px) + rem;
					}
				}
				.btn_fr{
					width: (240px/$px) + rem;
					background: #FF9000;
					font-size: (30px/$px) + rem;
					height: (100px/$px) + rem;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FEFEFE;
				}
			}
		}
		.dialog_box{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			display: flex;
			align-items: center;
			justify-content: center;
			.dialog{
				width: (491px/$px) + rem;
				height: (276px/$px) + rem;
				background: #fff;
				border-radius: (20px/$px) + rem;
				overflow:hidden;
				.dialog_title{
					width: 100%;
					height: (89px/$px) + rem;
					font-size:(30px/$px) + rem;
					color: #FF9000;
					display:flex;
					align-items: center;
					justify-content: center;
					background: #F0EFF4;
					position: relative;
					font-weight: 500;
					.dialog_title——ab{
						position: absolute;
						top: 0;
						right: (20px/$px) + rem;
						height: (89px/$px) + rem;
						display: flex;
						align-items: center;
						img{
							width: (34px/$px) + rem;
							height: (34px/$px) + rem;
						}
					}
				}
				.dialog_docs{
					width: 100%;
					height: (119px/$px) + rem;
					font-size: (28px/$px) + rem;
					color: #1A1A1A;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.dialog_btn{
					width: 100%;
					height: (67px/$px) + rem;
					border-top: solid 1px #E7E6EC;
					font-size: (28px/$px) + rem;
					color: #1A1A1A;
					display: flex;
					span{
						width: 50%;
						height: (67px/$px) + rem;
						display: flex;
						align-items: center;
						justify-content: center;
						&:first-child{
							border-right: solid 1px #E7E6EC; 
						}
					}
				}
			}
		}
	}
</style>