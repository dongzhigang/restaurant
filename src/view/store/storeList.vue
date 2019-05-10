<!-- 在线取号  餐厅列表 -->
<template>
	<div class="storeList">
		<div class="top">
			<div class="top_fl fl">
				<span>当前城市:</span>
				<span class="bold">{{city}}</span>
			</div>
			<div class="top_fr fr" @click="tapCity">
				<span v-if="hasCity">切换城市</span>
				<span v-else>
					收起
					<img src="@/assets/icon/jt02.png">
				</span>
			</div>
		</div>
		<div class="selectCity" v-if="!hasCity">
			<div class="city_box">
				<span class="city_item" v-for="(item,index) in cityArr" :key="index" @click="selectCity(item.city_id,item.city_name)">{{item.city_name}}</span>
			</div>
		</div>
		<!-- 餐厅列表 -->
		<div class="rows" id="dome" v-if="storeListArr.length > 0">
			<div class="col" v-for="(item,index) in storeListArr" :key="index">
				<router-link :to="'/store/takeNumber?canteen_id='+ item.canteen_id+'&current_lng_lat='+current_lng_lat">
					<div class="col_fl fl">
						<div class="col_fl_img">
							<img :src="item.list_image" class="img">
							<div v-if="item.crowd_status==1" class="col_fl_img——ab col_fl_img——green" >
								<span class="col_fl_img——rotate">空闲</span>
							</div>
							<div v-if="item.crowd_status==2" class="col_fl_img——ab col_fl_img——yellow">
								<span class="col_fl_img——rotate">拥挤</span>
							</div>
							<div v-if="item.crowd_status==3" class="col_fl_img——ab col_fl_img——red">
								<span class="col_fl_img——rotate">火爆</span>
							</div>
						</div>
						<div class="col_fl_bt">
							<img src="@/assets/icon/yjjx.png">
						</div>
					</div>
					<div class="col_fr fr">
						<div class="col_fr_box">
							<div class="col_fr_title">
								<span>{{item.canteen_name}}</span>
								<span class="col_fr_title——ab">{{item.canteen_distance}}</span>
							</div>
							<div class="col_fr_img">
								<div class="col_fr_img_box">									
									<img v-for="(col,i) in grade" :key="i" class="col_fr_img——wt" :src=" col < item.comment_score?require('@/assets/icon/starddd.png'):require('@/assets/icon/star.png')">
								</div>
								<div class="col_fr_img——ab">{{item.canteen_status > 1?"休息中":"正常营业"}}</div>
							</div>
							<div class="col_fr_dosc">{{item.tag_desc}}</div>
						</div>
						<div class="col_fr_bt">
							<div class="col_fr_bt_lt">
								<span class="col_fr_bt_a">排队</span>
								<span class="col_fr_bt_b">前方正在等待</span>
							</div>
							<div class="col_fr_bt_rt">
								<span class="col_fr_bt_c" v-if="item.waiting_desk > 0">
									<label>{{item.waiting_desk}}</label>
									桌
								</span>
								<span class="col_fr_bt_d" v-else>无需排队</span>
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>
		<!-- 加载到底 -->
		<IsNoData v-if="isNoData" />
		<BaseLoad v-if="isBase" />
		<!-- 加载loading组件 -->
		<Loading v-if="!isLoad" />
		<!-- 404组件 -->
		<!-- <LoadFail v-if="isLoadFail" /> -->
	</div>
</template>
<script>
	import IsNoData from "@/components/common/isNoData";
	import BaseLoad from "@/components/common/baseLoad";
	import Loading from "@/components/common/loading";
	import {storeList,cityList} from "@/api/store";
	import Wechat from "@/assets/wechat";
	import wx from 'weixin-js-sdk';
	export default {
		name: 'StoreList',
		data () {
		  return {
		  	city:"广州",		//城市
		  	hasCity:true, //true隐藏，false显示
		  	cityIndex:0,	//城市索引
		  	grade:[0,2, 4, 6, 8],	//评分数组
		  	page:1,//页数
		  	current_lng_lat:"113.329127,23.126902",	//经纬度
		  	city_id:1,//城市id
		  	storeListArr:[],	//列表数据
		  	cityArr:[],	//城市列表数据

		  	isLoad:false,//判断是否有数据,true是加载完成，false是加载中
		  	isBase:false,//底部加载，true是滑到底部出现
		  	isNoData:false,//true为没有数据显示
		  	REQUIRE:true,//阻止多次触底，true触底触发，false取消触底触发
		  }
		},
		/**
		 * 组件模板
		 */
		components: {
			BaseLoad,
	    	Loading,
	    	IsNoData,
	    },
	    /**
	     * 计算属性
	     */
	    computed:{
		},
		/**
		 * 事件
		 * @return {[type]} [description]
		 */
		methods:{
			// 获取城市列表
			cityList(){
				cityList().then((res)=>{
					if(res.data.code == 200){
						this.cityArr = res.data.data
					} 
				}).catch(()=>{

				})
			},
			//切换城市
			tapCity(){
				this.hasCity = !this.hasCity
			},
			//选择城市
			selectCity(city_id,city){
				this.city_id = city_id;
				this.city = city
				this.hasCity = !this.hasCity;
				this.page = 1;
				this.storeListArr = [];	//餐厅列表初始化
				this.storeList();
			},
			// 获取餐厅列表
			storeList() {
				let data = {
					page:this.page,
					current_lng_lat:this.current_lng_lat,
					city_id:this.city_id
				}
				storeList(data).then((res)=>{
					if(res.data.code == 200){
						this.isLoad = true;
						this.isBase = false;
						this.REQUIRE = true;
						this.storeListArr = this.storeListArr.concat(res.data.data)
					}else if(res.data.code == 201){
						//当返回数据为空
						this.isNoData = true;
						this.REQUIRE = false;
						this.isBase = false;
						this.isLoad = true;
					}else{
						this.isLoad = true;
					}
				}).catch(()=>{
					this.$router.push({name:"LoadFail"});
				})
			},
			//触底加载
			soleLoad(){
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
				let windowH = window.screen.height;
				let bodyH = document.body.clientHeight;
				if(((windowH + scrollTop) > bodyH) && this.REQUIRE){
					this.REQUIRE = false;
					this.isNoData = false;
					this.isBase = true;
					this.page+=1;
					setTimeout(function(){
						this.storeList();
					}.bind(this),1000)
				}
			},
			//微信当前位置
			wxConfig(){
				let that = this;
				Wechat();
				wx.ready(function(){// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					wx.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: function (res) {
							// that.current_lng_lat = res.longitude + "," + res.latitude
							that.storeList();
						},
						fall:function(){
						}
					});
				});
			}
		},
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		beforeMount(){
			this.cityList();
		},
		//挂载结束
		mounted(){
			document.title = '餐厅列表';
			this.wxConfig()
			// this.storeList();
		},
		//keep-alive缓冲激活时调用
		activated(){
			document.title = '餐厅列表';
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
	
	.storeList{
		width: 100%;
		height:100%;
		background: #F0EFF4;
		position: relative;
		.top{
			border-bottom: solid 1px #F0EFF4;
			height: (59px/$px) + rem;
			line-height: (59px/$px) + rem;
			padding: 0 (30px/$px) + rem;
			overflow: hidden;
			background: #fff;
			position: absolute;
			top: 0;
			left: 0;
			background: #fff;
			width: 100%;
			box-sizing: border-box;
			z-index: 100;
			.top_fl{
				color: #A6A6A6;
				font-size: (24px/$px) + rem;
				.bold{
					color: #000;
					font-weight: bold;
				}
			}
			.top_fr{
				width:(120px/$px) + rem;
				height:(40px/$px) + rem;
				line-height: (40px/$px) + rem;
				text-align: center;
				border:1px solid rgba(224,223,228,1);
				border-radius:3px;
				font-size: (22px/$px) + rem;
				color: #4D4D4D;
				margin-top: (8px/$px) + rem;
				span{
					display: flex;
					align-items: center;
					justify-content: center;
					width:(120px/$px) + rem;
					height:(40px/$px) + rem;
					img{
						width:(17px/$px) + rem;
						height:(10px/$px) + rem;
						margin-left: (10px/$px) + rem;
					}
				}
			} 
		}
		.selectCity{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height:100%;		
			background: rgba(0,0,0,0.5);
			z-index: 99;
			padding-top:(59px/$px) + rem; 
			box-sizing: border-box;
			.city_box{
				display: flex;
				align-items: center;
				justify-content:space-around;
				background: #fff;
				padding: (15px/$px) + rem 0;
				.city_item{
					font-size: (24px/$px) + rem;
					color: #1A1A1A;
					width: (200px/$px) + rem;
					height: (53px/$px) + rem;
					display: flex;
					align-items: center;
					border-radius: (5px/$px) + rem;
					background: #F0EFF4;
					justify-content: center;
				}
				.active{
					background: #FF9000;
					color: #fff;
				}
			}
		}
		.rows{
			width: 100%;
			background: #F0EFF4;
			padding-top: (59px/$px) + rem;
			.col{
				width: 100%;
				padding:0 (30px/$px) + rem;
				margin-bottom: (10px/$px)+rem;
				background:#fff;
				overflow: hidden;
				box-sizing: border-box;
				.col_fl{
					width: (170px/$px) + rem;
					.col_fl_img{
						width: 100%;
						border: solid 1px #E6E6E6;
						height: (110px/$px) + rem;
						position: relative;
						margin-top: (20px/$px) + rem;
						overflow: hidden;
						.img{
							width: 100%;
							height: (110px/$px) + rem;
							background-position: 100% 100%;
						}
						$bt_max:30px;
						$bt_min:10px;
						.col_fl_img——ab{
							position: absolute;
							top: 0;
							left: 0;
							color: #fff;
							z-index: 4;
							.col_fl_img——rotate{
								transform: rotate(-45deg);
								width: (60px/$px) +rem;
								font-size: (12px/$px) + rem;
								height: (60px/$px) +rem;
								display:flex;
								justify-content: center;
								position: absolute;
								top: (0px/$px) + rem;
								left:(0px/$px) + rem;;
								z-index: 5;

							}
						}
						.col_fl_img——red{
							&:after{
								content: "";
								position: absolute;
								top: 0;
								left: 0;
								border: solid ($bt_min/$px)+rem transparent;
								border-top: solid ($bt_min/$px)+rem #fff;
								border-left: solid ($bt_min/$px)+rem #fff;
								z-index: 3;
							}
							&:before{
								content: "";
								position: absolute;
								top: 0;
								left: 0;
								border: solid ($bt_max/$px)+rem transparent;
								z-index: 2;
								border-top: solid ($bt_max/$px)+rem #FF0000;
								border-left: solid ($bt_max/$px)+rem #FF0000;
							}
						}
						.col_fl_img——yellow{
							&:after{
								content: "";
								position: absolute;
								top: 0;
								left: 0;
								border: solid ($bt_min/$px)+rem transparent;
								border-top: solid ($bt_min/$px)+rem #fff;
								border-left: solid ($bt_min/$px)+rem #fff;
								z-index: 3;
							}
							&:before{
								content: "";
								position: absolute;
								top: 0;
								left: 0;
								border: solid ($bt_max/$px)+rem transparent;
								z-index: 2;
								border-top: solid ($bt_max/$px)+rem #FFB400;
								border-left: solid ($bt_max/$px)+rem #FFB400;
							}
						}
						.col_fl_img——green{
							&:after{
								content: "";
								position: absolute;
								top: 0;
								left: 0;
								border: solid ($bt_min/$px)+rem transparent;
								border-top: solid ($bt_min/$px)+rem #fff;
								border-left: solid ($bt_min/$px)+rem #fff;
								z-index: 3;
							}
							&:before{
								content: "";
								position: absolute;
								top: 0;
								left: 0;
								border: solid ($bt_max/$px)+rem transparent;
								z-index: 2;
								border-top: solid ($bt_max/$px)+rem #14D026;
								border-left: solid ($bt_max/$px)+rem #14D026;
							}
						}
					}
					.col_fl_bt{
						width: 100%;
						height: (47px/$px) + rem;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						img{
							width: (88px/$px) + rem;
							height: (28px/$px) + rem;
						}
					}
				}
				.col_fr{
					display:inline-block;
					width: (520px/$px) +rem;
					text-align: left;
					padding-left: (10px/$px) + rem;
					box-sizing: border-box;
					/*@media screen and ( min-width: 760px) {
						width: 75%;
					}*/
					.col_fr_box{
						border-bottom: solid 1px #F0EFF4;
						width: 100%;
						height: (132px/$px) + rem;
						padding:(5px/$px) + rem 0;
						box-sizing: border-box;
						display: flex;
						flex-flow: column;
						justify-content: space-between;
						.col_fr_title{
							position: relative;
							padding-top:(5px/$px) + rem;
							width: 100%;
							padding-right:(100px/$px) + rem;
							box-sizing: border-box;
							font-size: (24px/$px) + rem;
							color: #4D4D4D;
							.col_fr_title——ab{
								position: absolute;
								padding-top:(5px/$px) + rem;
								right: 0;
								top:0;
								color: #FF9000;
								font-size: (20px/$px) + rem;
							}
						}
						.col_fr_img{
							width: 100%;
							height: (30px/$px) + rem;
							font-size: 0;
							display: flex;
							align-items: center;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							.col_fr_img_box{
								.col_fr_img——wt{
									width: (20px/$px) + rem;
									height: (20px/$px) + rem;
									display: inline-block;
									margin-right: (5px/$px) + rem;
								}
							}
							.col_fr_img——ab{
								color: #BFBFBF;
								font-size: (18px/$px) + rem;
							}
						}
						.col_fr_dosc{
							font-size: (18px/$px) + rem;
							color: #BFBFBF;
							margin-top: (5px/$px) + rem;
						}
					}
					.col_fr_bt{
						width: 100%;
						font-size: (18px/$px) + rem;
						position: relative;
						display: flex;
						align-items: center;
						flex-direction: row;
						justify-content: space-between;
						height: (47px/$px) + rem;
						.col_fr_bt_lt{
							display:flex;
							align-items: center;
							justify-content: center;
							.col_fr_bt_a{		
								display: flex;					
								align-items: center;
								justify-content: center;
								width: (60px/$px) + rem;
								height: (35px/$px) + rem;
								text-align: center;
								font-size: (18px/$px) + rem;
								background: #FF9000;
								color: #fff;
								border-radius: (5px/$px) + rem;
								margin-right: (10px/$px) + rem;
							}
							.col_fr_bt_b{
								color: #BFBFBF;
							}
						}
						.col_fr_bt_rt{
							display: flex;
							align-items: center;
							.col_fr_bt_c{
								color: #BFBFBF;
								font-size: (18px/$px) + rem;
								label{
									color: #FF9000;
									font-size: (24px/$px) + rem;
									font-weight: bold;
								}
							}
							.col_fr_bt_d{
								color: #FF9000;
								font-size: (18px/$px) + rem;
								font-weight: bold;
							}
						}						
					}
				}
			}
		}
	}
</style>