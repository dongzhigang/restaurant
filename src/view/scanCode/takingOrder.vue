//菜品列表
<template>
	<div class="main">
		<div class="main_fl">
			<div class="rows" id="category">
				<div class="rows_col" v-for="(item,index) in typeList" :key="index" @click="clickScroll(index)">
					<span>{{item.category_name}}</span>
					<div class="rows_col——ab" v-if="item.sum>0">{{item.sum}}</div>
				</div>
			</div>
		</div>
		<div class="main_fr" id="list">
			<div class="list" v-for="(item,index) in dataList" :key="index">
				<div class="list_title">{{item.data_title}}</div>
				<router-link :to="'/scanCode/takingOrderDetails?food_id='+col.food_id+'&canteen_id='+canteen_id" class="list_item" v-for="(col,i) in item.data_list" :key="i">
					<div class="item_fl"><img  :src="col.list_image"></div>
					<div class="item_fr">
						<div class="fr_title">{{col.food_name}}</div>
						<div class="fr_num">
							<span class="fr_num——a">¥</span>
							<span class="fr_num——a fr_num——w">{{col.is_limited?col.current_price:col.original_price}}</span>
							<span>/{{col.unit}}</span>
							<span v-if="col.is_limited">限<label class="fr_num——a">{{col.limited_num}}</label>份</span>
						</div>
						<div class="fr_bt">
							<span><label v-if="col.is_limited">原价¥{{col.original_price}}</label></span>
							<div class="fr_bt_icon">
								<img src="@/assets/icon/hjan.png" class="fr_bt_icon_img" v-if="col.added_num>0" @click.prevent="delFood(index,i)">
								<span v-if="col.added_num>0">{{col.added_num}}</span>
								<img src="@/assets/icon/cj.png" class="fr_bt_icon_img" @click.prevent="addFood(index,i)">
							</div>
						</div>
					</div>
				</router-link>
			</div>			
		</div>
		<div class="main_cart">
			<div class="cart_box">
				<div class="cart_fl">
					<router-link to="/scanCode/myMenu" class="cart_fl_img">
						<img src="@/assets/icon/gwc.png">
						<span class="cart_fl_img——ab">{{cartCount}}</span>
					</router-link>
					<div class="cart_fl_num">
						<span class="fl_num_spam">
							<b class="fl_num_spam——w">¥{{total}}</b><!-- <label>¥78.00</label> -->
						</span>
						<span class="fl_num_spam">下单至大厅{{desk_no}}桌</span>
					</div>
				</div>
				<div class="cart_fr"><span  @click="menuFoodAdd">去下单</span></div><!--  to="/scanCode/myMenu" -->
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
	import {categoryList,foodList,menuFoodAdd} from "@/api/scanCode";
	import {returnFloat} from "@/assets/common";
	import HintMsg from "@/components/common/hintMsg";
	import Loading from "@/components/common/loading";
	export default{
		name:"TakingOrder",
		data(){
			return{
				typeList:[],	//菜品分类
				dataList:[],	//菜品列表
				cartCount:0,	//购物车数量
				total:0,		//总价
				isLoad:false,	//判断是否有数据,true是加载完成，false是加载中
				canteen_id:"",			//店铺id
				desk_no:"",				//餐桌号
				food_list:[],	//菜单列表
				msg:"",	//提示信息
			}
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
			//鼠标滑动
			tabScroll() {
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				let listDiv = document.getElementById('list');
				let categoryDiv = document.getElementById('category');
				let children = listDiv.children;
				let categoryChild = categoryDiv.children;
				for(let i=0;i<children.length;i++){
					if(scrollTop >= children[i].offsetTop){
						for(var j=0;j<categoryChild.length;j++){  
			               categoryChild[j].classList.remove("active");
			            }  
						categoryChild[i].classList.add("active");
					}
				}
			},
			//点击指定位置
			clickScroll(index){
				let listDiv = document.getElementById('list');
				let categoryDiv = document.getElementById('category');
				let children = listDiv.children;
				let categoryChild = categoryDiv.children;
				for(let i=0;i<children.length;i++){
					if(index == i){
						window.scrollTo(0,children[i].offsetTop);
						for(var j=0;j<categoryChild.length;j++){  
			               categoryChild[j].classList.remove("active");
			            }  
						categoryChild[i].classList.add("active");
					}
				} 
			},
			//菜品分类
			categoryList(){
				let data = {
					canteen_id:this.canteen_id,
				}
				categoryList(data).then((res)=>{
					if (res.data.code == 200) {
						res.data.data.map(function(v,i,arr){
							v.sum = 0;
						})
						this.typeList = res.data.data;
						this.isLoad = true;
						this.foodList();
					}else{
						this.isLoad = true;
						this.$router.push({name:"LoadFail"});
					}
				}).catch(()=>{
					this.$router.push({name:"LoadFail"});
				})
			},
			//菜品列表
			foodList(){
				let that = this;
				let data = {
					canteen_id:this.canteen_id,
					user_id:this.$store.state.appCommon.user_id
				}
				foodList(data).then((res)=>{
					let total=0;
					if (res.data.code) {
						res.data.data.map(function(val,index,array){
							val.data_list.map(function(v,i,arr){
								that.typeList[index].sum += arr[i].added_num;
								that.cartCount+=arr[i].added_num;
								//限制份数。超过的份数用原价
								if(v.added_num){
									if(v.is_limited){
										if(v.added_num > v.limited_num){
											total = parseFloat(returnFloat(total)) + (parseFloat(v.original_price)*(v.added_num - v.limited_num) + parseFloat(v.current_price)*v.limited_num);
										}else{
											total = parseFloat(returnFloat(total)) + parseFloat(v.current_price)*v.limited_num;
										}
									}else{
										total = parseFloat(returnFloat(total)) + parseFloat(v.original_price)*v.added_num;
									}
								}
								// that.total = returnFloat(parseFloat(that.total) + parseFloat(arr[i].current_price) * arr[i].added_num);
							})
						})
						this.total = returnFloat(total);
						this.dataList = res.data.data;
						this.isLoad = true;
					}else{
						this.isLoad = true;
						this.$router.push({name:"LoadFail"});
					}
				}).catch(()=>{
					this.isLoad = true;
					this.$router.push({name:"LoadFail"});
				})
			},
			//添加菜单
			menuFoodAdd(){
				let data = {
					add_type:1,
					canteen_id:this.canteen_id,
					food_list:this.getFoodList(this.dataList),
					user_id:this.$store.state.appCommon.user_id
				}
				if(!data.food_list.length){
					this.msg = "请点菜";
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
				}else{
					menuFoodAdd(data).then((res)=>{
						if(res.data.code == 200){
							this.$router.push({name:"MyMenu",query: {canteen_id: this.canteen_id,desk_no:this.desk_no}})
						}else{
							this.msg = res.data.msg;
							this.$store.state.appCommon.hasMsg = true;
							this.$store.dispatch('hasMsg');
						}
					})
				}
			},
			//获取下单菜品
			getFoodList(array){
				let obj,food_list = [];
				array.map((val,index,arr)=>{
					val.data_list.map((v,i)=>{
						if(v.added_num > 0){
							obj = {"food_id":v.food_id,"quantity":v.added_num};
							food_list.push(obj);
						}
					})
				})
				return food_list;
			},		
			//加菜
			addFood(pIndex,cIndex){
				let {typeList,dataList} = this;
				dataList[pIndex].data_list[cIndex].added_num++;
				typeList[pIndex].sum++;
				this.cartCount++;
				//限制份数。超过的份数用原价
				let added_num = dataList[pIndex].data_list[cIndex].added_num;
				let is_limited = dataList[pIndex].data_list[cIndex].is_limited;
				let limited_num = dataList[pIndex].data_list[cIndex].limited_num;
				let original_price = dataList[pIndex].data_list[cIndex].original_price;
				let current_price = dataList[pIndex].data_list[cIndex].current_price;
				let total = this.total;
				if(is_limited){
					if(added_num > limited_num){
						total = parseFloat(returnFloat(total)) + parseFloat(original_price);
					}else{
						total = parseFloat(returnFloat(total)) + parseFloat(current_price);
					}
				}else{
					total = parseFloat(returnFloat(total)) + parseFloat(original_price);
				}
				this.total = returnFloat(total);
			},
			//减菜
			delFood(pIndex,cIndex){
				let {typeList,dataList} = this;
				//限制份数。超过的份数用原价
				let added_num = dataList[pIndex].data_list[cIndex].added_num;
				let is_limited = dataList[pIndex].data_list[cIndex].is_limited;
				let limited_num = dataList[pIndex].data_list[cIndex].limited_num;
				let original_price = dataList[pIndex].data_list[cIndex].original_price;
				let current_price = dataList[pIndex].data_list[cIndex].current_price;
				let total = this.total;
				if(is_limited){
					if(added_num > limited_num){
						total = parseFloat(returnFloat(total)) - parseFloat(original_price);
					}else{
						total = parseFloat(returnFloat(total)) - parseFloat(current_price);
					}
				}else{
					total = parseFloat(returnFloat(total)) - parseFloat(original_price);
				}
				this.total = returnFloat(total);
				dataList[pIndex].data_list[cIndex].added_num--;
				typeList[pIndex].sum--;
				this.cartCount--;
			},
		},
		/**
		 * 组件模板
		 */
		components: {
	    	Loading,
	    	HintMsg,
	    },
		/**
		 * 生命周期
		 */
		//挂载结束
		mounted(){
			document.title = '菜品列表';
			this.desk_no = this.$route.query.desk_no;
			this.canteen_id = this.$route.query.canteen_id;
			//菜品分类
			this.categoryList();
			// 添加滚动事件，检测滚动到页面底部
			window.addEventListener('scroll', this.tabScroll);
		},
 		//组件销毁
    	destroyed(){
            window.removeEventListener('scroll', this.tabScroll);//取消页面滚动事件
        },
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";
	body,html{
		transform: scroll 1s;
	}
	.main{
		width: 100%;
		height: 100%;
		display: flex;
		position: relative;
		.main_fl{
			height: 100%;
			width: (190px/$px) + rem;
			background: #F1F0F5;
			position: fixed;
			top: 0;
			left: 0;
			.rows{
				width: 100%;				
				.rows_col{
					width: 100%;
					height: (80px/$px) + rem;
					border-bottom: solid 1px #E2E1E6;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #8C8C8C;
					font-size: (28px/$px) + rem;
					position: relative;
					.rows_col——ab{
						position: absolute;
						top: (4px/$px) + rem;
						right: (7px/$px) + rem;
						border-radius: 100%;
						background: #E71F19;
						font-size: (20px/$px) + rem;
						color: #fff;
						width: (40px/$px) + rem;
						height: (40px/$px) + rem;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					&.active{
						background: #fff;
						color: #FF9000;
					}
				}
			}
		}
		.main_fr{
			width: 100%;
			padding-left: (190px/$px) + rem;
			box-sizing: border-box; 
			.list{
				width: 100%;
				&:last-child{
					padding-bottom: (140px/$px) + rem;
				}				
				.list_title{
					border-bottom: dashed 1px #FF9000;
					width: 100%;
					height: (80px/$px) + rem;
					font-size: (36px/$px) + rem;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #FF9000;
					font-weight: bold;
				}
				.list_item{
					border-bottom: solid 1px #E2E1E6;
					width: 100%;
					padding: (27px/$px) + rem 0;
					padding-left: (17px/$px) +rem;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					.item_fl{
						width: (200px/$px) + rem;
						height: (140px/$px) + rem;
						border-radius: (25px/$px) + rem;
						overflow: hidden;
					}
					.item_fr{
						width: (343px/$px) + rem;
						height: (140px/$px) + rem;
						display: flex;	
						flex-flow: column;
						padding-left: (25px/$px) + rem;
						box-sizing: border-box;
						justify-content:space-around;
						.fr_title{
							width: 100%;
							color: #1A1A1A;
							font-size: (28px/$px) + rem;
						}
						.fr_num{
							color: #1A1A1A;
							font-size: (24px/$px) + rem;
							.fr_num——a{
								font-size: (28px/$px) + rem;
								color: #FF9000;
							}
							.fr_num——w{
								font-size: (34px/$px) + rem;
								font-weight: bold;
							}
						}
						.fr_bt{
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-between;
							color: #A2A2A2;
							font-size: (24px/$px) + rem;
							.fr_bt_icon{
								padding-right:  (30px/$px) + rem;
								display: flex;
								align-items: center;
								color: #1A1A1A;
								font-size: (30px/$px) + rem;
								span{
									margin:0 (5px/$px) + rem;
								}
								.fr_bt_icon_img{
									width: (37px/$px) + rem;
									height:  (37px/$px) + rem;
								}								
							}
						}
					}
				}
			}
		}
		.main_cart{
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 8;
			width: 100%;
			height: (130px/$px) + rem;
			background: rgba(255,255,255,0.8);
			padding: 0 (20px/$px) + rem;
			box-sizing: border-box;
			.cart_box{
				width: 100%;
				height: (100px/$px) + rem;
				background: #FF9000;
				border-radius: (50px/$px) + rem;
				overflow: hidden;
				display: flex;
				.cart_fl{
					width: (480px/$px) + rem;
					height: (100px/$px) + rem;
					background: #1A1A1A;
					display: flex;
					align-items: center;
					.cart_fl_img{
						width: (79px/$px) + rem;
						height:(76px/$px) + rem;
						margin-left: (50px/$px) + rem;
						position: relative;
						.cart_fl_img——ab{
							position: absolute;
							top: 0;
							right: -(15px/$px) + rem;
							width: (40px/$px) + rem;
							height: (40px/$px) + rem;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: (24px/$px) + rem;
							color: #fff;
							background: #E71F19;
							border-radius: 100%;
						}
					}
					.cart_fl_num{
						margin-left: (40px/$px) + rem;
						height: (100px/$px) + rem;
						display: flex;
						flex-flow: column;
						text-align: left;
						.fl_num_spam{
							font-size: (28px/$px) + rem;
							color: #999999;
							label{
								text-decoration: line-through;
							}
							.fl_num_spam——w{
								font-size: (46px/$px) + rem;
								color: #fff;
							}
						}
					}
				}
				.cart_fr{
					width: (225px/$px) + rem;
					height: (100px/$px)  +rem;
					font-size: (34px/$px) + rem;
					display: flex;
					align-items: center;
					justify-content: center;
					span{
						color: #fff;
					}
				}
			}
		}
	}
</style>