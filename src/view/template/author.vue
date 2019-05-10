// 微信授权跳转组件，容易出现空白，可以做广告页
<template>
    <div class="author">
        <label>正在登录</label>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
<script>
import {wxCode,wxLogin} from "@/assets/common"
import {storeList,cityList} from "@/api/store";
export default {
    name:"Author",
    data(){
        return{

        }
    },
    created () {
        //判断链接是否存在code
        if(wxCode(window.location.href)){ //code存在
            let parameter = wxCode(window.location.href).split("?")[1].split("&");
            let code = parameter[0].split("=")[1];
            let state = parameter[1].split("#")[0].split("=")[1];
            //判断是否登录
            if(!sessionStorage.getItem("user")){//没有登录
                //获取用户信息
                this.wxLogin(code,state)
                return false;
            }
            //跳转用户进入的url
            this.$router.push(sessionStorage.getItem("beforeLoginUrl"))
        }else{  //code不存在
            //微信授权
            let url = window.location.href.split("#")[0];
            //console.log('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3579a03d7ca003e9&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=2#wechat_redirect')
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3579a03d7ca003e9&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=2#wechat_redirect'
        }
    },
    methods:{
        wxLogin(code,state){
            let data = { code:code,state:state}
            wxLogin(data).then((res)=>{
                console.log(res.data.data)
                if(res.data.code == 200){
                    sessionStorage.setItem("user",JSON.stringify(res.data.data))
                    //跳转用户进入的url
                    this.$router.push(sessionStorage.getItem("beforeLoginUrl"))
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped type="text/css">
    @import "@/assets/fontSize.scss";
    .author{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: (30px/$px) + rem;
        span{
            width: (5px/$px) + rem;
            height: (5px/$px) + rem;
            background: #333;
            border-radius: 100%;
            overflow: hidden;
            margin:0 (5px/$px) + rem;
            animation: author 1s infinite ease-in-out;
            &:nth-child(2){
				-webkit-animation-delay: -0.8s;
	 			animation-delay: -0.8s;
			}
			&:nth-child(3){
				-webkit-animation-delay: -0.6s;
	 			animation-delay: -0.6s;
			}
        }
    }
    @keyframes author {
	   0%, 80%, 100% {
	    transform: scale(0.0);
	    -webkit-transform: scale(0.0);
	  } 
	  60% {
	    transform: scale(1.0);
	    -webkit-transform: scale(1.0);
	  }
	}
</style>

