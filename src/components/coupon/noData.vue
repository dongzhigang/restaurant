<template>
	<div class="noData">
		<div class="content">
			<img class="content_img" src="../../assets/icon/icon15.png">
			<span class="content_text">暂无优惠券可用</span>
			<span class="content_btn"><router-link to="/goods/goodsList">领情优惠券</router-link></span>
		</div>
	</div>
</template>
<script>
	export default{
		name: "NoData",
		data() {
			return{

			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.noData{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		padding-top: (70px/$px) + rem;
		box-sizing: border-box;
		background: #fff;
		.content{
			width: (400px/$px) + rem;
			height: (300px/$px) + rem;
			text-align: center;
			font-size: (32px/$px) + rem;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -(150px/$px) + rem;
			margin-left: -(200px/$px) + rem;
			.content_img{
				width: (130px/$px) + rem;
				height: (100px/$px) + rem;
				display: block;
				margin:0 auto;
			}
			.content_text{
				color: #666666;
				display: block;
				margin-top: (40px/$px) + rem;
				margin-bottom: (20px/$px) + rem
			}
			.content_btn{
				display: block;
				width: (220px/$px) + rem;
				height: (60px/$px) + rem;
				line-height: (60px/$px) + rem;
				background: #FF9000;
				color: #fff;
				text-align: center;
				margin:0 auto;
				border-radius: (33px/$px) + rem;
				a{
					color: #fff;
				}
			}
		}
	}
</style>