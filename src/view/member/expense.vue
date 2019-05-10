<template>
	<div class="main">
		<div class="list">
			<div class="list_item">
				<span>余额</span>
				<b class="list_item——color">￥0</b>
			</div>
			<div class="list_item">
				<div class="list_item_a">
					<span>累计充值</span>
					<b class="list_item——color">¥0</b>
				</div>
				<div class="list_item_a">
					<span>累计消费 </span>
					<b class="list_item——color">¥0</b>
				</div>
			</div>
		</div>
		<div class="bt">
			<p>累计充值<b class="bt——color">0次</b>,累计消费<b class="bt——color">0次</b></p>
			<p>累计获得商家充值赠送金额: <b class="bt——color">￥0</b></p>
		</div>
	</div>
</template>
<script>
	export default{
		name: "Expense",
		data() {
			return{
				
			}
		},

		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		mounted(){
			document.title = '储值消费记录'
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
			background: #fff;
			height: (100px/$px) + rem;
			padding:(8px/$px) + rem 0;
			display: flex;
			align-items: center;
			.list_item{
				width: 50%;
				
				text-align: center;
				color: #858585;
				font-size: (38px/$px) + rem;
				border-right: solid 1px #E2E1E6;
				box-sizing: border-box;
				&:last-child{
					border:none;
				}
				.list_item_a{
					font-size:(30px/$px) + rem;
				}
				.list_item——color{
					color: #FF9000;
				}
			}
		}
		.bt{
			padding: 0 (30px/$px) + rem;
			width: 100%;
			box-sizing: border-box;
			text-align: left;
			margin-top: (20px/$px) +rem;
			p{
				font-size: (24px/$px) + rem;
				line-height: (38px/$px) +rem;
				.bt——color{
					color: #FF9000
				}
			}
		}
	}
</style>