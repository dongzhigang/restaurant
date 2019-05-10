<template>
	<div class="main">
		<!-- 加载到底 -->
		<div class="top">
			给我来个评分吧
		</div>
		<div class="list">
			<!-- <template v-for="(item,index) in grades" >
				<img src="../../assets/icon/starddd.png" @click="comment(item)" v-if="item < grade">
				<img src="../../assets/icon/star.png" @click="comment(item)" v-else>
			</template> -->
			<img v-for="(col,i) in grades" :key="i" @click="comment(col)" :src=" col < grade?require('@/assets/icon/starddd.png'):require('@/assets/icon/star.png')">
		</div>
		<div class="textarea">
			<textarea placeholder="您好,欢迎留下宝贵意见,谢谢！" @input="textareaChange" v-model="textareaDesc" maxlength="200"></textarea>
			<span>{{textareaLen}}/200</span>
		</div>
		<div class="btn" :class="(grade && textareaDesc.length>10)?'active':''" @click="(grade && textareaDesc.length>10)?canteenComment():''">提交</div>

		<!-- 提示组件 -->
		<HintMsg :hintMsg="msg" v-if="hasMsg" />
	</div>
</template>
<script>
	import {canteenComment} from "@/api/store";
	import { mapGetters } from 'vuex';
	import HintMsg from "@/components/common/hintMsg";
	export default{
		name: "Appraise",
		data() {
			return {
				grades:[0,2,4,6,8],	//评价数组
				grade:0,			//评价内容
				textareaLen:0,		//文本长度
				textareaDesc:'',	//文本内容
				msg:"",	//提示信息
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
			//评价
			comment(item) {
				this.grade = item+2;
			},
			//文本框限字数
			textareaChange(e) {
				let len = parseInt(this.textareaDesc.length)
				this.textareaLen = 200 - len
			},
			//提交评价
			canteenComment(){
				let data = {
					user_id:this.$store.state.appCommon.user_id,
					content:this.textareaDesc,
					score:this.grade,
					canteen_id:this.$route.query.canteen_id
				}
				if(this.textareaDesc && this.grade){
					canteenComment(data).then((res)=>{
						if (res.data.code == 200) {
							this.grade = 0;
							this.textareaDesc = "";
						}
						this.msg = res.data.msg;
						this.$store.state.appCommon.hasMsg = true;
						this.$store.dispatch('hasMsg');
						setTimeout(function(){
							this.$router.go(-1);
						}.bind(this),1000)
					}).catch(()=>{

					})
				}else{
					this.msg = "请输入评价内容";
					this.$store.state.appCommon.hasMsg = true;
					this.$store.dispatch('hasMsg');
				}
			}
		},
		

		/**
		 * 生命周期
		 * @return {[type]} [description]
		 */
		mounted(){
			document.title = '我要评价'
		}
	}
</script>
<style lang="scss" scoped type="text/css" >
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		height: 100%;
		background: #F0EFF4;
		padding-top: (20px/$px) + rem;
		.top{
			width: 100%;
			height: (50px/$px) + rem;
			line-height:  (50px/$px) + rem;
			padding-bottom:  (20px/$px) + rem;
			position: relative;
			color: #BFBFBF;
			font-size: (18px/$px) + rem;
			text-align: center;
			&:after{
				content:"";
				display: inline-block;
				position: absolute;
				left: (14px/$px) + rem;
				top: (24px/$px) + rem;
				width: (210px/$px) + rem;
				height: 1px;
				background: #CECDCF;
			}
			&:before{
				content: "";
				display: inline-block;
				position: absolute;
				right: (14px/$px) + rem;
				top: (24px/$px) + rem;
				width: (210px/$px) + rem;
				height: 1px;
				background: #CECDCF;

			}
		}
		.list{
			width: 100%;
			text-align: center;
			img{
				width: (40px/$px) + rem;
			}
		}
		.textarea{
			width: 100%;
			margin-top: (20px/$px) + rem;
			height: (300px/$px) + rem;

				position: relative;
			textarea{
				width:100%;
				background: #fff;
				height: (300px/$px) + rem;
				line-height: (38px/$px) + rem;
				text-indent: 2em;
				line-height: (38px/$px) + rem;
				padding:(10px/$px) + rem;
				box-sizing: border-box;
				color: #666;
				display: inline-block;
				&::-webkit-input-placeholder{
					color: #BEBEBE;
				}
			}
			span{
				position: absolute;
				right: (20px/$px) + rem;
				bottom: (10px/$px) + rem;
				color: #878787;
				font-size: (18px/$px) + rem;
			}
		}
		.btn{
			width: 100%;
			height: (80px/$px) + rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #C7C7C7;
			color: #fff;
			font-size: (30px/$px) + rem;
			&.active{
				color: #fff;
				background: #FF9000;
			}
		}
	}
</style>