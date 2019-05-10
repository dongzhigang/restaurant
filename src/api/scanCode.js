import request from '@/utils/request'
import qs		from 'qs'

//扫码接口
export function dealQrcode(data) {
	return request({
		url: 'Food/deal_qrcode',
		method: 'post',
		data:qs.stringify(data)
	})
}
// 菜品分类
export function categoryList(data) {
	return request({
		url: 'Food/category_list',
		method: 'post',
		data:qs.stringify(data)
	})
}
// 菜品列表
export function foodList(data) {
	return request({
		url: 'Food/food_list',
		method: 'post',
		data:qs.stringify(data)
	})
}
//菜品详情
export function foodDetail(data) {
	return request({
		url: 'Food/food_detail',
		method: 'post',
		data:qs.stringify(data)
	})
}
//添加菜单
export function menuFoodAdd(data) {
	return request({
		url: 'Food/menu_food_add',
		method: 'post',
		data:qs.stringify(data)
	})
}
//菜单详情
export function menuList(data) {
	return request({
		url: '/Food/menu_list',
		method: 'post',
		data:qs.stringify(data)
	})
}
//删除菜单
export function menuFoodDelete(data) {
	return request({
		url: '/Food/menu_food_delete',
		method: 'post',
		data:qs.stringify(data)
	})
}
//创建订单
export function orderCreate(data) {
	return request({
		url: '/Food/order_create',
		method: 'post',
		data:qs.stringify(data)
	})
}
//订单支付
export function menuOrderPay(data) {
	return request({
		url: '/Orders/menu_order_pay',
		method: 'post',
		data:qs.stringify(data)
	})
}
//订单支付成功更新
export function menuOrderResult(data) {
	return request({
		url: '/Food/menu_order_result',
		method: 'post',
		data:qs.stringify(data)
	})
}