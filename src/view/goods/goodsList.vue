<template>
	<div class="main">
		<div class="goods_ul">
			<ul>
				<li v-for="(item,index) in goodsData" :key="index">
					<img :src="item.coupon_image" class="li_img">
					<div class="goods_msg">
						<div class="title">
							<span>{{item.coupon_name}}</span>
							<div class="goods_icon"><img :src="item.is_collected>0?addLike:delLike" @click="item.is_collected==0?couponCollectAdd(item.coupon_id):couponCollectDelete(item.coupon_id)"></div>
						</div>
						<!-- <div class="goods_grade">
							<span>4.5</span>
							<span class="grade_list">
								<template v-for="item in gradeArr">
									<img class="grade_list_w" v-if="item < grade" src="@/assets/icon/starddd.png">
									<img class="grade_list_w" v-else src="@/assets/icon/star.png">
								</template>
							</span>
						</div> -->
						<div class="goods_docs">{{item.coupon_info}}</div>
					</div>
					<div class="goods_btn" v-if="item.is_collected==3"><router-link class="btn_a" to="">已经兑换</router-link></div>
					<div class="goods_btn" v-else><router-link class="btn_a" :to="'/goods/goodsDetail?coupon_id='+item.coupon_id">立即兑换</router-link></div>
				</li>
			</ul>
		</div>
		<!-- 加载到底 -->
		<IsNoData v-if="isNoData" />
		<!-- 加载loading组件 -->
		<Loading v-if="!isLoad" />
		<!-- 触底加载 -->
		<BaseLoad v-if="isBase" />
		<!-- 提示组件 -->
		<HintMsg :hintMsg="msg" v-if="hasMsg" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import HintMsg from "@/components/common/hintMsg";
	import IsNoData from "@/components/common/isNoData";
	import BaseLoad from "@/components/common/baseLoad";
	import Loading from "@/components/common/loading";
	import {couponList,couponCollectAdd,couponCollectDelete} from "@/api/goods";
	import delLike from "@/assets/icon/icon16.png";
	import addLike from "@/assets/icon/icon17.png";
	export default{
		name: "GoodsList",
		data() {
			return{
				addLike:addLike,
				delLike:delLike,
				goodsData:[],	//列表数据
				page:1,
				isLoad:false,//判断是否有数据,true是加载完成，false是加载中
			  	isBase:false,//底部加载，true是滑到底部出现
			  	isNoData:false,//true为没有数据显示
			  	REQUIRE:true,//阻止多次触底，true触底触发，false取消触底触发
			  	msg:"",	//提示信息
			}
		},
		/**
		 * 组件模板
		 */
		components: {
			BaseLoad,
	    	Loading,
	    	IsNoData,
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
		 * 事件
		 */
		methods:{
			//列表数据
			couponList(){
				let data = {
					page:this.page,
					user_id:this.$store.state.appCommon.user_id
				}
				couponList(data).then((res)=>{
					if(res.data.code == 200){
						this.isLoad = true;
						this.isBase = false;
						this.REQUIRE = true;
						this.goodsData = this.goodsData.concat(res.data.data);
					}else if(res.data.code == 201){
						//当返回数据为空
						this.isNoData = true;
						this.isBase = false;
						this.REQUIRE = false;
					}else{
						setTimeout(function(){
							this.isBase = false;
							this.isLoad = true;
						}.bind(this),3000)
					}
				}).catch(()=>{
					this.$router.push({name:"LoadFail"});
				})
			},
			//添加收藏
			couponCollectAdd(id){
				let data = {
					coupon_id:id,
					user_id:this.$store.state.appCommon.user_id
				}
				couponCollectAdd(data).then((res)=>{
					if(res.data.code == 200)
					{
						this.goodsData.map((v,i,arr)=>{
							if(v.coupon_id == id){
								v.is_collected = 1;
							}
						})
					}
					this.msg = res.data.msg;
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
				})
			},
			//取消收藏
			couponCollectDelete(id){
				let data = {
					coupon_id:id,
					user_id:this.$store.state.appCommon.user_id
				}
				couponCollectDelete(data).then((res)=>{
					if(res.data.code == 200)
					{
						this.goodsData.map((v,i,arr)=>{
							if(v.coupon_id == id){
								v.is_collected = 0;
							}
						})
					}
					this.msg = res.data.msg;
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
				})
			},
			//触底加载
			soleLoad(){
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				let windowH = window.screen.height;
				let bodyH = document.body.clientHeight;
				if(((windowH + scrollTop) > bodyH) && this.REQUIRE){
					console.log(this.REQUIRE)
					this.REQUIRE = false;
					this.isNoData = false;
					this.isBase = true;
					this.page+=1;
					setTimeout(function(){
						this.couponList();
					}.bind(this),1000)
				}
			}
		},
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		//挂载结束
		mounted(){
			document.title = '卡卷商城';
			this.couponList();
		},
		//keep-alive缓冲激活时调用
		activated(){
			document.title = '卡卷商城';
			// 添加滚动事件，检测滚动到页面底部
      		window.addEventListener('scroll', this.soleLoad);
		},
		//keep-alive缓冲移除时调用
		deactivated(){
            window.removeEventListener('scroll', this.soleLoad);//监听页面滚动事件
        },
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		background: #fff;
		.goods_ul{
			width: 100%;
			padding:0 (64px/$px) + rem;
			box-sizing: border-box;
			ul{
				width: 100%;
				li{
					width: 100%;
					height: (457px/$px) + rem;
					position: relative;
					margin-top: (40px/$px) + rem;
					.li_img{
						width: 100%;
						height: (438px/$px) + rem;
						border-radius: (15px/$px) + rem;
					}
					.goods_msg{
						width: 100%;
						padding:0 (28px/$px) + rem;
						box-sizing: border-box;
						position: absolute;
						top: 0;
						left: 0;
						color: #fff;
						.title{
							width: 100%;
							height: (80px/$px) + rem;							
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: (28px/$px) + rem;
							color: #fff;
							padding-right: (40px/$px) + rem;
							box-sizing: border-box;
							.goods_icon{
								position: absolute;
								top: 0;
								right:  (22px/$px) + rem;
								width: (35px/$px) + rem;
								height: (80px/$px) + rem;
								display: flex;
								align-items: center;
								img{
									height:  (35px/$px) + rem;
								}
							}
						}
						.goods_grade{
							width: 100%;
							font-size: (22px/$px) + rem;
							color: #fff;
							text-align: left;
							display: flex;
							align-items: center;
							.grade_list{
								.grade_list_w{
									width: (20px/$px) + rem;
									height: (19px/$px) + rem;
									margin-left: (5px/$px) + rem;
								}
							}
						}
						.goods_docs{
							width: 100%;
							display: flex;
							align-items: center;
							font-size: (20px/$px) + rem;
							text-align: left;
							margin-top: (10px/$px) + rem;
							line-height: (38px/$px) + rem;
						}
					}
					.goods_btn{
						width: 100%;
						position: absolute;
						left: 0;
						bottom: 0;
						display: flex;
						justify-content: center;
						.btn_a{
							width: (336px/$px) + rem;
							height: (65px/$px) + rem;
							background: #FF9000;
							border-radius: (33px/$px) + rem;
							font-size: (30px/$px) + rem;
							color: #fff;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
			}
		}
	}
</style>