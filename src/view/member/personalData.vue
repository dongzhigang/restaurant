<!-- 会员中心-个人资料 -->
<template>
	<div class="main" id="main">
		<div class="list">
			<div class="item">
				<label>手机:</label>
				<input type="text" placeholder="请输入手机" name="" :value="phone">
			</div>
			<div class="item">
				<label>姓名:</label>
				<input type="text" placeholder="请输入姓名" name="" :value="username">
			</div>
			<div class="item" @click="showDate">
				<label>生日:</label>
				<input type="text" placeholder="请输入生日" name="" :value="date" disabled>
			</div>
		</div>
		<div class="rows">
			<div class="rows_col">
				<span>会员等级</span>
				<div class="rows_col——ab">
					<!-- <img src="../../assets/tem/logo2.png" class="rows_col——ab_a"> -->
					<img src="../../assets/icon/icon13.png" class="rows_col——ab_b">
					<img src="../../assets/icon/icon14.png" class="rows_col——ab_c">
				</div>
			</div>
			<div class="rows_col">
				<span>会员特权</span>
				<div class="rows_col——ab">
					<img src="../../assets/icon/icon14.png" class="rows_col——ab_c">
				</div>
			</div>
		</div>
		<div class="btn" @click="userInfoUpdate">确定</div>

		<!-- dialog -->
		<template>
			<div class="dialog" v-if="hasDate">
				<div class="deta_box">
					<div class="deta_bt">
						<span @click="showDate">取消</span>			
						<span class="bt_active" @click="confirmDate">确定</span>
					</div>
					<div class="deta_list">
						<div class="deta_list_mask">
							<div class="deta_item" id="Month" @touchstart.passive="ontouchstart" @touchmove.passive="ontouchmove" @touchend.passive="ontouchend" data-top="0" data-deta="">
								<div class="deta_month deta_h" v-for="item in monthData" :key="item">{{item}}</div>
							</div>
							<div class="deta_item" id="Day" @touchstart.passive="ontouchstart" @touchmove.passive="ontouchmove" @touchend.passive="ontouchend"  data-top="0" data-deta="">
								<div class="deta_day deta_h" v-for="item in dayData" :key="item">{{item}}</div>
							</div>
							<div class="deta_item" id="Year" @touchstart.passive="ontouchstart" @touchmove.passive="ontouchmove" @touchend.passive="ontouchend"  data-top="0" data-deta="">
								<div class="deta_year deta_h" v-for="item in yearData" :key="item">{{item}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<!-- 提示组件 -->
		<HintMsg :hintMsg="msg" v-if="hasMsg" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import {userInfo,userInfoUpdate} from "@/api/member";
	import HintMsg from "@/components/common/hintMsg";
	import Deta from "@/assets/deta.js";
	export default{
		name: "PersonalData",
		data() {
			return {
				yearData:[],
				monthData:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
				dayData:[],
				Year:2018,
				Month:"十二月",
				Day:5,
				hasDate:false,
				date:"",
				childH:0,
				dataObj:{},
				phone:"",
				username:"",

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
		 * 事件函数
		 */
		methods:{
			//日期数组
			timeLoad() {
				//年数据
				this.Year = Deta.time.Year;
				this.Month = Deta.time.Month
				this.Day  = Deta.time.Day
				let startYear = 1900;
				let leng = 150;
				let array = [];
				for(let i=0;i < leng; i++) {
					array.push(startYear + i)
				}
				//天数组
				this.yearData = array;
				this.dayData = Deta.time.dayList(this.Year,this.Month);
			},
			//日期初始化
			startDate(id){
				if(this.hasDate){
					let parent = document.getElementById(id);
					let child = parent.children;
					let childH = this.childH = child[0].clientHeight;
					let arrayData,valData;
					switch (id){
						case "Year":
							arrayData = this.yearData;
							valData = this.Year;
							break;
						case "Month":
							arrayData = this.monthData;
							valData = this.monthData[this.Month];
							break;
						case "Day":
							arrayData = this.dayData;
							valData = this.Day;
							break;
					}
					let topY = this.topY = 0;
					for(let i=0;i< child.length;i++) {
						child[i].style.height = childH + "px";
						child[i].setAttribute("data-deta",i);
						if(arrayData[i] == valData){
							if(id == "Month"){
								parent.setAttribute("data-deta",i);
							}else{
								parent.setAttribute("data-deta",arrayData[i]);
							}
							parent.style.transform = "translate3d(0,"+(topY- (i-2)*childH)+"px"+",0)";
							parent.setAttribute("data-top",(topY- (i-2)*childH));
							child[i].classList.add(id + "Sel");
						}
					}
				}
			},
			//手指触摸到屏幕会触发
			ontouchstart(event){
				console.log(event)
				let that = event.currentTarget
				this.topY = parseInt(that.getAttributeNode("data-top").value);
				this.startY = event.changedTouches[0].clientY;
			},
			//当手指在屏幕上移动时，会触发
			ontouchmove(event){
				let that = event.currentTarget
				let child = that.children;
				let topY = this.topY;
				let childH = this.childH;
				this.endY = event.changedTouches[0].clientY;
				let valY = Math.abs(this.endY - this.startY);
				let leng = Math.round(valY/this.childH);
				if(this.endY - this.startY > 0){ //向下
					if((topY + leng*childH) > childH*2){
						that.style.transform = "translate3d(0,"+(childH*3)+"px"+",0)";
						that.setAttribute("data-top",childH*3);
					}else{                 
						that.style.transform = "translate3d(0,"+(topY + leng*childH)+"px"+",0)";
						that.setAttribute("data-top",(topY + leng*childH));
					}	
				}else{//向上
					if (Math.abs(topY - leng*childH) > childH*(child.length - 3)) {
						that.style.transform = "translate3d(0,"+(-childH*(child.length - 2))+"px"+",0)";
						that.setAttribute("data-top",-childH*(child.length - 2));
					}else{
						that.style.transform = "translate3d(0,"+(topY - leng*childH)+"px"+",0)";
						that.setAttribute("data-top",(topY - leng*childH)) 
					}
				}	
			},
			//当手指离开屏幕时，会触发
			ontouchend(){
				this.endY = event.changedTouches[0].clientY;
				let that = event.currentTarget;
				let id = event.currentTarget.id;
				let child = that.children;
				let Year = document.getElementById("Year");
				let Month = document.getElementById("Month");
				let Day = document.getElementById("Day");
				let topY = this.topY;
				let childH = this.childH;
				let valY = Math.abs(this.endY - this.startY);	
				let leng = Math.round(valY/childH);
				if(this.endY - this.startY > 0){	//向下	
					if((topY + leng*childH) > childH*2){
						that.style.transform = "translate3d(0,"+(childH*2)+"px"+",0)";
						that.setAttribute("data-top",childH*2);

					}else{                 
						that.style.transform = "translate3d(0,"+(topY + leng*childH)+"px"+",0)";
						that.setAttribute("data-top",(topY + leng*childH));
					}
				}else{//向上
					if (Math.abs(topY - leng*childH) > childH*(child.length - 3)) {
						that.style.transform = "translate3d(0,"+(-childH*(child.length - 3))+"px"+",0)";
						that.setAttribute("data-top",-childH*(child.length - 3));
					}else{
						that.style.transform = "translate3d(0,"+(topY - leng*childH)+"px"+",0)";
						that.setAttribute("data-top",(topY - leng*childH)) 
					}
				}
				topY = parseInt(that.getAttributeNode("data-top").value);
				let index = topY>0?2-Math.abs(topY/childH):Math.abs(topY/childH) + 2;
				for(let i=0;i < child.length;i++){
					if(i == index){
						child[i].classList.add(id + "Sel");
						if(id == "Month"){
							that.setAttribute("data-deta",i);
						}else{
							that.setAttribute("data-deta",child[i].innerHTML);
						}						
						//设置data数据
						this.Year = parseInt(Year.getAttributeNode("data-deta").value);
						this.Month = parseInt(Month.getAttributeNode("data-deta").value);
						this.Day = parseInt(Day.getAttributeNode("data-deta").value);

						let  nextDayData = Deta.time.dayList(this.Year,this.Month);
						if(nextDayData.length < this.Day){
							let dayY = parseInt(Day.getAttributeNode("data-top").value);
							let num = this.Day - nextDayData.length
							Day.style.transform = "translate3d(0,"+(dayY + num*childH)+"px"+",0)";
							this.Day = nextDayData.length
							Day.setAttribute("data-deta",nextDayData.length)
						}
						this.dayData = nextDayData
					}else{
						child[i].classList.remove(id + "Sel");
					}
				}	
			},
			//显示日期
			showDate(){
				this.hasDate = !this.hasDate
			},
			//选择日期
			confirmDate(){
				this.date = this.Year + "-" + (this.Month+1>9?this.Month+1:"0"+(this.Month+1)) + "-" + (this.Day>9?this.Day:"0"+this.Day)
				this.hasDate = !this.hasDate
			},
			//数据
			userInfo(){
				let data = {user_id:this.$store.state.appCommon.user_id}
				userInfo(data).then((res)=>{
					console.log(res)
					if(res.data.code == 200)
					{
						this.dataObj = res.data.data[0];
						this.date = res.data.data[0].birthday
						this.phone = res.data.data[0].phone;
						this.username = res.data.data[0].username
					}
				})
			},
			//修改
			userInfoUpdate(){
				let data = {
					phone:this.phone,
					username:this.username,
					birthday:this.date,
					user_id:this.$store.state.appCommon.user_id
				}
				userInfoUpdate(data).then((res)=>{
					this.msg = res.data.msg;
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
				})
			}
		},
		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		beforeMount(){
			this.timeLoad()

		},
		mounted(){
			document.title = '个人资料';
			this.userInfo();
			document.body.addEventListener('touchmove', function (e) {
		        e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
		    }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
		},
		updated(){
			this.startDate("Month")
			this.startDate("Day")
			this.startDate("Year") 
		}
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
			background: #fff;			
			.item{
				padding:0 (30px/$px) + rem;
				width: 100%;
				border-bottom: solid 1px #E2E1E6;
				color: #808080;
				text-align: left;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				font-size: (24px/$px) + rem;
				label{
					width: (80px/$px) + rem;
					height: (69px/$px) + rem;	
					display: flex;
					align-items: center;				
				}
				input{
					width: 100%;
					height: (69px/$px) + rem;
					line-height: (69px/$px) + rem;
					font-size: (22px/$px) + rem;
				}
			}
		}
		.rows{
			background: #fff;
			margin-top: (20px/$px) + rem;
			.rows_col{
				color: #808080;
				font-size: (24px/$px) + rem;
				width: 100%;
				height: (69px/$px) + rem;
				line-height: (69px/$px) + rem;
				text-align: left;
				padding: 0 (30px/$px) + rem;
				box-sizing: border-box;
				position: relative;
				border-bottom: solid 1px #E2E1E6;
				.rows_col——ab{
					position: absolute;
					top: 0;
					right: (30px/$px) + rem;
					height: (69px/$px) + rem;
					display: flex;
					align-items: center;
					.rows_col——ab_a{
						width: (60px/$px) + rem;
						height: (60px/$px) + rem;

					}
					.rows_col——ab_b{
						width: (52px/$px) + rem;
						height: (39px/$px) + rem;
					}
					.rows_col——ab_c{
						width: (18px/$px) + rem;
						height: (31px/$px) + rem;
						margin-left: (10px/$px) + rem;
					}
				}
			}
		}
		.btn{
			width: 100%;
			height: (80px/$px) + rem;
			line-height: (80px/$px) + rem;
			background: #FF9000;
			font-size: (30px/$px) + rem;
			text-align: center;
			color: #fff;
		}
		.dialog{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			align-items: flex-end;
			background: rgba(0,0,0,0.3);
			.deta_box{
				width: 100%;
				height: (400px/$px) + rem;
				border-radius: (6px/$px) + rem;
				overflow: hidden;
				background: #fff;
				position: relative;
		/*		.title{
					font-size: (36px/$px) + rem;
					color: #4D4D4D;
					width: 100%;
					height: (80px/$px) + rem;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #F0EFF4;
				}*/
				.deta_list{
					width: 100%;
					height: (290px/$px) +rem;
					overflow: hidden;
					position: relative;
					z-index: 100;
					display: flex;
					position: relative;
					cursor: pointer;
					-webkit-mask: -webkit-linear-gradient(top,#debb47 50%,rgba(36,142,36,0));
					transform: perspective(1000);
						-webkit-perspective: 1000; /* Safari 和 Chrome */
					.deta_list_mask{
						width: 100%;
						display: flex;
						-webkit-mask: -webkit-linear-gradient(bottom,#debb47 50%,rgba(36,142,36,0));
						transform: perspective(1000);
						-webkit-perspective: 1000; /* Safari 和 Chrome */
						.deta_item{
							width: 33.33%;
							font-size: (30px/$px) + rem;
							font-weight: bold;
							text-align: center;
							transition:all 1s;
							transform:translate3d(0,(0px/$px) + rem,0);
							cursor: pointer;						
							.deta_h{
								height: (58px/$px) + rem;
								display: flex;
								align-items: center;
								justify-content: center;
								width: 100%;
							}
						}
					}
				}
				.deta_bt{
					width: 100%;
					height: (69px/$px) + rem;
					display: flex;
					span{
						font-size: (25px/$px) + rem;
						width: 50%;
						border: solid 1px #E1E0E6;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #4D4D4D;
						&.bt_active{
							color: #FF9000;
						}
					}
				}
			}
		}
	}
</style>
