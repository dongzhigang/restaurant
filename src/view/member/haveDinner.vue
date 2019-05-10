<!-- 用餐记录 -->
<template>
	<div class="main">
		<div class="box">
			<div class="column">
				<table align="center" border="0" cellspacing="0" cellpadding="0" class="column_table">
					<tr>
						<th class="column_th">用餐时间</th>
						<th class="column_th">金额(元)</th>
						<th class="column_th">买单人</th>
					</tr>
					<tr v-for="(item,index) in dataList" :key="index">
						<td class="column_td">{{item.dinner_time}}</td>
						<td class="column_td">{{item.order_price}}</td>
						<td class="column_td">{{item.username}}</td>
					</tr>
				</table>
			</div>
			<div class="bot">
				<span>总计: </span>
				<b class="bot——color">￥{{amount}}</b>
			</div>
		</div>
		<!-- 没有数据 -->
		<NoData v-if="!dataList.length" />
		<!-- 加载loading组件 -->
		<Loading v-if="!isLoad" />
	</div>
</template>
<script>
	import {orderRecord} from "@/api/member";
	import Loading from "@/components/common/loading";
	import NoData from "@/components/common/noData";
	import {returnFloat} from "@/assets/common";
	export default{
		name: "HaveDinner",
		data() {
			return{
				isLoad:false,//判断是否有数据,true是加载完成，false是加载中
				dataList:[],	//记录列表
				amount:0,		//总计金额
			}
		},
		/**
		 * 组件模板
		 */
		components: {
	    	Loading,
	    	NoData,
	    },
		/**
		 * 事件
		 */
		methods:{
			//数据
			orderRecord(){
				let data = {user_id:this.$store.state.appCommon.user_id}
				orderRecord(data).then((res)=>{
					let amount = 0;
					if(res.data.code == 200)
					{	
						res.data.data.map((v,i,arr)=>{
							v.dinner_time = v.dinner_time.slice(5,v.dinner_time.length);
							amount = parseFloat(returnFloat(amount)) + parseFloat(v.order_price) 
						})
						this.amount = returnFloat(amount)
						this.dataList = res.data.data;
					}
					this.isLoad = true;
				}).catch(()=>{
					this.isLoad = true;
					this.$router.push({name:"LoadFail"});
				})
			}
		},

		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		mounted(){
			document.title = '用餐记录';
			this.orderRecord();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";
	
	.main{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		.box{
			padding:0 (20px/$px) + rem;
			.column{
				width:100%;
				display: flex;
				align-items: center;
				background: #fff;
				.column_table{
					width: 100%;
					.column_th{
						width: 33.33%;
						height:(80px/$px) + rem;
						line-height: (80px/$px) + rem;
						background: #FF9000;
						text-align: center;
						font-size: (30px/$px) + rem;
						border-right: solid 1px #fff;
						color: #fff;
						box-sizing: border-box;
						&:last-child{
							border:none;
						}
					}
					.column_td{
						height: (80px/$px) + rem;
						border-right:solid 1px #FF9000;
						border-bottom:solid 1px #FF9000;
						color: #000;
						font-size: (30px/$px) + rem;
						text-align:center;
						&:last-child{
							border-right:none;
						}
					}
				}
			}
			.list{
				width: 100%;
				background: #fff;
			}
			.bot{
				width: 100%;
				margin: (30px/$px) + rem 0;
				display: flex;
				justify-content: center;
				color: #1A1A1A;
				font-size: (30px/$px) + rem;
				font-weight: bold;
				.bot——color{
					color: #FF9000;
				}
			}
		}
		
	}

</style>