<template>
	<div class="main">
		<div id="allmap" class="allmap"></div>
		<div class="map_address">
			<div class="map_box">
				<div class="map_fl">
					<span class="map_fl——w">天河南二路店</span>
					<span>广州市天河南二路33号丰兴广场首层</span>
				</div>
				<div class="map_fr">
					<div class="map_fr_img">
						<img src="@/assets/icon/jt.png">
					</div>
				</div>
			</div>
		</div>
		<!-- 导航类型 -->
		<div class="navType">
			<span class="active">公交</span>
			<span>驾车</span>
			<span>步行</span>
			<span>骑行</span>
		</div>
		<!-- 地图导航 -->
		<div class="mapNav">
			<div class="mapNav_box">
				<div class="mapNav_address">
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BMap from 'BMap'
	import BMAP_ANIMATION_BOUNCE from 'BMAP_ANIMATION_BOUNCE'
	export default{
		name:"Map",
		data() {
			return{

			}
		},
		/**
		 * 事件函数
		 */
		methods:{
			baiduMap() {
				// 百度地图API功能
				let  map = new BMap.Map('allmap');
				let point = new BMap.Point(116.404, 39.915); 
			    map.centerAndZoom(point, 12)
			    // 创建地址解析器实例
				var myGeo = new BMap.Geocoder();
				// 将地址解析结果显示在地图上,并调整地图视野
				myGeo.getPoint("广州市天河区天河路490号", function(point){
					if (point) {
						let marker = new BMap.Marker(point)
						map.centerAndZoom(point, 20);
						map.addOverlay(marker);
					}else{
						alert("您选择地址没有解析到结果!");
					}
				}, "广州市");
			}
		},
		/**
		 * 生命周期
		 */
		//挂载结束
		mounted(){
			document.title = '百度地图';
			this.baiduMap()
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	@import "@/assets/fontSize.scss";

	.main{
		width: 100%;
		height: 100%;
		position: relative;
		.map_address{
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 100;
			width: 100%;
			padding: 0 (15px/$px) + rem;
			box-sizing: border-box;
			.map_box{
				width: 100%;
				background: #fff;
				height: (180px/$px) + rem;
				border-radius: (10px/$px) + rem;
				display:flex;
				align-items: center;
				.map_fl{
					height: (180px/$px) + rem;
					width: (650px/$px) + rem;
					padding: 0 (10px/$px) + rem;
					box-sizing: border-box;
					font-size: (26px/$px) + rem;
					color: #888888;
					display:flex;
					flex-flow: column;
					justify-content: center;
					align-items: left;
					span{
						display: block;
						text-align: left;
						&.map_fl——w{
							font-size: (30px/$px) + rem;
							color: #1A1A1A;
							font-weight: bold;
						}
					}
				}
				.map_fr{
					width: (55px/$px) + rem;
					height: (180px/$px) + rem;
					display:flex;
					align-items: center;
					position: absolute;
					right: (30px/$px) + rem;
					top: 0;
					.map_fr_img{
						width: (55px/$px) + rem;
						height: (55px/$px) + rem;
						background: #FF9000;
						border-radius: 100%;
						overflow: hidden;
						display:flex;
						align-items: center;
						justify-content: center;
						img{
							width: (35px/$px) + rem;
							height: (35px/$px) + rem;
						}
					}
				}
			}
		}
		.navType{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: (79px/$px) + rem;
			background: #F6F5FA;
			display: flex;
			justify-content: space-around;
			font-size: (24px/$px) + rem;
			color: #1A1A1A;
			border-bottom: solid 1px #E6E6E6;
			z-index: 3;
			span{
				height: (79px/$px) + rem;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				padding: 0 (15px/$px) + rem;
				&.active{
					color: #FF9000;
					border-bottom: solid (6px/$px) + rem #FF9000;
				}
			}
		}
		.mapNav{
			width: 100%;
			height: 100%;
			padding-top: (80px/$px) + rem;
			box-sizing: border-box;
			background: #F6F5FA;
			position: absolute;
			top:0;
			left: 0;
			z-index: 2;
			.mapNav_box{
				width: 100%;
				height: (144px/$px) + rem;
				background: #fff;
				.mapNav_address{
					width: () + rem;
				}
			}
		}



		.allmap{
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 1;
		}
	}
</style>