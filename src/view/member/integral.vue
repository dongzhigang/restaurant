<template>
	<div class="main">
		<div class="head_box">
			<div class="head_bg">
				<img src="../../assets/icon/beijing.png">
			</div>
			<div class="userMsg">
				<div class="userMsg_box">
					<div class="userMsg_logo">
						<img class="logo_img" :src="userData.headimg">
						<div class="logo_name">{{userData.username}}</div>
					</div>
					<div class="userMsg_bt">
						<div class="bt_item">
							<span class="bt_item——color">{{userData.bonus_point}}</span>
							<span>可用积分</span>
						</div>
						<div class="bt_item">
							<span class="bt_item——color">{{userData.history_bonus_point}}</span>
							<span>累计积分</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="rows">
			<router-link to="/member/integral/detail"  class="rows_col">
				<span>积分明细</span>
				<div class="rows_col——ab">
					<img class="rows_col——ab01" src="../../assets/icon/icon14.png">
				</div>
			</router-link>
			<router-link to="/member/orderForm" class="rows_col">
				<span>兑换记录</span>
				<div class="rows_col——ab">
					<img class="rows_col——ab01" src="../../assets/icon/icon14.png">
				</div>
			</router-link> 
		</div>
		<div class="docs">
			<span class="docs——the" @click="dialogTatggle">积分规则</span>
		</div>

		<!-- 规则弹窗 -->
		<div v-if="isDialog" class="dialog" id="dialog">
			<div class="dialog_box">
				<div class="dialog_title">
					<span>积分规则</span>
					<span class="dialog_title——del" @click="dialogTatggle">X</span>
				</div>
				<div class="dialog_row">
					<div class="row_col" v-for="(item,index) in ruleData" :key="index">{{index+1}}、{{item}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {scoreRule} from "@/api/member";
	export default{
		name: "Integral",
		data() {
			return{
				isDialog:false,
				integralData:{},
				userData:{
					headimg:'../../assets/icon/wode.png',
					bonus_point:0,
					history_bonus_point:0,
				},
				ruleData:[]
			}
		},
		/**
		 * 事件函数
		 */
		 methods:{
		 	//dialog显示隐藏
		 	dialogTatggle() {
		 		this.isDialog = !this.isDialog;
		 	},
		 	//积分规则
		 	scoreRule(){
		 		scoreRule().then((res)=>{
		 			if(res.data.code == 200){
		 				this.ruleData = res.data.data
		 			}
		 		})
		 	},
		 	//积分规则
		 	
		 },
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		mounted(){
			document.title = '我的积分';
			this.scoreRule()
			this.userData = JSON.parse(sessionStorage.getItem("userData"));
		},
		activated(){
			document.title = '我的积分';
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		.head_box{
			width:100%;
			height: (440px/$px) + rem;
			position: relative;
			.head_bg{
				width: 100%;
				height: (336px/$px) + rem;
			}
			.userMsg{
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: (250px/$px) + rem;
				padding:0 (20px/$px) + rem;
				box-sizing: border-box;
				.userMsg_box{
					height: 100%;
					width: 100%;
					position: relative;
					background: #fff;
					border-radius: (12px/$px) + rem;
					.userMsg_logo{
						width: 100%;
						position: absolute;
						display: flex;
						justify-content: center;
						flex-flow: column;
						align-items: center;
						top:-(50px/$px) + rem;
						left: 0;
						.logo_img{
							width: (100px/$px) + rem;
							height: (100px/$px) + rem;
						}
						.logo_name{
							color: #4E4E4E;
							font-size: (26px/$px) + rem;
							margin-top:  (10px/$px) + rem;
						}
					}
					.userMsg_bt{
						width: 100%;
						padding:(20px/$px) + rem 0; 
						position: absolute;
						bottom: 0;
						left: 0;
						display: flex;
						.bt_item{
							width: 50%;
							height: (80px/$px) + rem;
							display: flex;
							justify-content: space-around;
							align-items: center;
							flex-flow: column;
							border-right: solid 1px #F0EFF4;
							&:last-child{
								border:none;
							}
							span{
								display: block;
								color: #919191;
								font-size:(26px/$px) + rem;
								&.bt_item——color{
									color: #1A1A1A;
									font-size:(30px/$px) + rem;
									font-weight: bold;
								}
							}
						}
					}
				}
			}
		}
		.rows{
			width: 100%;
			padding: 0 (20px/$px) +rem;
			margin-top: (20px/$px) + rem;
			box-sizing: border-box;
			border-radius: (12px/$px) + rem;
			.rows_col{
				width: 100%;
				height: (86px/$px) + rem;
				line-height: (86px/$px) + rem;
				padding: 0 (10px/$px) + rem;
				box-sizing: border-box;
				background: #fff;
				border-bottom: solid 1px #F0EFF4 ;
				color: #1A1A1A;
				font-size: (26px/$px) + rem;
				text-align: left;
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				/*a{
					width: 100%;
					color: #1A1A1A;
					display: block;
				}*/
				.rows_col——ab{
					height: (86px/$px) + rem;
					display: flex;
					align-items: center;
					.rows_col——ab01{
						width: (18px/$px) +rem;
						height: (31px/$px) +rem;
					}
				}
			}
		}
		.docs{
			position: absolute;
			bottom: (50px/$px) + rem;
			left: 0;
			width: 100%;
			font-size: (26px/$px) + rem;
			color: #B2B2B2;
			.docs——the{
				text-decoration: underline;
			}
		}
		.dialog{
			border:none;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.3);
			.dialog_box{
				width: (490px/$px) + rem;
				overflow: hidden;
				background: #fff;
				border-radius: (20px/$px) + rem;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top:-(140px/$px) + rem;
				margin-left: -(245px/$px) + rem;
				.dialog_title{
					width: 100%;
					height: (90px/$px) + rem;
					line-height: (90px/$px) +rem;
					background: #F0EFF4;
					text-align: center;
					font-size: (30px/$px) + rem;
					color: #FF9000;
					position: relative;
					.dialog_title——del{
						position: absolute;
						top: 0;
						right: (20px/$px) + rem;
						font-size: (30px/$px) + rem;
					}
				}
				.dialog_row{
					width: 100%;
					padding:(40px/$px) + rem 0;
					.row_col{
						padding:0 (20px/$px) + rem;
						font-size: (22px/$px) + rem;
						color: #4D4D4D;
						text-align: left;
						line-height: (38px/$px) + rem;
					}
				}
			}
		}
	}
</style>