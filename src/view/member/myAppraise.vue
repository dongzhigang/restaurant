<!-- 我的评论 -->
<template>
	<div class="appraise">
		<div class="list" v-if="dataList.length">
			<div class="item" v-for="(item,index) in dataList" :key="index">
				<div class="top">
					<div class="top_fl">
						<img src="@/assets/icon/sdian.png" class="top_img">
						<span>{{item.canteen_name}}</span>
					</div>
					<img src="@/assets/icon/icon14.png" class="top_img2">
				</div>
				<div class="comtent">
					<img :src="item.headimg" class="comtent_img">
					<div class="comtent_fr">
						<div class="comtent_top">
							<span class="top_a">{{item.username}}</span>
							<span class="top_b">{{item.create_date}}</span>
						</div>
						<div class="comtent_grade">
							<span>商家:</span>
							<div v-for="(col,i) in scoreArray" :key="i">
								<img src="@/assets/icon/starddd.png" v-if="col < item.score">
								<img src="@/assets/icon/star.png" v-else>
							</div>
						</div>
						<div class="comtent_grade2">
							<span>口味: {{item.taste_score}}星</span>	
							<span>服务: {{item.service_score}}星</span>						
						</div>
						<div class="comtent_praise">
							<img src="@/assets/icon/icon21.png">
							<span>{{item.like_food}}</span>
						</div>
						<div class="comtent_praise">
							<img src="@/assets/icon/icon22.png">
							<span>{{item.content}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<NoData v-else />
	</div>
</template>
<script>
	import {mYcomment} from "@/api/member";
	import NoData from "@/components/common/noData";
	export default{
		name:"Appraise",
		data(){
			return{
				dataList:[],
				scoreArray:[0,1,2,3,4],	//评分数组
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
			mYcomment(){
				let data ={user_id:this.$store.state.appCommon.user_id}
				mYcomment(data).then((res)=>{
					console.log(res)
					if(res.data.code == 200){
						this.dataList = res.data.data
					}
				})
			}
		},
		/**
		 * 生命周期
		 */
		//挂载结束
		mounted(){
			document.title = '我的评论';
			this.mYcomment()
		}

	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.appraise{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		.list{
			width: 100%;
			.item{
				width: 100%;
				margin-bottom: (15px/$px) + rem;
				background: #fff;
				padding:0 (30px/$px) + rem;
				box-sizing: border-box;
				.top{
					width: 100%;
					display: flex;
					flex-direction: row;						
					justify-content: space-between;
					align-items: center;
					height: (64px/$px) + rem;
					border-bottom: solid 1px #F0EFF4;
					.top_fl{
						display: flex;
						align-items: center;
						font-size: (24px/$px) + rem;
						color: #666;
						span{
							margin-left: (10px/$px) + rem;
						}
						.top_img{
							width: (30px/$px) + rem;
							height: (30px/$px) + rem;
						}
					}
					.top_img2{
						width: (18px/$px) + rem;
						height: (31px/$px) + rem;
					}
				}
				.comtent{
					width: 100%;
					display: flex;
					flex-direction: row;
					padding: (20px/$px) + rem 0;
					.comtent_img{
						width: (70px/$px) + rem;
						height: (70px/$px) + rem;
						border-radius: 100%;
					}
					.comtent_fr{
						width: 100%;
						display: flex;
						flex-flow: column;
						padding-left: (17px/$px) + rem;
						box-sizing: border-box;
						.comtent_top{
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-between;
							.top_a{
								font-size: (24px/$px) + rem;
								color: #1A1A1A;
							}
							.top_b{
								font-size: (20px/$px) + rem;
								color: #666;
							}
						}
						.comtent_grade{
							font-size: (20px/$px) + rem;
							color: #4D4D4D;
							display: flex;
							align-items: center;
							margin-top: (17px/$px) + rem;
							img{
								width: (18px/$px) + rem;
								height: (16px/$px) + rem;
								margin-left: (5px/$px) + rem;
							}
						}
						.comtent_grade2{
							font-size: (20px/$px) + rem;
							color: #4D4D4D;
							display: flex;
							align-items: center;
							margin-top: (20px/$px) + rem;
							span{
								margin-right: (50px/$px) + rem;
							}
						}
						.comtent_praise{
							display: flex;
							align-items: top;
							font-size: (20px/$px) + rem;
							color: #4D4D4D;
							margin-top: (20px/$px) + rem;
							img{
								width: (26px/$px) + rem;
								height: (26px/$px) + rem;
							}
							span{
								text-align: left;
								margin-left: (17px/$px) + rem;
							}
						}
					}
				}
			}
		}

	}

</style>