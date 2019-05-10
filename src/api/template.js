import request from '@/utils/request'
import qs		from 'qs'
// 订单详情
export function orderDetail(data) {
	return request({
		url: 'Food/order_detail',
		method: 'post',
		data:qs.stringify(data)
	})
}
// 号单详情
export function queueNotice(data) {
	return request({
		url: 'Canteen/queue_notice',
		method: 'post',
		data:qs.stringify(data)
	})
}
// 评价订单-展示菜品
export function orderCommentBefore(data) {
	return request({
		url: 'Food/order_comment_before',
		method: 'post',
		data:qs.stringify(data)
	})
}
// 评价提交
export function orderComment(data) {
	return request({
		url: 'Food/order_comment',
		method: 'post',
		data:qs.stringify(data)
	})
}