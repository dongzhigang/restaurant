//号单详情
<template>
	<div class="createOrder">
		<div class="createOrder_start">
			<div class="start_title">
				<img :src="iconPath">
				<span>{{createData.status==1?"已取号":"已取消"}}</span>
			</div>
			<ul class="start_ul">
				<li><span>听到叫号请到迎宾台，过号请重新取号</span></li>
			</ul>
		</div>
		<div class="createOrder_content">
			<div class="title">
				<span>{{createData.canteen_name}}</span>
				<span class="createOrder——ab">
					<img src="@/assets/icon/icon14.png">
				</span>
			</div>
			<ul class="content_ul">
				<li>
					<span>取号时间</span>
					<label>{{createData.create_date}}</label>
				</li>
				<li>
					<span>还需等待</span>
					<label>{{createData.status==1?createData.waiting_num:"---"}}桌</label>
				</li>
				<li>
					<span>预估时间</span>
					<label>{{createData.status==1?createData.waiting_time:"---"}}分钟</label>
				</li>
				<li v-if="createData.status==1">
					<span>已等待</span>
					<label>{{createData.has_waited}}分钟</label>
				</li>
			</ul>
			<div class="content_number">
				<span>{{createData.status==1?createData.order_name:"---"}}</span>
				<label>{{createData.desk_name}}</label>
			</div>
			<div class="content_btn">听到叫号请到迎宾台，过号请重新取号</div>
		</div>
		<div class="createOrder_address">
			<img src="@/assets/icon/dw.png" class="createOrder_address_img">
			<span>{{createData.address}}</span>
			<span class="createOrder——ab">
				<img src="@/assets/icon/icon14.png">
			</span>
		</div>
		<div class="createOrder_phone" v-if="createData.status==1">客服电话:400-1231-123</div>
		<div class="createOrder_bot" v-if="createData.status==1">
			<span @click="cancelNumber">取消排队</span>
		</div>

		<!-- dialog -->
		<div class="dialog_box" v-if="isCancel">
			<div class="dialog">
				<div class="title">取消后您的排队信息无法恢复,请您谨慎选择</div>
				<ul class="dialog_ul">
					<li @click="cancelNumber">再想想</li>
					<li class="active" @click="cancelQueueUp">确认取消</li>
				</ul>
			</div>
		</div>
		<!-- 提示组件 -->
		<HintMsg :hintMsg="msg" v-if="hasMsg" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import xl from '@/assets/icon/xl.png'
  import qx from '@/assets/icon/qx.png'
	import { queueNotice } from '@/api/template';
	import { cancelQueue } from "@/api/store";
	import HintMsg from "@/components/common/hintMsg";
	export default{
		inject:['reload'],
		name:"CreateOrder",
		data(){
			return{
				isCancel:false,		//true弹出是否取消取号，false隐藏
				createData:{status:1},	//数据
				//提示信息
				msg:"",
			}
		},
		/**
		 * 组件模板
		 */
		components: {
			HintMsg,
	    },
		/**
		 * 计算属性
		 */
		computed: {
			...mapGetters([
		      'hasMsg',     // ...
		    ]),
			iconPath(){
				return this.createData.status==1?xl:qx
			}
		},
		/**
		 * 事件
		 */
		methods:{
			//弹出取消弹框
			cancelNumber(){
				this.isCancel = !this.isCancel
			},
			//页面数据
			queueNotice(){
				let data = {
					queue_id:this.queue_id
				}
				queueNotice(data).then((res)=>{
					console.log(res)
					if(res.data.code == 200){
						this.createData = res.data.data
					}
				})
			},
			//取消排队
			cancelQueueUp(){
				let data = {
					queue_id:this.queue_id,
					openid:JSON.parse(localStorage.getItem("user")).openid,		//openid
				}
				cancelQueue(data).then((res)=>{
					if(res.data.code == 200){
						this.isCancel = !this.isCancel
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
				})
			}
		},
		/**
		 * 生命周期
		 */
		mounted(){
			document.title = '号单详情';
			this.queue_id = this.$route.query.queue_id
			this.queueNotice();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.createOrder{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		padding-bottom: (118px/$px) + rem;
		box-sizing: border-box;
		position: relative;
		.createOrder——ab{
			width: (18px/$px) + rem;
			height: 100%;
			position: absolute;
			top: 0;
			right: (30px/$px) + rem;;
			display: flex;
			align-items: center;
			img{
				width: (18px/$px) + rem;
				height: (31px/$px) + rem;
			}
		}
		.createOrder_start{
			width: 100%;
			height: (147px/$px) + rem;
			background: #fff;
			.start_title{
				width: 100%;
				border-bottom: solid 1px #F0EFF4;
				padding:0 (30px/$px) + rem;
				box-sizing: border-box;
				font-size: (30px/$px) + rem;
				color: #000;
				display: flex;
				align-items: center;
				height: (86px/$px) + rem;
				img{
					width: (30px/$px) + rem;
					height: (30px/$px) + rem;
					margin-right: (18px/$px) + rem;
				}
			}
			.start_ul{
				width: 100%;
				padding: 0 (30px/$px) + rem;
				box-sizing: border-box;
				height: (60px/$px) + rem;
				li{
					width: 100%;
					height: (60px/$px) + rem;
					font-size: (22px/$px) + rem;
					color: #BFBFBF;
					display: flex;
					align-items: center;
					span{
						text-align: left;
					}
					&:before{
						content: "·";
						display: flex;
						align-items: center;
						font-size:(30px/$px) + rem;
						margin-right: (10px/$px) + rem;
					};
				}
			}
		}
		.createOrder_content{
			width: 100%;
			margin-top: (20px/$px) + rem;
			background: #fff;
			position: relative;
			.title{
				width: 100%;
				padding-left: (30px/$px) + rem;
				box-sizing: border-box;
				font-size: (30px/$px) + rem;
				color: #000;
				height: (79px/$px) + rem;
				border-bottom: solid 1px #F0EFF4;
				display: flex;
				align-items: center;
				position: relative;
			}
			.content_ul{
				width: 100%;
				padding: (20px/$px) + rem (30px/$px) + rem;
				li{
					font-size: (22px/$px) + rem;
					margin:(10px/$px) + rem 0;
					text-align: left;
					span{
						width: (100px/$px) + rem;
						display: inline-block;
						color: #BFBFBF;
					}
					label{
						color: #1A1A1A;
						font-size: (24px/$px) + rem;
					}
				}
			}
			.content_number{
				width: (100px/$px) + rem;
				position: absolute;
				top: (110px/$px) + rem;
				right: (30px/$px) + rem;
				text-align: right;
				display: flex;
				flex-flow: column;
				span{
					font-size: (30px/$px) + rem;
					color: #FF9000;
				}
				label{
					font-size: (22px/$px) + rem;
					color: #808080;
				}
			}
			.content_btn{
				width: 100%;
				border-top: solid 1px #E2E1E6;
				padding:0 (30px/$px) +rem;
				box-sizing: border-box;
				background: #FCF6D6;
				height: (56px/$px) + rem;
				display: flex;
				align-items: center;
				font-size: (22px/$px) + rem;
				color: #AA9B55;
			}
		}
		.createOrder_address{
			width: 100%;
			height: (73px/$px) + rem;
			display: flex;
			align-items: center;
			padding: 0 (30px/$px) + rem;
			box-sizing: border-box;
			margin-top: (20px/$px) + rem;
			background: #fff;
			font-size: (24px/$px) + rem;
			color: #4D4D4D;
			position: relative;
			.createOrder_address_img{
				width: (24px/$px) + rem;
				height: (32px/$px) + rem;
				margin-right: (10px/$px) +rem;
			}
		}
		.createOrder_phone{
			width: 100%;
			height: (100px/$px) + rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: (22px/$px) + rem;
			color: #A6A6A6;
			position: absolute;
			bottom:(118px/$px) + rem;
			left: 0;
		}
		.createOrder_bot{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: (118px/$px) + rem;
			padding: (20px/$px) + rem;
			box-sizing: border-box;
			background: #E2E1E6;
			span{
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #fff;
				font-size: (30px/$px) + rem;
				color: #4D4D4D;
				border: solid 1px #E2E1E6;
				box-sizing: border-box;
			}
		}
		.dialog_box{
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			.dialog{
				width: (435px/$px) + rem;
				height: (205px/$px) + rem;
				background: #fff;
				border-radius: (20px/$px) + rem;
				overflow:hidden;
				.title{
					width: 100%;
					padding:0 (35px/$px) + rem;
					height: (135px/$px) + rem; 
					box-sizing: border-box;
					display: flex;
					align-items: center;
					text-align: left;
					font-size: (24px/$px) + rem;
					color: #1A1A1A;
				}
				.dialog_ul{
					width: 100%;
					border-top: solid 1px #E7E6EC; 
					height: (69px/$px) + rem;
					display: flex;
					align-items: center;
					li{
						font-size: (28px/$px) + rem;
						color: #1A1A1A;
						width: 50%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						box-sizing: border-box;
						&:last-child{
							border-left: solid 1px #E7E6EC;
						};
						&.active{
							color: #FF9000;
						}
					}
				}
			}
		}
	}
</style>