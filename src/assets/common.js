import request from '@/utils/request'
import qs		from 'qs'
// 获取手机验证码
export function sendSmsCode(data) {
	return request({
		url: 'User/send_sms_code',
		method: 'post',
		data:qs.stringify(data)
	})
}
//绑定手机号码
export function boundPhone(data){
	return request({
		url: 'User/user_bind_phone',
		method: 'post',
		data:qs.stringify(data)
	})
}
//保留两位小数
export function returnFloat(value){
	var value=Math.round(parseFloat(value)*100)/100;
	var float=value.toString().split(".");
	if(float.length==1){
		if (value.toString() > 0) {
			value=value.toString()+".00";
			return value;
		}
		return value;
	}else{
		if(float[1].length<2){
			value=value.toString()+"0";
		}
		return value;
	}
}

//微信公众号config接口
export function wxConfig(data){
	return request({
		url: 'Wechat/get_jssdk_config',
		method: 'post',
		data:qs.stringify(data)
	})
}
//微信公众号获取code
export function wxCode(url){
	if(url.indexOf("?code")>0){
		return url;
	}
	return false;
}
//微信获取用户信息
export function wxLogin(data){
	return request({
		url: 'Wechat/wechat_login',
		method: 'post',
		data:qs.stringify(data)
	})
}
