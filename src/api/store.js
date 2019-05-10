import request from '@/utils/request'
import qs		from 'qs'
// 餐厅列表 post
export function storeList(data) {
	return request({
		url: 'Canteen/queue_list',
		method: 'post',
		data:qs.stringify(data)
	})
}
//城市列表
export function cityList(data) {
	return request({
		url: 'Canteen/city_list',
		method: 'post',
		data:qs.stringify(data)
	})
}
//店铺数据
export function storeData(data){
	return request({
		url: 'Canteen/queue_detail',
		method: 'post',
		data:qs.stringify(data)
	})
}
//立即取号
export function takeNumber(data){
	return request({
		url: 'Canteen/queue_right_now',
		method: 'post',
		data:qs.stringify(data)
	})
}
//取消排队
export function cancelQueue(data){
	return request({
		url: 'Canteen/cancel_queue',
		method: 'post',
		data:qs.stringify(data)
	})
}
//在线取号评价
export function canteenComment(data){
	return request({
		url: 'Canteen/canteen_comment',
		method: 'post',
		data:qs.stringify(data)
	})
}
//店铺导航
export function guideList(data){
	return request({
		url: 'Canteen/guide_list',
		method: 'post',
		data:qs.stringify(data)
	})
}