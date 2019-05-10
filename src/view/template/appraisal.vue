<template>
	<div class="appraisal">
		<div class="content">
			<div class="stor_msg">
				<div class="store_img"><img :src="canteenInfo.canteen_image"></div>
				<span class="store_title">{{canteenInfo.canteen_name}}</span>
				<div class="store_r">
					<img :src="is_anonymous==1?require('@/assets/icon/g.png'):require('@/assets/icon/y.png')" class="store_r_img" @click="anonymity">
					<span>匿名评价</span>
				</div>
			</div>
			<div class="store_grade">
				<div class="store_grade_box">
					<img :src="item < grade?require('@/assets/icon/starddd.png'):require('@/assets/icon/star.png')"  v-for="(item,i) in grades" :key="i"  @click="storeGrade(i)">
					<!-- <img src="@/assets/icon/star.png">
					<img src="@/assets/icon/star.png">
					<img src="@/assets/icon/star.png">
					<img src="@/assets/icon/star.png"> -->
				</div>
			</div>
			<div class="store_add">
				<ul class="store_ul">
					<li class="store_li">
						<div class="store_li_left">
							<span class="store_li_a">口味</span>
							<span>
								<img :src="item < tasteGive?require('@/assets/icon/cp2.png'):require('@/assets/icon/cp.png')" v-for="(item,i) in grades" :key="i" @click="tasteGrade(i)" class="store_li_img" >
							</span>
						</div>
						<div class="store_li_right"><span class="store_li_c">{{gradesArr[tasteGive]}}</span></div>
					</li>
					<li class="store_li">
						<div class="store_li_left">
						<span class="store_li_a">服务</span>
						<span>
							<img :src="item < serveGIve?require('@/assets/icon/cp2.png'):require('@/assets/icon/cp.png')" v-for="(item,i) in grades" :key="i" @click="serveGrade(i)" class="store_li_img">
						</span>
						</div>
						<div class="store_li_right"><span class="store_li_c">{{gradesArr[serveGIve]}}</span></div>
					</li>
				</ul>
			</div>
			<div class="store_textarea">
				<textarea  placeholder="菜品口味如何，对服务有什么更好的建议吗？" v-model="content"></textarea>
				<div class="store_textarea——ab">至少输入8个字</div>
			</div>
			<div class="store_upload">
				<div class="upload_box">
					<div class="upload_img" v-for="(item,index) in uploadImgArray" :key="index"><img :src="item"><img src="@/assets/icon/delete.png" class="del_img" @click="delImg(index)" /></div>
					<div class="upload_img" @click="chooseImage">
						<img src="@/assets/icon/xj.png" class="upload_sc">
					</div>
				</div>
			</div>
			<ul class="store_ul">
				<li class="store_li" v-for="(item,index) in foodList" :key="index">
					<span>{{item.food_name}}</span>
					<span class="store_li——ab">
						<img :src="item.is_like==1?require('@/assets/icon/zan.png'):require('@/assets/icon/hzan.png')" @click="hasLike(index,1)">
						<img :src="item.is_like==2?require('@/assets/icon/cai.png'):require('@/assets/icon/hcai.png')" @click="hasLike(index,2)">
					</span>
				</li>
				<!-- <li class="store_li">
					<span>黑椒厚切嫩牛排</span>
					<span class="store_li——ab">
						<img src="@/assets/icon/zan.png">
						<img src="@/assets/icon/hcai.png">
					</span>
				</li>
				<li class="store_li">
					<span>黑椒厚切嫩牛排</span>
					<span class="store_li——ab">
						<img src="@/assets/icon/zan.png">
						<img src="@/assets/icon/hcai.png">
					</span>
				</li>
				<li class="store_li">
					<span>黑椒厚切嫩牛排</span>
					<span class="store_li——ab">
						<img src="@/assets/icon/zan.png">
						<img src="@/assets/icon/hcai.png">
					</span>
				</li> -->
			</ul>
		</div>
		<div :class="`submit ${(grade && content.length>8)?'active':null }`" @click="orderComment">提交</div>
		<!-- 提示组件 -->
		<HintMsg :hintMsg="msg" v-if="hasMsg" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { orderCommentBefore,orderComment } from '@/api/template';
	import Wechat from "@/assets/wechat";
	import wx from 'weixin-js-sdk';
	import HintMsg from "@/components/common/hintMsg";
	// import { ELOOP } from 'constants';
	export default{
		name:"Appraisal",
		data(){
			return{
				grades:[0,1,2,3,4],
				gradesArr:["","很差","一般","满意","非常满意","无可挑剔"],	
				grade:0,			//店铺评分
				tasteGive:0,		//口味评分
				serveGIve:0,		//服务评分
				is_anonymous:0,	//是否匿名，1是，0否
				content:"",			//评价内容
				order_id:"",	//订单id
				canteenInfo:{},
				foodList:[],	//点过菜品列表
				uploadImgArray:[],	//上传图片
				serverId:[],		//返回图片的服务器端ID
				msg:"",	//提示信息、
				REQUIRE:true,	//防止多次提交
			}
		},
		/**
		 * 组件模板
		 */
		components: {
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
			//店铺评分
			storeGrade(index){
				this.grade = index+1;
			},
			//口味评分
			tasteGrade(index){
				this.tasteGive = index+1;
			},
			//服务评分
			serveGrade(index){
				this.serveGIve = index+1;
			},
			//匿名
			anonymity(){
				this.is_anonymous = this.is_anonymous==1?0:1;
			},
			//点赞
			hasLike(index,isLike){ //index当前索引，isLike点赞状态
				this.foodList.map((v,i)=>{
					if(index == i){ //判断点击那个
						if(v.is_like == isLike){ //取消点赞
							v.is_like = 0;
						}else{	//点赞
							v.is_like = isLike;
						}
					}
				})
			},
			//展示菜品
			orderCommentBefore(){
				let data = {
					order_id:this.order_id
				}
				orderCommentBefore(data).then((res)=>{
					if(res.data.code == 200){
						console.log(res)
						res.data.data.food_list.map((v,i)=>{
							v.is_like = 0;			//点赞情况 0未赞 1赞 2踩
						})
						this.foodList = res.data.data.food_list
						this.canteenInfo = res.data.data.canteen_info
					}
				})
			},
			//拍照或从手机相册中选图接口
			chooseImage(){
				let that = this;
				Wechat();
				wx.ready(function(){// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					wx.chooseImage({
						count: 4, // 默认9
						sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
						success: function (res) {
							this.uploadImgArray = null;		//重新选择图片，重新初始化
							this.serverId = [];		//重新上传图片，重新初始化
							that.uploadImgArray = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							let i = 0,length = res.localIds.length;
							that.uploadImage(res.localIds,i,length)
						}
					});
				});

			},
			//上传的图片到微信
			uploadImage(localIds,i,length){	
				let that = this;
				wx.uploadImage({
					localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
						i++;
						that.serverId.push(res.serverId); // 返回图片的服务器端ID
						if (i < length) {
								that.uploadImage(localIds,i,length);
						}

					},
					fail: function(res) {
							alert(JSON.stringify(res));
					}
				});
			},
			//删除图片
			delImg(index){
				this.uploadImgArray.splice(index,1);
				this.serverId.splice(index,1)
			},
			//提交效验
			verifyComment(){
				if(!this.grade){
					this.msg = "店铺还没评价";
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
					return false;
				}else if(!this.content.length){
					this.msg = "评价内容还没填或没有超过8个字";
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
					return false;
				}
				return true;
			},
			//提交评论
			orderComment(){
				let data = {
					user_id:this.$store.state.appCommon.user_id,	//用户ID
					order_id:this.order_id,		//订单id
					score:this.grade,		//店铺评分
					taste_score:this.tasteGive,	//口味评分
					service_score:this.serveGIve,	//服务评分
					is_anonymous:this.is_anonymous,	//是否匿名 1是 0否
					content:this.content,	//评价内容
					media_ids:this.serverId,	//评论多图
					food_list:this.foodList

				}
				if(this.verifyComment()){
					if(!this.REQUIRE){
						this.msg = "您已评价成功了~~~~~";
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
						return false
					}
					orderComment(data).then((res)=>{
						//初始化
						this.grade = 0;			//店铺评分
						this.tasteGive = 0;		//口味评分
						this.serveGIve = 0;		//服务评分
						this.is_anonymous = 0;	//是否匿名，1是，0否
						this.content = "";			//评价内容
						this.foodList.map((v,i)=>{
							v.is_like = 0;
						});	//点过菜品列表
						this.uploadImgArray = [];	//上传图片
						if(res.data.code == 200){
							this.REQUIRE = false;
						}
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
					})
				}
			}

		},
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		created(){
			//jssdk配置
			Wechat()
		},
		//挂载结束
		mounted(){
			document.title = '评价';
			this.order_id = this.$route.query.order_id;
			this.orderCommentBefore();
			
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSIze.scss";

	.appraisal{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		padding:(10px/$px) + rem;
		padding-top: 0;
		padding-bottom: (110px/$px) + rem;
		box-sizing: border-box;
		.content{
			width: 100%;
			padding: 0 (30px/$px) + rem;
			background: #fff;
			box-sizing: border-box;
			.stor_msg{
				width: 100%;
				border-bottom: solid 1px #F0EFF4;
				height: (117px/$px) + rem;
				display: flex;;
				align-items: center;
				font-size: (30px/$px) + rem;
				color: #333333;
				position: relative;
				.store_img{
					width: (84px/$px) + rem;
					height: (84px/$px) + rem;
					border-radius: 100%;
					overflow:hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.store_title{
					margin-left: (20px/$px) + rem;
				}
				.store_r{
					position: absolute;
					height: (117px/$px) + rem;
					top: 0;
					right: 0;
					display: flex;
					align-items: center;
					font-size: (22px/$px) + rem;
					color: #1A1A1A;
					.store_r_img{
						width: (32px/$px) + rem;
						height: (32px/$px) + rem;
						margin-right: (12px/$px) + rem;
					}
				}
			}
			.store_grade{
				width: 100%;
				height: (95px/$px) + rem;
				display: flex;
				align-items: center;
				justify-content: center;
				.store_grade_box{
					display: flex;
					align-items: center;
					img{
						width: (52px/$px) + rem;
						height: (48px/$px) + rem;
						margin:0 (10px/$px) + rem;
					}
				}
			}
			.store_add{
				width: 100%;
				height: (193px/$px) + rem;
				background: #F6F5FA;
				opacity: 0.8;
				display: flex;
				align-items: center;
				justify-content: center;
				.store_ul{
					.store_li{
						width: 100%;
						font-size: (24px/$px) + rem;
						color: #999999;
						display: flex;
						align-items: center;
						justify-content: space-around;
						margin:(18px/$px) + rem 0;
						.store_li_left,.store_li_right{
							display: flex;
							align-items: center;
						}
						.store_li_left{
							padding-left: (50px/$px) + rem;
						}
						.store_li_right{
							width: (100px/$px) + rem;
							justify-content: flex-start;
						}
						.store_li_a{
							margin-right: (23px/$px) + rem;
						}
						.store_li_img{
							width: (47px/$px) + rem;
							height: (47px/$px) + rem;
							margin-left: (23px/$px) + rem;
						}
					}					
				}
			}
			.store_textarea{
				width: 100%;
				height: (195px/$px) + rem;
				margin-top: (40px/$px) + rem;
				position: relative;
				.store_textarea——ab{
					position: absolute;
					bottom: (17px/$px) + rem;
					right: (17px/$px) + rem;
					font-size: (20px/$px) + rem;
					color: #999999;
				}
				textarea{
					width: 100%;
					height: (195px/$px) + rem;
					padding: 0 (15px/$px) + rem;
					line-height: (35px/$px) + rem;
					border: solid 2px #E2E1E6;
					background: #FAFAFC;
					box-sizing: border-box;
					font-size: (24px/$px) + rem;
					color: #BFBFBF;
					padding-bottom: (35px/$px) + rem;
				}
			}
			.store_upload{
				width: 100%;
				margin-top: (20px/$px) + rem;
				.upload_box{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					.upload_img{
						width: (125px/$px) + rem;
						height: (125px/$px) + rem;
						margin-right: (15px/$px) + rem;
						display: flex;
						align-items: center;
						justify-content: center;
						border: solid 2px #E2E1E6;
						box-sizing: border-box;
						position: relative;
						img{
							width: 100%;
							height: 100%;
							&.del_img{
								width: (30px/$px) + rem;
								height: (30px/$px) + rem;
								position: absolute;
								right: (-15px/$px) + rem;
								top: (-15px/$px) + rem;
							}
						}
						&:last-child{
							margin:0;
						};
						.upload_sc{
							width: (63px/$px) + rem;
							height: (51px/$px) + rem;
						}
					}
				}
			}
			.store_ul{
				width: 100%;
				margin-top: (30px/$px) + rem;
				.store_li{
					width: 100%;
					font-size: (22px/$px) + rem;
					color: #1A1A1A;
					position: relative;
					height: (50px/$px) + rem;
					display: flex;
					align-items: center;
					.store_li——ab{
						position: absolute;
						top: 0;
						right: 0;
						height: (50px/$px) + rem;
						display: flex;
						align-items: center;
						img{
							width: (81px/$px) + rem;
							height: (34px/$px) + rem;
							margin-left: (10px/$px) + rem;
						}
					}
				}
			}
		}
		.submit{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: (99px/$px) + rem;
			background: #999;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: (30px/$px) + rem;
			color: #FFFFFF;
			&.active{
				background: #FF9000;
			}
		}
	}
</style>