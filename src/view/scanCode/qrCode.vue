<template>
	<div class="main">
		<img src="@/assets/tem/storbg.png" class="main_bg">
		<div class="code_detail">
			<div class="code_logo">
				<img src="@/assets/tem/storlogo.png">
			</div>
			<div class="code_title">
				<span>欢迎光临</span>
				<span>{{canteen_name}}   台号:大厅{{desk_no}}</span>
			</div>
			<div class="code_btn">
				<router-link :to="'/scanCode/takingOrder?desk_no='+desk_no+'&canteen_id='+canteen_id" >开始点餐</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import {dealQrcode} from "@/api/scanCode";
	export default{
		name:"QrCode",
		data(){
			return{
				canteen_name:"",		//店铺名
				canteen_id:"",			//店铺id
				desk_no:"",				//餐桌号
			}
		},
		/**
		 * 事件函数
		 */
		methods:{
			// 店铺接口    
			dealQrcode(){
				let data = {
					canteen_id:this.canteen_id,
					desk_no:this.desk_no,
					openid:JSON.parse(localStorage.getItem("user")).openid
				}
				dealQrcode(data).then((res)=>{
					if(res.data.code == 200){
						this.canteen_name = res.data.data.canteen_name;
						// //是否有订单未结账 (1已结账-跳转到点餐页面，2未结账-跳转至结账页面)
						// if(res.data.data.has_ordered == 2){
						// 	//跳转结账页面
						// 	this.$router.push({name:"MyMenu",query:{desk_no:this.desk_no,canteen_id:this.canteen_id}})
						// }
					}
				})
			}
		},
		/**
		 * 生命周期
		 */
		//挂载结束
		mounted(){
			document.title = '扫码点餐';
			this.canteen_id = this.$route.query.canteen_id ;
			this.desk_no = this.$route.query.desk_no ;
			this.dealQrcode();
		}
	}
</script>
<style lang="scss" scoped  type="text/css">	
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		height: 100%;
		font-size: 0;
		position: relative;
		.main_bg{
			width: 100%;
			height: 100%;
			background-size: 100% 100%;
		}
		.code_detail{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-flow: column;
			.code_logo{
				width: (240px/$px) + rem;	
				height: (330px/$px) + rem;
			}
			.code_title{
				width: 100%;
				margin-top: (50px/$px) + rem;
				display: flex;
				justify-content: center;
				flex-flow: column;
				align-items: center;
				color: #fff;
				font-size: (38px/$px) + rem;
				span{
					display: block;
					line-height: (50px/$px) + rem;
				}
			}
			.code_btn{
				width: (300px/$px) + rem;
				height: (100px/$px) + rem;
				background: #FF9000;
				font-size: (38px/$px) + rem;
				margin-top: (80px/$px) + rem;
				border-radius: (50px/$px) + rem;
				overflow: hidden;
				a{
					color: #fff;
					display: block;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>