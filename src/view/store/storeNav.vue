<template>
	<div class="main">
		<div class="list">
			<div class="list_item" v-for='(item,index) in storeNavList' :key="index">
				<img :src="item.list_image"  class="item_fl">
				<div class="item_fr">
					<div class="item_fr_a">
						<div class="fr_title">{{item.canteen_name}}</div>
						<div class="fr_address">
							<img class="fr_address_img" src="../../assets/icon/icon19.png">
							<span class="fr_address——h">{{item.address}}</span>
						</div>
						<div class="fr_address">
							<img class="fr_address_img" src="../../assets/icon/icon18.png">
							<a class="fr_address——color" :href="'tel:'+item.phone">{{item.phone}}</a>
						</div>
					</div>
					<div class="item_fr_b">
						<!-- http://api.map.baidu.com/marker?location=40.047669,116.313082&title=我的位置&content=百度奎科大厦&output=html&src=webapp.baidu.openAPIdemo  -->
						<a :href="'http://api.map.baidu.com/marker?location='+location(item.lng_lat)+'&title='+item.canteen_name+'&content='+item.address+'&output=html&src=webapp.baidu.openAPIdemo'">查找店铺</a>
						<!-- <a :href="'https://apis.map.qq.com/uri/v1/marker?marker=coord:'+location(item.lng_lat)+';title:'+item.canteen_name+'addr:'+item.address+'&referer=myapp'">查找店铺</a> -->
					</div>
				</div>
			</div>
		</div>
		<!-- 加载到底 -->
		<IsNoData v-if="isNoData" />
		<BaseLoad v-if="isBase" />
		<!-- 加载loading组件 -->
		<Loading v-if="!isLoad" />
	</div>
</template>
<script> 
	import IsNoData from "@/components/common/isNoData";
	import BaseLoad from "@/components/common/baseLoad";
	import Loading from "@/components/common/loading";
	import {guideList} from "@/api/store";
	export default{
		name:"StoreNav",
		data(){
			return{
				page:1,
				storeNavList:[],

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
		 * 事件
		 * @return {[type]} [description]
		 */
		methods:{
			//数据列表
			guideList(){
				let data = {
					page:this.page
				}
				guideList(data).then((res)=>{
					if(res.data.code == 200){
						// console.log(res.data.data)
						// res.data.data.map((v,i)=>{
						// 	let arr = v.lng_lat.split(",");
						// 	v.lng_lat = arr[1] + "," + arr[0];
						// })
						console.log(res.data.data)
						this.isLoad = true;
						this.isBase = false;
						this.REQUIRE = true;
						this.storeNavList = res.data.data.concat(this.storeNavList)
						console.log(this.storeNavList)
						//当返回数据为空
						if(!res.data.data.length){
							this.isNoData = true;
							this.REQUIRE = false;
						}
					}else{
						setTimeout(function(){
							this.isLoad = true;
							this.$router.push({name:"LoadFail"});
						}.bind(this),3000)
					}
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
						this.guideList();
					}.bind(this),1000)
				}
			},
			//位置
			location(val){
				let arr = val.split(",");
				return arr[1] + "," + arr[0];
			}
		},
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		//挂载结束
		mounted(){
			document.title = '店铺导航';
			this.guideList();
		},
		//keep-alive缓冲激活时调用
		activated(){
			document.title = '店铺导航';
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
		height: 100%;
		background: #F0EFF4;
		.list{
			width: 100%;
			.list_item{
				width: 100%;
				padding: (10px/$px) +rem (15px/$px) +rem;
				background: #fff;
				margin-bottom: (20px/$px) + rem;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				align-items: center;
				overflow: hidden;
				.item_fl{
					width: (210px/$px) + rem;
					height: (150px/$px) + rem;
				}
				.item_fr{
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding-left: (20px/$px) + rem;
					align-items: center;
					box-sizing: border-box;
					.item_fr_a{
						.fr_title{
							color: #1A1A1A;
							width: 100%;
							font-size: (38px/$px) + rem;
							height: (48px/$px) + rem;
							display: flex;
							align-items: center;
							font-weight: 500;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.fr_address{
							width: 100%;
							color: #939393;
							font-size: (24px/$px) + rem;
							display: flex;
							align-items: center;

							.fr_address_img{
								width: (25px/$px) + rem;
								height: (25px/$px) + rem;
								margin-top: (5px/$px) + rem;
							}
							span{
								width: 100%;
								text-align: left;
								padding-left: (10px/$px) + rem;
								box-sizing: border-box;
								display: flex;
								align-items: center;
								&.fr_address——h{
									height: (70px/$px) + rem;
								}
							}
							a{
								padding-left: (10px/$px) + rem;
								&.fr_address——color{
									color: #FF9000;
									text-decoration: underline;
								}
							}
						}
					}
					.item_fr_b{
						width: (134px/$px) + rem;
						height:  (134px/$px) + rem;
						border-radius: (10px/$px) + rem;
						background:#FF9000;
						font-size: (38px/$px) + rem;
						padding: (20px/$px) + rem (20px/$px) + rem;
						box-sizing: border-box;
						margin-left: (20px/$px) + rem;
						display: flex;
						align-items: center;
						justify-content: center;
						a{
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>