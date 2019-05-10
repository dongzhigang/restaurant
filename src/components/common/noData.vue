<!-- 没有数据展示组件 -->
<template>
	<div class="noData">没有数据</div>
</template>
<script>
	export default{
		name:"NoData",
		data(){
			return{

			}
		},
		/**
		 * 事件函数
		 */
		methods:{
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.noData{
		width: 100%;
		height: (300px/$px) + rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: (28px/$px) + rem;
		color: #666;
		.reload{
			color: #FF0000;
		}
	}
</style>
