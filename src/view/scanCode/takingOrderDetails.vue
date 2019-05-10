<template>
	<div class="main">
		<div class="detailsLogo"><img :src="dataObj.detail_banner"></div>
		<div class="detailsContent">
			<div class="content_top">
				<div class="content_top_head">
					<div class="head_title">{{dataObj.food_name}}</div>
					<div class="head_bt">
						<span>月售</span>
						<span>{{dataObj.month_sale}}</span>
						<span>赞{{dataObj.like}}</span>
						<span>好评度{{dataObj.praise_score}}</span>
					</div>
				</div>
				<div class="content_top_bot">
					<div class="bot_fl">
						<div class="bot_fl_num">
							<span class="bot_fl_num——a">¥</span>
							<span class="bot_fl_num——a bot_fl_num——w">{{dataObj.is_limited?dataObj.current_price:dataObj.original_price}}</span>
							<span v-if="dataObj.is_limited">¥{{dataObj.original_price}}</span>
						</div>
						<div class="bot_fl_discount" v-if="dataObj.is_limited">
							<img src="@/assets/icon/zk.png">
							<span>{{dataObj.discount}}折 限{{dataObj.limited_num}}份</span>
						</div>
					</div>
					<div class="bot_fr">
						<div class="fr_box">
							<img src="@/assets/icon/tj.png">
							<span @click="menuFoodAdd">加入菜单</span>
						</div>
					</div>
				</div>
			</div>
			<div class="content_bt">
				<div class="bt_title">
					<span>商品评价</span>
					<div class="bt_title——ab">
						<span>{{leng}}条评论</span>
						<img src="@/assets/icon/icon14.png">
					</div>
				</div>
				<div class="bt_list" v-if="leng > 0">
					<div class="list_item" v-for="(item,index) in dataObj.comment_list" :key="index">
						<div class="item_fl"><img :src="item.headimg"></div>
						<div class="item_fr">
							<div class="fr_name">
								<span>{{item.username}}</span>
								<span class="fr_name——ab">{{item.comment_date}}</span>
							</div>
							<div class="fr_like">
								<img src="@/assets/icon/dz.png">
								<span>赞了该商品{{dataObj.comment_list.length}}</span>
							</div>
							<div class="fr_docs">{{item.content}}</div>
							<div class="fr_img image">
								<div  v-for="(col,i) in item.images" :key="i" :class="imgWidth(item.images.length)" class="img_box" >
									<img :src="col" @click="imgFull(item.images,i)" class="img">
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 数据为空组件 -->
				<NoData v-else  />
			</div>
		</div>
		<!-- 加载loading组件 -->
		<Loading v-if="!isLoad" />
		<!-- 提示组件 -->
		<HintMsg :hintMsg="msg" v-if="hasMsg" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Loading from "@/components/common/loading";
	import HintMsg from "@/components/common/hintMsg";
	import NoData from "@/components/common/noData";
	import {foodDetail,menuFoodAdd} from "@/api/scanCode";
	export default{
		name:"TakingOrderDetails",
		data(){
			return{
				food_id:1,				//菜品Id
				dataObj:{},				//详情数据
				canteen_id:1,			//餐厅id
				food_list:[],			//菜品列表
				isLoad:false,	//判断是否有数据,true是加载完成，false是加载中
				leng:0,
			}
		},
		/**
		 * 组件模板
		 */
		components: {
	    	Loading,
	    	HintMsg,
	    	NoData,
	    },
		/**
	     * 计算属性
	     */
	    computed: {
	    	...mapGetters([    
		      "hasMsg",
		    ])
		},
		/**
		 * 事件函数
		 */
		methods:{
			//详情数据
			foodDetail(){
				let data = {
					food_id:this.food_id
				}
				foodDetail(data).then((res)=>{
					if (res.data.code == 200) {
						this.isLoad = true;
						this.dataObj = res.data.data;
						this.leng =Object.keys(res.data.data.comment_list).length
						this.food_list =[ 
							{
								food_id:res.data.data.food_id,
								quantity:1
							}
						]						
					}else{
						this.$router.push({name:"LoadFail"});
					}
				}).catch(()=>{
					this.$router.push({name:"LoadFail"});
				})
			},
			//加入菜单
			menuFoodAdd(){
				let data = {
					add_type:2,
					canteen_id:this.canteen_id,
					food_list:this.food_list,
					user_id:this.$store.state.appCommon.user_id,
				}
				menuFoodAdd(data).then((res)=>{
					this.msg = res.data.msg;
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
				}).catch(()=>{

				})
			},
			//平论图片大小
			imgWidth(imgLeng){
				switch(imgLeng){
					case 1:
						return "img_1";
						break;
					case 2:
						return "img_2";
						break;
					case 4:
						return "img_4";
						break;
					default:
						return "img_3";
						break;
				}
			},
			//查看图片全屏
			imgFull(imgList,index){
				this.$router.push({name:"ImageFullScreen",params: {imgList: imgList,index:index}})
			},
			//图片比例自动缩放
			AutoSize(){
				let dome = document.getElementsByClassName('image');
				for(let i=0; i<dome.length;i++){ 
					let maxWidth = dome[0].clientWidth;
					let maxHeight = maxWidth*3/4;
					let child = dome[i].children;
					for(let j=0; j<child.length; j++){	//获取img父元素
						let startJ = j;
						let image = new Image();	 //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
						let Img = child[j].firstChild;
						image.src = Img.src;
						image.onload = function(){
							// 当图片比图片框小时不做任何改变
							if(image.width < maxWidth&& image.height < maxHeight){
								Img.width = image.width;
		                		Img.height = image.height;
							}else{
								//原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
								if (maxWidth/ maxHeight  <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
								{
									Img.width = maxWidth;   //以框的宽度为标准
									Img.height = maxWidth* (image.height / image.width);
								} 
								else {   //原图片宽高比例 小于 图片框宽高比例
									console.log(image.width / image.height)
									Img.width = maxHeight  * (image.width / image.height);
									Img.height = maxHeight;   //以框的高度为标准
								}
							}
							let minData = child[0].firstChild.height; //图片父元素最小高度
							//图片父元素最小高度
							if(Img.height < minData){
								// console.log(11)
								minData =  Img.height;
							}
							//根据图片个数给父元素最小高度,取最小图片的高度
							for (let k=0; k<child.length;k++) {
								child[k].style.height = minData + "px";
							}
						}
					}
				}
			},
		},
		/**
		 * 生命周期
		 */
		created(){
		},
		//挂载结束
		mounted(){
			// document.title = '菜品详情'
			this.food_id = this.$route.query.food_id;
			this.canteen_id = this.$route.query.canteen_id;
			this.foodDetail();
		},
		//组件销毁
    	destroyed(){
            window.removeEventListener('scroll', this.tabScroll);//监听页面滚动事件
        },
		//组件更新
		updated(){
			//图片比例自动缩放
			this.$nextTick(() => {
				this.AutoSize();
		    })
		},
		//进入路由之前执行的函数
		beforeRouteEnter (to, from, next) {
			next(vm => {
				//该页面有缓存，每次进入需要重新获取数据
				document.title = '菜品详情'
				vm.food_id = vm.$route.query.food_id;
				//进入该页面时，用之前保存的滚动位置赋值
				document.body.scrollTop = vm.scrollTop;
			})
		},
		//离开路由之前执行的函数
		beforeRouteLeave (to, from, next) {
			//在页面离开时记录滚动位置
			if(to.name == "ImageFullScreen"){
				this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			}else{
				this.scrollTop = 0;
			}
			next()
		},
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		height: 100%;
		background: #fff;
		position: relative;
		.detailsLogo{
			width: 100%;
			height: (580px/$px) + rem;
			img{
				background-size: 100% 100%;
			}
		}
		.detailsContent{
			width: 100%;
			position: absolute;
			top: (460px/$px) + rem;
			left: 0;
			border-radius: (50px/$px) + rem (50px/$px) + rem 0 0;
			overflow: hidden;
			background: #fff;
			.content_top{
				width: 100%;
				border-bottom: solid 1px #E2E1E6;
				.content_top_head{
					width: 100%;
					.head_title{
						color: #1A1A1A;
						width: 100%;
						font-size: (36px/$px) + rem;
						font-weight: bold;
						margin-top: (34px/$px) + rem;
					}
					.head_bt{
						color: #A5A5A5;
						width: 100%;
						font-size: (24px/$px) + rem;
						margin-top: (23px/$px) + rem;
						span{
							margin:0 (5px/$px) + rem;
						}
					}
				}
				.content_top_bot{
					width: 100%;
					padding:0 (30px/$px) + rem; 
					box-sizing: border-box;
					margin: (28px/$px) + rem 0;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					height: (90px/$px) + rem;
					.bot_fl{
						width: 50%;
						text-align: left;
						.bot_fl_num{
							color: #A2A2A2;
							font-size: (22px/$px) + rem;
							display: flex;
							align-items: center;
							.bot_fl_num——a{
								font-size: (30px/$px) + rem;
								color: #FF9000;
							}
							.bot_fl_num——w{
								font-size: (40px/$px) + rem;
								font-weight: bold;
								margin-right: (10px/$px) + rem;
							}
						}
						.bot_fl_discount{
							color: #FF9000;
							font-size: (22px/$px) + rem;
							display: flex;
							align-items: center;
							img{
								width: (26px/$px) + rem;
								height: (26px/$px) + rem;
								margin-right: (10px/$px) + rem;
							}
						}
					}
					.bot_fr{
						height: (90px/$px) + rem;
						display: flex;
						align-items: center;
						.fr_box{
							color: #FFFFFF;
							background:#FF9000;
							width: (175px/$px) + rem;
							height: (50px/$px) + rem;
							border-radius: (25px/$px) + rem;
							font-size: (24px/$px) + rem;
							display: flex;
							align-items: center;
							justify-content: center;
							img{
								width:(20px/$px) + rem;
								height: (20px/$px) + rem;
								margin-right: (20px/$px ) + rem;
							}
						}	
					}
				}
			}
			.content_bt{
				width: 100%;
				.bt_title{
					width: 100%;					
					padding:0 (30px/$px) + rem;
					box-sizing: border-box;
					font-size: (30px/$px) + rem;
					color: #1A1A1A;
					height: (96px /$px) + rem;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.bt_title——ab{
						display: flex;
						align-items: center;
						color: #A5A5A5;
						font-size: (20px/$px) + rem;
						img{
							width: (18px/$px) + rem;
							height: (31px/$px) + rem;
							margin-left: (24px/$px) + rem;
						}
					}
				}
				.bt_list{
					width: 100%;
					.list_item{
						width: 100%;
						border-bottom: solid 1px #E2E1E6;
						padding: 0 (30px/$px) + rem;
						box-sizing: border-box;
						display: flex;
						justify-content: flex-start;
						margin-bottom: (30px/$px) + rem;
						&:last-child{
							margin-bottom:0;
						}
						.item_fl{
							width: (78px/$px) + rem;
							height: (78px/$px) + rem;
						}
						.item_fr{
							width: (590px/$px) + rem;
							padding-left: (20px/$px) + rem;
							.fr_name{
								width: 100%;
								font-size: (24px/$px) + rem;
								color: #1A1A1A;
								height: (46px/$px) + rem;
								display: flex;
								flex-direction: row;
								justify-content: space-between;
								align-items: center;
								font-weight: bold;
								.fr_name——ab{
									color: #646464;									
									font-size: (20px/$px) + rem;
									font-weight: normal;
								}
							}
							.fr_like{
								color: #A5A5A5;
								font-size: (20px/$px) + rem;
								display: flex;
								align-items: center;
								img{
									width: (31px/$px) +  rem;
									height: (27px/$px) + rem;
									margin-right: (10px/$px) + rem;
								}
							}
							.fr_docs{
								width: 100%;
								font-size: (24px/$px) + rem;
								color: #1A1A1A;
								text-align: left;
								line-height: (48px/$px) + rem;
							}
							.fr_img{
								width: 100%;
								padding-top: (20px/$px) + rem;
								padding-bottom: (30px/$px) +rem;
								display: flex;
								align-items: center;
								justify-content: space-around;
								.img_box{
									overflow:hidden;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								.img{
									width: auto;
								}
								.img_1{
									width: 100%;
									justify-content: left;
								}
								.img_2{
									width: 50%;
									margin: (5px/$px) + rem;
									box-sizing: border-box;
								}
								.img_3{
									width: 33.33%;
									margin: (5px/$px) + rem;
									box-sizing: border-box;
								}
								.img_4{
									width: 25%;
									margin: (5px/$px) + rem;
									box-sizing: border-box;
								}
							}
						}
					}
				}
			}
		}
	}
</style>