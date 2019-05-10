import request from '@/utils/request'
import qs		from 'qs'
// 会员中心
export function userCenter(data) {
	return request({
		url: 'User/user_center',
		method: 'post',
		data:qs.stringify(data)
	})
}
// 会员中心-积分获取
export function scoreEarn(data) {
	return request({
		url: 'User/score_earn',
		method: 'post',
		data:qs.stringify(data)
	})
}
// 会员中心-积分支出
export function scoreUsed(data) {
	return request({
		url: 'User/score_used',
		method: 'post',
		data:qs.stringify(data)
	})
}
// 会员中心-积分规则
export function scoreRule(data) {
	return request({
		url: 'User/score_rule',
		method: 'post',
		data:qs.stringify(data)
	})
}
// 会员中心-我的评价
export function mYcomment(data) {
	return request({
		url: 'User/my_comment',
		method: 'post',
		data:qs.stringify(data)
	})
}
//会员中心-商城订单
export function orderList(data) {
	return request({
		url: 'Coupon/order_list',
		method: 'post',
		data:qs.stringify(data)
	})
}
//会员中心-商城订单详情
export function orderDetail(data) {
	return request({
		url: 'coupon/order_detail',
		method: 'post',
		data:qs.stringify(data)
	})
}
//会员中心-优惠卷
export function myCoupon(data) {
	return request({
		url: 'Coupon/my_coupon',
		method: 'post',
		data:qs.stringify(data)
	})
}
//会员中心-用餐记录
export function orderRecord(data) {
	return request({
		url: 'User/order_record',
		method: 'post',
		data:qs.stringify(data)
	})
}
//会员中心-我的收藏
export function myCollect(data) {
	return request({
		url: 'User/my_collect',
		method: 'post',
		data:qs.stringify(data)
	})
}
//会员中心-我的收藏取消
export function collectDelete(data) {
	return request({
		url: 'Coupon/collect_delete',
		method: 'post',
		data:qs.stringify(data)
	})
}
//会员中心-个人资料
export function userInfo(data) {
	return request({
		url: 'User/user_info',
		method: 'post',
		data:qs.stringify(data)
	})
}
//会员中心-个人资料修改
export function userInfoUpdate(data) {
	return request({
		url: 'User/user_info_update',
		method: 'post',
		data:qs.stringify(data)
	})
}