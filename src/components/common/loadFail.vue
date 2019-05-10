<template>
	<div class="loadFail">
		<div class="loadFail_img">
			<img src="@/assets/icon/cx.png" @click="reload">
		</div>
	</div>
</template>
<script>
	export default{
		name:"LoadFail",
		data(){
			return{

			}
		},
		/**
		 * 事件
		 */
		methods:{
			reload(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.loadFail{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		z-index: 10;
		.loadFail_img{
			width: (268px/$px) + rem;
			height: (393px/$px) + rem;
		}
	}
</style>