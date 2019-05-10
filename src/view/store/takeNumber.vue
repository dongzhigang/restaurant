<template>
	<div class="main">
		<div class="take_header">
			<div class="header_fl">
				<img :src="StoreData.list_image" class="img">
			</div>
			<div class="header_fr">
				<div class="title">{{StoreData.canteen_name}}</div>
				<div class="docs">{{StoreData.tag_desc}}</div>
				<div class="bt">
					<div class="bt_img">
						<img v-for="(item,index) in grades" :key="index"  class="bt_icon" :src="item < StoreData.comment_score?require('../../assets/icon/starddd.png'):require('../../assets/icon/star.png')">
					</div>
					<div class="bt——ab">秒排</div>
				</div>
			</div>
		</div>
		<div class="take_address">
			<span class="address_a">
				<img src="../../assets/icon/icon01.png" class="address_a_icon">
				<a class="address_b" @click="openLocation">{{StoreData.address}}</a>
			</span>
			<span class="address_c">
				<a :href="'tel:'+ StoreData.phone">
					<img class="address_c——img" src="../../assets/icon/icon02.png">
				</a>
			</span>
		</div>
		<div class="take_tab">
			<div class="tab_top">
				<div class="tab_top_lt">
					<img class="tab_top——img" src="../../assets/icon/icon03.png">
					<span class="tab_top——text">排队取号</span>
				</div>
				<span class="tab_top——ab">等待时间仅供参考</span>
			</div>
			<!-- 取号选择人数 -->
			<template v-if="StoreData.canteen_status == 1">
				<div class="tab_number">
					<ul class="tab_ul">
						<li class="tab_li" v-for="(item,index) in StoreData.canteen_desk" :key="index"> 
							<span class="li_col">
								<label>{{item.desk_name}}</label>
								<label class="li_col——gray">{{item.dinner_num_desc}}</label>
							</span>
							<span class="li_col">
								<label>前方<b class="li_col——pro">{{item.waiting_num}}</b>桌</label>
							</span>
							<span class="li_col">
								<label class="li_col——gray">约{{item.waiting_time>0?item.waiting_time:"--"}}分钟</label>
							</span>
						</li>
					</ul>
					<div class="tab_btn">
						<!-- 未取号 -->
						<div class="tab_btn_list" v-if="StoreData.queue_status > 1">
							<div class="tab_btn_item">
								<span>当前距离</span>
								<label>{{StoreData.canteen_distance}}</label>
							</div>
							<div class="tab_btn_item">
								<span>限制距离</span>
								<label>{{StoreData.limit_distance}}</label>
							</div>
						</div>
						<!-- 已经取号显示单号 -->
						<div class="tab_order" v-else>
							<span class="tab_order_span">
								<label>单号</label>
								<label><b class="tab_order_label——pro">{{StoreData.queue_desk.order_name}}</b></label>
							</span>
							<span class="tab_order_span">
								<label>还需等待</label>
								<label class="tab_order_label——grey"><b class="tab_order_label——pro">{{StoreData.queue_desk.waiting_num}}</b>桌</label>
							</span>
							<span class="tab_order_span">
								<label>预估等待</label>
								<label class="tab_order_label——grey">{{StoreData.queue_desk.waiting_time>0?StoreData.queue_desk.waiting_time:"--"}}</label>
							</span>
						</div>
						<!-- 取号 -->
						<div class="tab_ul——but" @click="dialogShow" v-if="StoreData.queue_status > 1">立即取号</div>
						<div class="tab_ul——but" @click="cancelQueueUp" v-else>取消排队</div>
					</div>		
				</div>
				<div class="tab_text">{{StoreData.queue_rule}}</div>
			</template>
			<!-- 暂停取号 -->
			<div class="tab_stop" v-else>餐厅当前暂停取号</div>
		</div>
		<div class="take_bt">
			<div class="bt_more">更多信息</div>
			<div class="bt_list">
				<ul>
					<li>
						<img src="../../assets/icon/icon04.png">
						<span>营业时间:{{StoreData.open_time}}</span>
					</li>
				</ul>				
			</div>
			<router-link :to="'/store/appraise?canteen_id='+canteen_id" class="bt_eval">
				<img src="../../assets/icon/icon05.png">
				<span>我要评价</span>
			</router-link>
		</div>

		<!-- 弹窗dialog -->
		<div class="dialog" v-if="hasDialog">
			<div class="dialog_phone" v-if="!isLonin">
				<div class="dialog_top">绑定手机号</div>
				<ul class="dialog_ul">
					<li class="dialog_li">
						<input type="number" placeholder="请输入手机号码" name=""  v-model="phone">
						<label class="dialog_li_a" @click="getPhoneCode">获取验证码</label>
					</li>
					<li class="dialog_li">
						<input type="number" placeholder="请输入验证码" name="" v-model="sms_code">
						<label class="dialog_li_b">{{time}}s</label>
					</li>
				</ul>
				<div class="dialog_bt">
					<div class="dialog_bt_a" @click="dialogShow">取消</div>
					<div class="dialog_bt_a dialog_bt_a——red" @click="boundPhone">立即绑定</div>
				</div>
			</div>
			<!-- 选择就餐人数 -->
			<div class="dialog_num" v-else>
				<div class="dialog_num_title">请选择就餐人数</div>
				<div class="dialog_num_number">
					<ul>
						<li v-for="(item,index) in repastNumber" :key="item">
							<span @click="selectNum(index,item)" :class="atPresentIndex==index?'active':''">{{item}}</span>
						</li>
						<li @click="moreRepastNumber" v-if="repastNumber == 11"><span>更多</span></li>
					</ul>
				</div>
				<div class="dialog_num_btn">
					<span @click="dialogShow">取消</span>
					<span class="dialog_num_btn——pro" @click="takeNumber">确定</span>
				</div>
			</div>
		</div>
		<!-- 提示组件 -->
		<HintMsg :hintMsg="msg" v-if="hasMsg" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Wechat from "@/assets/wechat";
	import wx from 'weixin-js-sdk';
	import HintMsg from "@/components/common/hintMsg";
	import {storeData,takeNumber,cancelQueue} from "@/api/store";
	import {sendSmsCode,boundPhone,wxConfig} from "@/assets/common";
	export default {
		inject:['reload'],
		name:"TakeNumber",
		data() {
			return{
				canteen_id:"",
				StoreData:{},
				// 评价数组
				grades:[0,2,4,6,8], 
				//判断是否可以取号
				isTake:true,
				//判断是否下单
				isOrder:false,
				//弹出dialog,true弹出，false隐藏
				hasDialog:false,
				//倒计时
				time:60,
				//判断是否可以点击验证码
				hasTime:true,
				// 就餐人数
				repastNumber:11,
				//当前人数索引
				atPresentIndex:0,
				//就餐人数
				dinner_num:1,
				//手机号码
				phone:"",
				//手机验证码
				sms_code:"",
				//提示信息
				msg:"提示信息",
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
				]),
			// 是否登录
			isLonin(){
				return this.$store.state.appCommon.phone?true:false;
			}
		},
		/**
		 * 事件
		 */
		methods:{
			//显示dialog
			dialogShow() {
				this.hasDialog = !this.hasDialog;
				this.repastNumber = 11;
			},
			//倒计时
			dateTime() {
				let time = 60;
				this.hasTime = false
				let tavl = setInterval(function(){
					time--;
					this.time = time
					if(time <= 0){
						this.hasTime = true;
						this.time = 60;
						clearInterval(tavl);
					}
				}.bind(this),1000);
			},
			//获取就餐人数
			moreRepastNumber(){
				this.repastNumber = 27;
			},
			//微信内置地图
			openLocation(){
				let location = this.$route.query.current_lng_lat.split(",");
				let that = this;
				Wechat();
				wx.ready(function(){// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					wx.openLocation({
						latitude: location[0], // 纬度，浮点数，范围为90 ~ -90
						longitude: location[1], // 经度，浮点数，范围为180 ~ -180。
						name: that.StoreData.canteen_name, // 位置名
						address: that.StoreData.address, // 地址详情说明
						scale: 26, // 地图缩放级别,整形值,范围从1~28。默认为最大
						infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
					});
				});
			},
			//店铺数据
			storeData(){
				let data = {
					user_id:this.$store.state.appCommon.user_id,
					canteen_id:this.$route.query.canteen_id,
					current_lng_lat:this.$route.query.current_lng_lat
				}
				storeData(data).then((res)=>{
					if(res.data.code == 200){
						this.StoreData = res.data.data
					}
				}).catch(()=>{
					this.$router.push({name:"LoadFail"});
				})
			},
			//获取手机验证码
			getPhoneCode(){
				//验证手机号码
				let myreg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
				if(!myreg.test(this.phone.replace(/(^\s*)|(\s*$)/g, ""))){
					this.msg = "手机号码格式不对";
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
					return;
				}
				//获取验证码
				if(this.hasTime){
					let data = {
						phone:this.phone.replace(/(^\s*)|(\s*$)/g, "")
					}
					sendSmsCode(data).then((res)=>{
						if (res.data.code == 200) {
							// 倒计时
							this.dateTime();
							this.msg = "发送成功";
							this.$store.state.appCommon.hasMsg = true;
							this.$store.dispatch('hasMsg');
						}else{
							this.msg = res.data.msg;
							this.$store.state.appCommon.hasMsg = true;
							this.$store.dispatch('hasMsg');
						}
					}).catch(()=>{

					})					
				}
			},
			//绑定手机
			boundPhone(){
				let data = {
					user_id:this.$store.state.appCommon.user_id,
					phone:this.phone,
					sms_code:this.sms_code
				}
				let myreg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
				if(myreg.test(this.phone.replace(/(^\s*)|(\s*$)/g, "")) && this.sms_code){
					boundPhone(data).then((res)=>{
						console.log(res)
						if(res.data.code == 200){  
							//用户手机号码
							this.$store.commit('updatePhone',this.phone);
							let user = JSON.parse(localStorage.getItem("user"));
							user.phone = this.phone;
							localStorage.setItem("user",JSON.stringify(user))
							console.log(JSON.parse(localStorage.getItem("user")))
							this.phone = "";
							this.time = 60;
							// this.msg = res.data.msg;
							// this.$store.state.appCommon.hasMsg = true;
							// this.$store.dispatch('hasMsg');
						}else{
							this.sms_code = "";
							this.msg = res.data.msg;
							this.$store.state.appCommon.hasMsg = true;
							this.$store.dispatch('hasMsg');
						}
					}).catch(()=>{

					})
				}else{
					this.msg = "手机和验证码不能为空";
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
				}
			},
			//选择就餐人数
			selectNum(index,value){
				this.atPresentIndex = index;
				this.dinner_num = value;
			},
			//立即取号
			takeNumber(){
				let data = {
					user_id:this.$store.state.appCommon.user_id,
					dinner_num:this.dinner_num,
					canteen_id:this.$route.query.canteen_id
				}
				takeNumber(data).then((res)=>{				
					if (res.data.code == 200) {
						this.hasDialog = false
						this.$router.push({name:"CreateOrder",query:{queue_id:res.data.data.queue_id}});
					}else{
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
					}
				}).catch(()=>{
					
				})

			},
			//取消排队
			cancelQueueUp(){
				let data = {
					queue_id:this.StoreData.queue_desk.queue_id
				}
				cancelQueue(data).then((res)=>{
					if(res.data.code == 200){
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
						setTimeout(()=>{
							this.reload();
						},1000)
					}else{
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
					}
				})
			}

		},
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		beforeMount(){
		},
		mounted(){
			document.title = '排队取号';
			this.canteen_id = this.$route.query.canteen_id;
			this.storeData();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		.take_header{
			width: 100%;
			border-bottom: solid 1px #E6E6E6;
			background: #fff;
			padding: (15px/$px) + rem (30px/$px) + rem;
			display: flex;
			justify-content: flex-start;
			box-sizing: border-box;
			.header_fl{
				width: (170px/$px) + rem;
				height: (120px/$px) + rem;
				border:solid 1px #E6E6E6;
				.img{
					width: 100%;
					height: (120px/$px) + rem;
					background-position: 100% 100%;
				}
			}
			.header_fr{
				text-align: left;
				width: (520px/$px) +rem;
				height: (120px/$px) + rem;
				padding-left: (10px/$px) + rem;
				box-sizing: border-box;
				display: flex;
				flex-flow: column;
				justify-content:space-between;
				.title{
					width: 100%;
					color: #4D4D4D;
					font-weight: bold;
					font-size: (26px/$px) + rem;
				}
				.docs{
					color: #4D4D4D;
					font-size: (20px/$px) + rem;
				}
				.bt{
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.bt_img{
						display: flex;
						align-items: center;
						.bt_icon{
							width: (20px/$px) + rem;
							display: inline-block;
							margin-right: (5px/$px) + rem;
						}
					}
					.bt——ab{
						width: (60px/$px) + rem;
						text-align: center;
						height: (36px/$px) + rem;
						display:flex;
						align-items:center;
						justify-content: center;
						background: #FF9000;
						color: #fff;
						font-size: (18px/$px) + rem;
						border-radius: (5px/$px) + rem;
					}
				}
			}
		}
		.take_address{
			width: 100%;
			background: #fff;
			height: (70px/$px) + rem;
			line-height: (70px/$px) + rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.address_a{
				display: flex;
				align-items: center;
				margin-left: (20px/$px) + rem;
				.address_a_icon{

					width: (40px/$px) + rem;
				}
			}
			.address_b{
				text-align: left;
				width: (590px/$px) + rem;
				padding-right: (10px/$px) + rem;
				box-sizing: border-box;
				color: #4D4D4D;
				font-size: (24px/$px) + rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.address_c{
				border-left: solid 1px #F0EFF4;
				height: (50px/$px) + rem;
				padding: 0 (30px/$px) + rem;
				display: flex;
				a{
					display: flex;
					align-items: center;
				}
				.address_c——img{
					width: (40px/$px) + rem;
					height: (40px/$px) + rem;
				}
			}
		}
		.take_tab{
			width: 100%;
			margin-top: (15px/$px) + rem;
			background: #fff;
			.tab_top{
				border-bottom: solid 1px #F0EFF4;
				width: 100%;
				height: (87px/$px) + rem;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 0 (30px/$px) + rem;
				box-sizing: border-box;
				.tab_top_lt{
					display: flex;
					align-items: center;
					.tab_top——img{
						width: (40px/$px) + rem;
						height: (40px/$px) + rem;
						margin-right: (10px/$px) + rem;
					}
					.tab_top——text{
						color: #4D4D4D;
						font-size: (24px/$px) + rem;
						font-weight: bold;
					}
				}
				.tab_top——ab{
					color: #BABABA;
					font-size: (20px/$px) + rem;

				}
			}
			.tab_number{
				width: 100%;
				border-bottom: solid 1px #F0EFF4;
				padding-bottom: (20px/$px) + rem;
				.tab_ul{
					padding: 0 (30px/$px) + rem;
					width: 100%;
					box-sizing: border-box;
					background: #fff;
					position: relative;
					.tab_li{
						text-align: left;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						border: solid 1px #FF9000;
						height: (84px/$px) + rem;
						margin: (15px/$px) +rem 0;
						.li_col{
							width: 33.33%;
							font-size: (26px/$px) + rem;
							color: #1A1A1A;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-flow: column;
							.li_col——gray{
								font-size: (22px/$px) + rem;
								color: #B2B2B2;
							}
							.li_col——pro{
								font-size: (30px/$px) + rem;
								color: #FF9000;
							}
						}
					}
				}
				.tab_btn{
					margin-top: (24px/$px) + rem;
					width: 100%;
					height: (72px/$px) + rem;
					display: flex;
					flex-flow: column;
					justify-content: center;
					text-align: left;
					position: relative;
					.tab_btn_list{
						.tab_btn_item{
							font-size: (20px/$px) + rem;
							color: #BABABA;
							span{
								margin-left: (20px/$px) + rem;
							}
							label{
								color: #4D4D4D;
							}
						}
					}
					.tab_order{
						width: (500px/$px) + rem;
						display: flex;
						.tab_order_span{
							width: 33.33%;
							font-size: (20px/$px) + rem;
							color: #1A1A1A;
							display: flex;
							align-items: center;
							flex-flow: column;	
							.tab_order_label——pro{
								color: #FF9000;
								font-size: (26px/$px) + rem;
								margin-right: (5px/$px) + rem;
							}
							.tab_order_label——grey{
								color: #676767;
							}
						}
					}
					.tab_ul——but{
						position: absolute;
						top: 0;
						right: (30px/$px) + rem;
						width: (175px/$px) + rem;
						height: (60px/$px) + rem;
						display: flex;
						align-items: center;
						justify-content: center;
						/*line-height: (60px/$px) + rem;*/
						text-align: center;
						background: #FF9000;
						border-radius: (3px/$px) + rem;
						color: #fff;
						font-size: (22px/$px) + rem;
					}
				}
			}
			.tab_text{
				padding: (20px/$px) + rem (30px/$px) + rem;
				color: #BABABA;
				font-size: (22px/$px) + rem;
				text-align: left;
				display: flex;
				align-items: center;
				&:before{
					content: "";
					width: (6px/$px) + rem;
					height: (6px/$px) + rem;
					display: inline-block;
					background: #D7D7D7;
					border-radius: 100%;
					overflow: hidden;
					margin-right: (10px/$px) + rem;
				}
			}
			.tab_stop{
				color: #4D4D4D;
				font-size: (24px/$px) + rem;
				width: 100%;
				text-align: center;
				height: (80px/$px) + rem;
				line-height: (80px/$px) + rem;
			}
		}
		.take_bt{
			padding:  0 (30px/$px) + rem;
			background: #fff;
			width: 100%;
			box-sizing: border-box;
			margin-top: (15px/$px) + rem;
			.bt_more{
				width: 100%;
				text-align: left;
				font-size: (24px/$px) + rem;
				color: #4D4D4D;
				height: (66px/$px) + rem;
				line-height: (66px/$px) + rem;
				font-weight:bold;
			}
			.bt_list{
				width: 100%;
				ul{
					li{
						border-bottom: solid 1px #E6E6E6;
						color: #595959;
						font-size: (20px/$px) + rem;
						display: flex;
						align-items: center;
						height: (66px/$px) + rem;
						text-align: left;
						img{
							width: (40px/$px) + rem;
							height: (40px/$px) + rem;
						}
					}
				}
			}
			.bt_eval{
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #4D4D4D;
				font-size: (24px/$px) + rem;
				height: (80px/$px) + rem;
				font-weight:bold;
				img{
					width: (40px/$px) + rem;
					height: (40px/$px) + rem;
				}
			}
		}
		.dialog{
			background: rgba(0,0,0,0.3);
			width: 100%;
			height: 100%;
			z-index: 100;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: 0;
			left: 0;
			border:none;
			.dialog_phone{
				background: #fff;
				width: (500px/$px) + rem;
				height: (360px/$px) + rem;
				position: relative;
				.dialog_top{
					width: 100%;
					height: (60px/$px) + rem;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #F9F9F9;
					color: #4D4D4D;
					font-size: (24px/$px) + rem;
				}
				.dialog_ul{
					padding: 0 (15px/$px) + rem;
					padding-top: (30px/$px) + rem;
					width: 100%;
					box-sizing: border-box;
					.dialog_li{
						width: 100%;
						height: (65px/$px) + rem;
						background: #E6E6E6;
						text-align: left;
						display: flex;
						align-items: center;
						margin-bottom: (20px/$px) + rem ;
						input{
							width: (350px/$px) + rem;
							height: (65px/$px) + rem;
							padding-left: (10px/$px) + rem;
							color: #BEBEBE;
							font-size: (22px/$px) + rem;
							&::-webkit-input-placeholder{
								color: #BEBEBE;
							}
						}
						.dialog_li_a{
							background: #FF9000;
							width: (140px/$px) + rem;
							height: (65px/$px) + rem;
							line-height: (65px/$px) + rem;
							font-size: (22px/$px) + rem;
							display: inline-block;
							text-align: center;
							color: #fff;
						}
						.dialog_li_b{
							width: (120px/$px) + rem;
							text-align: right;
							padding-right: (20px/$px) + rem;
							color: #BEBEBE;
							font-size: (20px/$px) + rem;
						}
					}
				}
				.dialog_bt{
					width: 100%;
					position: absolute;
					bottom: 0;
					left: 0;
					font-size: (22px/$px) + rem;
					display: flex;
					.dialog_bt_a{
						width: 50%;
						border:solid 1px #E1E0E6;
						height: (65px/$px) + rem;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #4D4D4D;
						box-sizing: border-box;
					}
					.dialog_bt_a——red{
						color: #FF9000;
					}
				}
			}
			.dialog_num{
				width: (441px/$px) + rem;
				background: #fff;
				border-radius: (10px/$px) + rem;
				overflow:hidden;
				position: relative;
				padding-bottom: (103px/$px) + rem;
				.dialog_num_title{
					width: 100%;
					height: (81px/$px) + rem;
					background: #F0EFF4;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: (30px/$px) + rem;
					color: #1A1A1A;
				}
				.dialog_num_number{
					width: 100%;
					padding: (32px/$px) + rem;
					box-sizing: border-box;
					flex-flow: initial;
					ul{
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						li{
							width: 25%;							
							padding: (5px/$px) + rem;
							box-sizing: border-box;
							span{
								width: 100%;
								height: (80px/$px) + rem;
								border: solid 2px #E2E1E6;
								border-radius: (5px/$px) + rem;
								box-sizing: border-box;
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: (30px/$px) + rem;
								color: #1A1A1A;
								&.active{
									background: #FF9000;
									border: solid 2px #FF9000;
									color: #fff;								
								}
							}
						}
					}
				}
				.dialog_num_btn{
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					border-top: solid 1px #F0EFF4;
					height: (69px/$px) + rem;
					font-size: (30px/$px) + rem;
					color: #1A1A1A;
					display: flex;
					align-items: center;
					span{
						width: 50%;
						display: flex;
						justify-content: center;
						&.dialog_num_btn——pro{
							color: #FF9000;
							border-right: solid 1px #F0EFF4;
						}
					}
				}
			}
		}
	}
</style>