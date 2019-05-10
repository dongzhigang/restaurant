import request from '@/utils/request'
import qs		from 'qs'
//卡卷商城
export function couponList(data) {
	return request({
		url: 'Coupon/coupon_list',
		method: 'post',
		data:qs.stringify(data)
	})
}
//卡卷商城详情
export function couponDetail(data) {
	return request({
		url: 'Coupon/coupon_detail',
		method: 'post',
		data:qs.stringify(data)
	})
}
//卡卷商城添加收擦
export function couponCollectAdd(data) {
	return request({
		url: 'Coupon/coupon_collect_add',
		method: 'post',
		data:qs.stringify(data)
	})
}
//卡卷商城取消收藏
export function couponCollectDelete(data) {
	return request({
		url: 'Coupon/coupon_collect_delete',
		method: 'post',
		data:qs.stringify(data)
	})
}
//卡卷商城-卡券适用门店
export function couponStoreMatch(data) {
	return request({
		url: 'Coupon/coupon_store_match',
		method: 'post',
		data:qs.stringify(data)
	})
}

//卡卷商城-立即兑换(积分)-创建订单 
export function couponExchangeScore(data) {
	return request({
		url: 'Coupon/coupon_exchange_score',
		method: 'post',
		data:qs.stringify(data)
	})
}
//卡卷商城-立即兑换(积分+金额)-创建订单 
export function couponExchangeWx(data) {
	return request({
		url: 'Coupon/coupon_exchange_wx',
		method: 'post',
		data:qs.stringify(data)
	})
}
//卡卷商城-立即兑换(积分+金额)-微信支付
export function menuOrderPay(data) {
	return request({
		url: 'Orders/menu_order_pay',
		method: 'post',
		data:qs.stringify(data)
	})
}
//卡卷商城-立即兑换(积分+金额)-支付更新
export function couponExchangeWxResult(data) {
	return request({
		url: 'Coupon/coupon_exchange_wx_result',
		method: 'post',
		data:qs.stringify(data)
	})
}