//微信jssdk配置
import {wxConfig} from './common';
import wx from 'weixin-js-sdk';
export default function Wechat(){
    let data = { url:window.location.href.split('#')[0]};
    //jssdk配置
    wxConfig(data).then((data)=>{
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.data.appId, // 必填，公众号的唯一标识
            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.signature,// 必填，签名
            jsApiList: ["openLocation","getLocation","chooseImage","uploadImage"] // 必填，需要使用的JS接口列表
        })
    })
}