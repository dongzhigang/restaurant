<template>
	<div class="image">
		<div class="imageBox" :style="{width:windowW*imgList.length+'px'}" id="image">
			<div v-for="(item,index) in imgList" :key="index" class="item">
				<img :src="item">
			</div>
		</div>
		<div class="img_flag">
			<span v-for="(item,i) in imgList" :class="index == i?'active':''" :key="i"></span>
		</div>
	</div>
</template>
<script>
	export default{
		name:"ImageFullScreen",
		data(){
			return{
				windowW:0,
				index:0,
				imgList:[],//图片数组
			}
		},
		/**
		 * 事件函数
		 */
		methods:{
			imgClose(){
				this.$store.dispatch('ImageFull');
			},
			reload(){
				let dome = document.getElementById("image");
				//初始化
				dome.style.transform = "translate3d("+(- this.index*this.windowW)+"px"+",0,0)";
				//手指触摸到屏幕会触发
				dome.addEventListener("touchstart",(e)=>{
					e.stopPropagation();
					this.startX = event.touches[0].pageX;
				});
				//当手指在屏幕上移动时，会触发
				dome.addEventListener("touchmove",(e)=>{
					e.stopPropagation();
					let that = event.currentTarget
					that.style.transition = "all 1s";
					this.endY = event.touches[0].pageX;
					if(Math.abs(this.endY - this.startX) <= this.windowW){
						if(this.endY - this.startX > 0){//向右滑+
							//判断是否第一个
							if(this.index == 0){
								if(Math.abs((this.endY - this.startX))>this.windowW/3){
									that.style.transform = "translate3d("+(this.windowW/3 + this.index*this.windowW)+"px"+",0,0)";
									return;
								}
								that.style.transform = "translate3d("+((this.endY - this.startX) - this.index*this.windowW)+"px"+",0,0)";
							}else{
								that.style.transform = "translate3d("+((this.endY - this.startX) - this.index*this.windowW)+"px"+",0,0)";
							}
						}else{//向左滑-
							//当滑动到最后一个
							if(this.index == this.imgList.length - 1){
								if (Math.abs((this.endY - this.startX))>this.windowW/3) {
									that.style.transform = "translate3d("+(-(this.windowW/3 + this.index*this.windowW))+"px"+",0,0)";
									return;
								}
								that.style.transform = "translate3d("+((this.endY - this.startX) - this.index*this.windowW)+"px"+",0,0)";
							}else{
								that.style.transform = "translate3d("+((this.endY - this.startX) - this.index*this.windowW)+"px"+",0,0)";
							}
						}
					}
				});
				//当手指离开屏幕时，会触发
				dome.addEventListener("touchend",(e)=>{
					e.stopPropagation();
					let that = event.currentTarget
					if(this.endY - this.startX > 0){//向右滑-
						//判断是否第一个
						if(this.index == 0){
							that.style.transform = "translate3d("+(this.index*this.windowW)+"px"+",0,0)";
						}else{
							//当滑动距离》=屏幕3/1就到下一个
							if (Math.abs(this.endY - this.startX) >= this.windowW/3) {
								this.index-=1;
							}

						}
					}else{//向左滑+
						//当滑动到最后一个
						if(this.index == (this.imgList.length - 1)){
							that.style.transform = "translate3d("+(- this.index*this.windowW)+"px"+",0,0)";
						}else{
							//当滑动距离》=屏幕一半就到上一个
							if (Math.abs(this.endY - this.startX) >= this.windowW/3) {
								this.index+=1;						
							}
						}
					}
					that.style.transform = "translate3d("+(- this.index*this.windowW)+"px"+",0,0)";
				});
			}
		},
		/**
		 * 生命周期
		 */
		//
		//挂载结束
		mounted(){
			document.title = '查看图片';
			this.windowW = document.body.clientWidth;
			this.imgList = this.$route.params.imgList;
			this.index = this.$route.params.index;
			this.reload()
		},
		//离开路由之前执行的函数
		// beforeRouteLeave(to, from, next){
		// 	if(to.name == "TakingOrderDetails"){
		// 		 to.meta.keepAlive = true;
		// 	}else{
		// 		to.meta.keepAlive = false;
		// 	}			
  //     		next();
		// }
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";
	.image{
		width: 100%;
		height: 100%;
		background: #000;
		overflow:hidden;
		.imageBox{
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			transform: translate3d(0px, 0px, 0px);
			position: relative;
			.item{
				width: 100%;
				padding:0 (10px/$px) + rem;
				box-sizing: border-box;
			}
		}
		.img_flag{
			position: absolute;
			bottom: (30px/$px) + rem;
			right: (0px/$px) + rem;
			width: 100%;
			height: (10px/$px) + rem;
			display: flex;
			align-items: center;
			justify-content: center;
			span{
				width: (10px/$px) + rem;
				height: (10px/$px) + rem;
				display: block;
				border-radius: 100%;
				background: #fff;
				margin:0 (5px/$px) + rem;
				overflow-y: hidden;
				&.active{
					background: #666;
				}
			}
		}
	}
</style>