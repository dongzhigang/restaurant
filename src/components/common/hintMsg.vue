<template>
	<div class="hintMsg">
		 <div class="msg">{{hintMsg}}</div>
	</div>
</template>
<script>
	export default{
		props:{
			hintMsg:String,
			required: true
		},
		name:"HintMsg",
		data(){
			return{
				
			}
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.hintMsg{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		.msg{
			line-height: (45px/$px) + rem;
			padding:(30px/$px) + rem (20px/$px) + rem;
			background: rgba(0,0,0,0.5);
			font-size: (30px/$px) + rem;
			color: #fff;
			animation: Msg 1s;
		}

	}
	@keyframes Msg
	{
	    0%   {margin-bottom: -500px;}
	    100% {margin-bottom: 0;}
	}

</style>
