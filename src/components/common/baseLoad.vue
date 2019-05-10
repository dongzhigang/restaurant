<template>
	<div class="baseLoad">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
</template>
<script>
	export default{
		name:"BaseLoad",
		data(){
			return{

			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.baseLoad{
		width: 100%;
		height: (50px/$px) + rem;
		display: flex;
		align-items: center;
		justify-content: center;
		span{
			width: (10px/$px) + rem;
			height: (10px/$px) + rem;
			display: inline-block;
			background: #a9a7aa;
			border-radius: 100%;
			margin:0 (5px/$px) + rem;
			animation: base 1s infinite ease-in-out;
			&:nth-child(2){
				-webkit-animation-delay: -0.8s;
	 			animation-delay: -0.8s;
			}
			&:nth-child(3){
				-webkit-animation-delay: -0.6s;
	 			animation-delay: -0.6s;
			}
			&:nth-child(4){
				-webkit-animation-delay: -0.4s;
	 			animation-delay: -0.4s;
			}
			&:nth-child(5){
				-webkit-animation-delay: -0.2s;
	 			animation-delay: -0.2s;
			}
		}
	}
	@keyframes base {
	   0%, 80%, 100% {
	    transform: scale(0.0);
	    -webkit-transform: scale(0.0);
	  } 
	  60% {
	    transform: scale(1.0);
	    -webkit-transform: scale(1.0);
	  }
	}
</style>