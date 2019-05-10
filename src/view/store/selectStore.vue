<template>
	<div class="main">
		<div class="list">
			<div class="list_item" v-for="(item,index) in dataList" :key="index">
				<div class="item_fl fl">
					<img :src="item.list_image">
				</div>
				<div class="item_fr fl">
					<div class="fr_title">{{item.canteen_name}}</div>
					<div class="fr_address">
						<img class="fr_address_img" src="../../assets/icon/icon19.png">
						<span class="fr_address——h">{{item.address}}</span>
					</div>
					<div class="fr_address">
						<img class="fr_address_img" src="../../assets/icon/icon18.png">
						<a class="fr_address——color" href="tel:13632482567">{{item.phone}}</a>
					</div>
				</div>
			</div>
		</div>
		<!-- 加载loading组件 -->
		<Loading v-if="!isLoad" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import {couponStoreMatch} from "@/api/goods";
	import Loading from "@/components/common/loading";
	export default{
		name:"SelectStore",
		data(){
			return{
				isLoad:false,//判断是否有数据,true是加载完成，false是加载中
				dataList:[],
			}
		},
		/**
		 * 组件模板
		 */
		components: {
	    	Loading,
	    },
		/**
		 * 事件
		 */
		methods:{
			//列表数据
			couponStoreMatch(){
				let data = {
					coupon_id:this.coupon_id
				}
				couponStoreMatch(data).then((res)=>{
					if(res.data.code == 200){
						this.isLoad = true;
						this.dataList = res.data.data
					}else{
						this.isLoad = true;
						this.$router.push({name:"LoadFail"});
					}
					console.log(res)
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
		//创建完毕状态
		created(){
			this.coupon_id = this.$route.query.coupon_id
		},
		//挂载结束
		mounted(){
			document.title = '选门店';
			this.couponStoreMatch();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		.list{
			width: 100%;
			.list_item{
				width: 100%;
				padding: (10px/$px) +rem (15px/$px) +rem;
				background: #fff;
				margin-bottom: (20px/$px) + rem;
				box-sizing: border-box;
				overflow: hidden;
				.item_fl{
					width: (210px/$px) + rem;
					height: (150px/$px) + rem;
					img{
						height: (150px/$px) + rem;
					}
				}
				.item_fr{
					padding-left: (20px/$px) + rem;
					width: (490px/$px) + rem;
					.fr_title{
						color: #1A1A1A;
						width: 100%;
						font-size: (38px/$px) + rem;
						height: (48px/$px) + rem;
						display: flex;
						align-items: center;
						font-weight: 500;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.fr_address{
						width: 100%;
						color: #939393;
						font-size: (24px/$px) + rem;
						display: flex;
						align-items: center;

						.fr_address_img{
							width: (25px/$px) + rem;
							height: (25px/$px) + rem;
							margin-top: (5px/$px) + rem;
						}
						span{
							width: 100%;
							text-align: left;
							padding-left: (10px/$px) + rem;
							box-sizing: border-box;
							display: flex;
							align-items: center;
							&.fr_address——h{
								height: (70px/$px) + rem;
							}
						}
						a{
							padding-left: (10px/$px) + rem;
							&.fr_address——color{
								color: #FF9000;
								text-decoration: underline;
							}
						}
					}
				}
			}
		}
	}
</style>