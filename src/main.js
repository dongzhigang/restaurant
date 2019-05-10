// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store  from './store'
import {wxCode,wxLogin} from "@/assets/common"


Vue.config.productionTip = false
//微信授权
router.beforeEach((to, from, next) => {
  //清空localStorage储存
  let exdate=new Date(); //用户进入页面时间
  if(localStorage.getItem("date")){
    if(exdate.getTime() > Number(localStorage.getItem("date")) + 24*60*60*1000){//超过一天清空localStorage,重新登录
      localStorage.clear()
    }
  }
  // localStorage.clear()
  //判断是否登录
  if(!localStorage.getItem("user")){
    //判断链接是否存在code,code不存在是第一次进入项目
    if(!wxCode(window.location.href)){ //code不存在
      //保存用户进入#前的url
      let url = window.location.href.split("#")[0];
      localStorage.setItem("url",url)
      //保存用户进入的锚点
      localStorage.setItem("beforeLoginUrl",to.fullPath)    
      //微信授权
      //console.log('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3579a03d7ca003e9&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect')
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3579a03d7ca003e9&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect'
   }else{//code存在
      let parameter = wxCode(window.location.href).split("?")[1].split("&");
      let code = parameter[0].split("=")[1];
      let state = parameter[1].split("#")[0].split("=")[1];
      let data = {code:code,state:state}
      //登录获取用户信息
      wxLogin(data).then((res)=>{
        if(res.data.code == 200){
          //保存登录当前时间
          localStorage.setItem("date",exdate.getTime())
          //保存用户信息
          localStorage.setItem("user",JSON.stringify(res.data.data))
        }
        //重新加载用户进入的url
        window.location.href = localStorage.getItem("url")+"#"+localStorage.getItem("beforeLoginUrl")
        //window.close(); // 关闭当前页面
        //router.go(-1); //往回走1步。
      }).catch(()=>{
        //跳转用户进入的url
        router.push(localStorage.getItem("beforeLoginUrl"))
      })
    }
    return false
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
