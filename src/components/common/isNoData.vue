<template>
	<!-- 加载到底 -->
	<div class="storeList_bt">我是有底线的</div>
</template>
<script>
	export default{
		name:"IsNoData",
		data(){
			return{

			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.storeList_bt{
		width: 100%;
		height: (50px/$px) + rem;
		line-height:  (50px/$px) + rem;
		position: relative;
		color: #BFBFBF;
		font-size: (18px/$px) + rem;
		text-align: center;
		&:after{
			content:"";
			display: inline-block;
			position: absolute;
			left: (14px/$px) + rem;
			top: (24px/$px) + rem;
			width: (230px/$px) + rem;
			height: 1px;
			background: #CECDCF;
		}
		&:before{
			content: "";
			display: inline-block;
			position: absolute;
			right: (14px/$px) + rem;
			top: (24px/$px) + rem;
			width: (230px/$px) + rem;
			height: 1px;
			background: #CECDCF;

		}
	}
</style>