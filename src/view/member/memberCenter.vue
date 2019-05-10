//会员中心
<template>
	<div class="main">
		<div class="member_msg_box">
			<div class="member_msg">
				<div class="msg_img">
					<img :src="userData.canteen_logo">
					<div class="msg_img_info">
						<span class="info_code">NO.{{userData.member_card}}</span>
					</div>
				</div>
			</div>
			<div class="member_rows">
				<router-link to="/member/integral" class="mem_col">
					<img src="../../assets/icon/icon06.png">
					<span>我的积分</span>
				</router-link>
				<router-link to="/member/myAppraise" class="mem_col col_center">
					<img src="../../assets/icon/pj.png">
					<span>我的评价</span>
				</router-link>
				<router-link to="/member/collect" class="mem_col col_right">
					<img src="../../assets/icon/sc.png">
					<span>我的收藏</span>
				</router-link>
			</div>
		</div>
		<div class="mem_list">
			<div class="list_ul">
				<router-link to="/member/personalData" class="list_li">
					<div class="list_li_lt">
						<img class="list_li_img" src="../../assets/icon/icon09.png">
						<span>{{userData.username}}</span>
					</div>
					<div class="list_li——ab">
						<!-- <img class="list_li——ab01" src="../../assets/tem/logo2.png"> -->
						<img class="list_li——ab02" src="../../assets/icon/icon13.png">
						<img class="list_li——ab03" src="../../assets/icon/icon14.png">
					</div>
				</router-link>
				<router-link to="/goods/goodsList" class="list_li">
					<div class="list_li_lt">
						<img class="list_li_img" src="../../assets/icon/icon10.png">
						<span>卡券商城</span>
					</div>
					<div class="list_li——ab">
						<img class="list_li——ab03" src="../../assets/icon/icon14.png">
					</div>
				</router-link>
				<router-link to="/member/coupon" class="list_li">
					<div class="list_li_lt">
						<img src="../../assets/icon/icon07.png" class="list_li_img">
						<span>优惠券</span>
					</div>
					<div class="list_li——ab">
						<img class="list_li——ab03" src="../../assets/icon/icon14.png">
					</div>
				</router-link>
				<router-link to="/member/haveDinner" class="list_li">
					<div class="list_li_lt">
						<img src="../../assets/icon/icon08.png" class="list_li_img">
						<span>用餐记录</span>
					</div>
					<div class="list_li——ab">
						<img class="list_li——ab03" src="../../assets/icon/icon14.png">
					</div>
				</router-link>
			</div>
		</div>
		<div class="mem_list">
			<div class="list_ul">
				<router-link to="/member/orderForm" class="list_li">
					<div class="list_li_lt">
						<img class="list_li_img" src="../../assets/icon/icon11.png">
						<span>商城订单</span>
					</div>
					<div class="list_li——ab">
						<img class="list_li——ab03" src="../../assets/icon/icon14.png">
					</div>
				</router-link>
				<router-link to="/member/expense" class="list_li">
					<div class="list_li_lt">
						<img class="list_li_img" src="../../assets/icon/icon12.png">
						<span>储值消费记录</span>
					</div>
					<div class="list_li——ab">
						<span class="list_li_money">可用余额: ￥{{userData.balance}}</span>
						<img class="list_li——ab03" src="../../assets/icon/icon14.png">
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import {userCenter} from "@/api/member";
	export default{
		name: "MemberCenter",
		data() {
			return{
				userData:{}
			}
		},
		/**
		 * 事件函数
		 */
		methods:{
			//用户数据
			userCenter(){
				let data = {user_id:this.$store.state.appCommon.user_id}
				userCenter(data).then((res)=>{
					if(res.data.code == 200){
						this.userData = res.data.data;
						// 本地储存数据
						sessionStorage.setItem("userData",JSON.stringify(res.data.data));
					}
				}).catch(()=>{

				})
			}
		},

		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		mounted(){
			document.title = '会员中心';
			this.userCenter();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";
	
	.main{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		.member_msg_box{
			width: 100%;
			height: (385px/$px) + rem;
			position: relative;
			.member_msg{
				width: 100%;
				height: (295px/$px) + rem;
				border-bottom-right-radius: (400px/$px) + rem (50px/$px) + rem;
				border-bottom-left-radius: (400px/$px) + rem (50px/$px) + rem;
				background: #CFCFCF;
				display: flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				.msg_img{
					width: (550px/$px) + rem;
					height: (250px/$px) + rem;
					box-sizing: border-box;
					margin-top: (88px/$px) + rem;
					border-radius:(20px/$px) + rem;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					position: relative;
					.msg_img_info{
						position: absolute;
						top: (10px/$px) + rem;
						right: (20px/$px) + rem;
						font-size: (16px/$px) + rem;
						color: #fff;
						.info_code{
							font-size: (10px/$px) + rem;
						}
					}
				}
			}
			.member_rows{
				width: 100%;
				padding: (30px/$px) + rem;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				position: absolute;
				left: 0;
				bottom: 0;
				.mem_col{
					width: 33%;
					display: flex;
					align-items: center;
					color: #1A1A1A;
					font-size: (24px/$px) + rem;
					&.col_center{
						justify-content: center;
					}
					&.col_right{
						justify-content: flex-end;
					}
					img{
						width: (40px/$px) + rem;
						margin-right: (10px/$px) + rem;
					}
				}
			}
		}
		.mem_list{
			width: 100%;
			background: #fff;
			margin-bottom: (30px/$px) + rem;
			.list_ul{
				width: 100%;
				padding: 0 (30px/$px) + rem;
				box-sizing: border-box;
				.list_li{
					width: 100%;
					height: (80px/$px) + rem;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					border-bottom: solid 1px #F0EFF4;
					.list_li_lt{
						display: flex;
						align-items: center;
						color: #1A1A1A;
						font-size: (26px/$px) + rem;
						.list_li_img{
							width:(40px/$px) + rem;
							height: (40px/$px) + rem;
							margin-right: (10px/$px) + rem;
						}
					}
					.list_li——ab{
						display: flex;
						align-items: center;
						height: (80px/$px) + rem;
						.list_li——ab01{
							width: (60px/$px) + rem;
							height: (60px/$px) + rem;
						}
						.list_li——ab02{
							width: (52px/$px) + rem;
							height: (39px/$px) + rem;
						}
						.list_li——ab03{
							width: (18px/$px) + rem;
							height: (31px/$px) + rem;
							margin-left: (10px/$px) + rem;
						}
						.list_li_money{
							font-size:(22px/$px) + rem;
							color: #BFBFBF;
						}
					}
				}
			}
		}
	}
</style>