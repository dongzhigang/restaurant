<!-- 未使用 -->
<template>
	<div class="rows" v-if="dataList.length">
		<div class="rows_col" v-for="(item,index) in dataList" :key="index">
			<div class="col_fl"> 
				<img :src="item.coupon_image" class="col_fl_img">
			</div>
			<div class="col_fr">
				<div class="fr_title">{{item.coupon_name}}</div>
				<div class="fr_docs">{{item.tips}}</div>
				<div class="fr_ab">
					<span>{{item.use_date}}前有效</span>
					<span class="fr_ab——w">
						<img src="@/assets/icon/jijiang.png">
					</span>
				</div>
			</div>
		</div>
	</div>
	<NoData v-else />
</template>
<script>
	import NoData from "@/components/coupon/noData"
	export default{
		name: "Unused",
		props:['dataList'],
		data() {
			return{

			}
		},
		/**
		 * 组件模板
		 */
		components: {
			NoData,
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.rows{
		width: 100%;
		padding:0 (30px/$px) + rem;
		box-sizing: border-box;
		.rows_col{
			width: 100%;
			background: #fff;
			display: flex;
			border:solid 1px #E2E1E6;
			box-sizing: border-box;
			border-radius: (10px/$px) + rem;
			overflow: hidden;
			margin-top: (20px/$px) + rem;
			.col_fl{
				width: (290px/$px) + rem;
				height: (210px/$px) + rem;
				.col_fl_img{
					width: 100%;
					height: 100%;
				}
			}
			.col_fr{
				width: (470px/$px) + rem;
				padding-left: (20px/$px) + rem;
				box-sizing: border-box;
				position: relative;
				display: flex;				
				flex-flow: column;
				justify-content: space-around;
				.fr_title{
					font-size: (30px/$px) + rem;
					width: 100%;
					display: flex;
					align-items: center;
					color: #FF9000;
				}
				.fr_docs{
					width: 100%;
					font-size: (22px/$px) + rem;
					color: #999999;
					text-align: left;
					border-bottom: solid 1px #E4E4E4;	
					padding-bottom: (28px/$px) + rem;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				.fr_ab{
					width: 100%;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					color: #999999;
					font-size: (24px/$px) + rem;
					.fr_ab——w{
						width: (106px/$px) + rem;
						height: (32px/$px) + rem;
						margin-left: (10px/$px) + rem;
					}
				}
			}
		}
	}
</style>