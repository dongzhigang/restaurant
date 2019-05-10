<!-- 我的收藏 -->
<template>
	<div class="collect">
		<div class="list">
			<div class="item" v-for="(item,index) in collectList" :key="index" @touchstart.passive="touchstart" @touchmove.passive="touchmove" >
				<img :src="item.coupon_image" class="item_img">
				<div class="item_fr">
					<div class="item_title">{{item.coupon_name}}</div>
					<div class="item_convert">兑换数量{{item.sent_num}}</div>
					<div class="item_mode">
						<label>{{item.exchange_name}}</label>
						<!-- <span>积分+</span>
						<label>{{item.integral}}</label>
						<span>元兑换</span> -->
					</div>
				</div>
				<div class="item_del" @click="delCollect(item.collect_id)">删除</div>
			</div>
		</div>

		<!-- 没有数据 -->
		<NoData v-if="!collectList.length" />
		<!-- 加载loading组件 -->
		<Loading v-if="!isLoad" />
		<!-- 提示组件 -->
		<HintMsg :hintMsg="msg" v-if="hasMsg" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import {myCollect,collectDelete} from "@/api/member";
	import Loading from "@/components/common/loading";
	import NoData from "@/components/common/noData";
	import HintMsg from "@/components/common/hintMsg";
	export default{
		name:"Collect",
		data(){
			return{
				isLoad:false,//判断是否有数据,true是加载完成，false是加载中
				collectList:[],
			}
		},
		/**
		 * 组件模板
		 */
		components: {
	    	Loading,
	    	NoData,
	    	HintMsg,
	    },
	    /**
		 * 计算属性
		 */
		computed: {
			...mapGetters([
		      'hasMsg',     // ...
		    ])
		},
		/**
		 * 事件函数
		 */
		methods:{
			//当手指触摸屏幕时触发
			touchstart(event){
				this.startX = event.changedTouches[0].clientX;
			},
			//当手指在屏幕上滑动时
			touchmove(event){
				this.endX = event.changedTouches[0].clientX;
				let that = event.currentTarget;
				let child = that.lastChild;
				let childW = child.clientWidth;
				if(this.endX - this.startX > 0){//向右滑
					that.style.marginLeft = "0px";
				}else{//向左滑
					if(Math.abs(this.endX - this.startX) > childW){
						that.style.marginLeft = -childW + "px";
					}
				}
			},
			//数据
			myCollect(){
				let data = {
					user_id:this.$store.state.appCommon.user_id,
				}
				myCollect(data).then((res)=>{
					console.log(res)
					if(res.data.code == 200)
					{
						this.collectList = res.data.data
					}
					this.isLoad = true;
				}).catch(()=>{
					this.isLoad = true;
					this.$router.push({name:"LoadFail"});
				})
			},
			//删除收藏
			delCollect(id){
				let data = {
					collect_id:id
				}
				collectDelete(data).then((res)=>{
					if(res.data.code == 200)
					{
						this.collectList.map((v,i,arr)=>{
							if(v.collect_id == id){
								arr.splice(i,1)
							}
						})
					}
					this.msg = res.data.msg;
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
				})
			}
		},
		/**
		 * 生命周期
		 */
		//挂载结束
		mounted(){
			document.title = '我的收藏';
			this.myCollect();
		}

	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.collect{
		width: 100%;
		height: 100%;
		.list{
			width: 100%;
			padding:0 (30px/$px) + rem;
			box-sizing: border-box;
			overflow: hidden;
			.item{
				width: 100%;
				height: (188px/$px) + rem;
				padding:(20px/$px) + rem 0;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				border-bottom: solid 1px #ddd;
				position: relative;
				transition:all 1s;
				margin-left:(0px/$px) + rem; 
				.item_img{
					width: (210px/$px) + rem;
					height: (150px/$px) + rem;
					border-radius: (15px/$px) + rem;
				}
				.item_fr{
					display: flex;
					flex-direction: column;
					text-align: left;
					margin-left: (30px/$px) + rem;
					justify-content: space-around;
					.item_title{
						font-size: (28px/$px) + rem;
						color: #1A1A1A;
					}
					.item_convert{
						font-size:(22px/$px) + rem;
						color: #999;
					}
					.item_mode{
						color: #FF9000;
						font-size: (24px/$px) + rem;
						label{
							font-size: (30px/$px) + rem;
						}
					}
				}
				.item_del{
					position: absolute;
					width: (174px/$px) + rem;
					height: (189px/$px) + rem;
					background: #FF0000;
					color: #fff;
					font-size: (30px/$px) + rem;
					display: flex;
					align-items: center;
					justify-content: center;
					right: -(204px/$px) + rem;;
					top: 0;
				}
			}
		}
	}	
</style>