<template>
	<el-row class="home" :gutter="20">
		<!-- //左上测的个人信息 -->
		<el-col :span="8" style="margin-top: 20px">
			<el-card shadow="hover">
				<div class="user">
					<img :src="userImg" />
					<div class="userinfo">
						<p class="name">Admin</p>
						<p class="acess">超级管理员</p>
					</div>
				</div>
				<div class="login-info">
					<p>上次登录时间：<span>2022-7-11</span></p>
					<p>上次登录地点：<span>济南</span></p>
				</div>
			</el-card>

			<!-- //左下侧的购买信息 -->
			<el-card style="margin-top: 20px; height: 460px">
				<el-table :data="tabelData">
					<el-table-column
						v-for="(val, key) in tableLabel"
						:key="key"
						:prop="key"
						:label="val"
					>
					</el-table-column>
				</el-table>
			</el-card>
		</el-col>

		<!-- //右上侧的卡片 -->
		<el-col style="margin-top: 20px" :span="16">
			<div class="num">
				<el-card
					v-for="item in countData"
					:key="item.name"
					:body-style="{ display: 'flex', padding: 0 }"
				>
					<i
						class="icon"
						:class="`el-icon-${item.icon}`"
						:style="{ background: item.color }"
					></i>
					<div class="detail">
						<p class="num">￥ {{ item.value }}</p>
						<p class="text">{{ item.name }}</p>
					</div>
				</el-card>
			</div>
			<el-card style="height: 280px">
				<!-- ref用于获取当前dom节点 -->
				<!-- <div style="height: 280px" ref="echarts"></div> -->
				<echart :chartData="echartData.order" style="height: 280px" />
			</el-card>
			<div class="graph">
				<el-card style="height: 260px">
					<!-- <div style="height: 240px" ref="userEcharts"></div> -->
					<echart :chartData="echartData.user" style="height: 240px" />
				</el-card>
				<el-card style="height: 260px">
					<!-- <div style="height: 240px" ref="videoEcharts"></div> -->
					<echart
						:chartData="echartData.video"
						:isAxiChart="false"
						style="height: 240px"
					/>
				</el-card>
			</div>
		</el-col>
	</el-row>
</template>

<script>
// import { getMenu } from '../../../api/data.js'
import { getData } from '../../../api/data.js'
import Echart from '../../components/ECharts.vue'

export default {
	name: 'home',
	components: {
		Echart,
	},
	data() {
		return {
			userImg: require('../../assets/images/user.png'),
			// tabelData: [
			// 	{
			// 		name: 'oppo',
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: 'vivo',
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: '苹果',
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: '小米',
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: '三星',
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// 	{
			// 		name: '魅族',
			// 		todayBuy: 100,
			// 		monthBuy: 300,
			// 		totalBuy: 800,
			// 	},
			// ],
			tabelData: [],
			tableLabel: {
				name: '课程',
				totalBuy: '今日够买',
				monthBuy: '本月购买',
				totalBuy: '总购买',
			},
			countData: [
				{
					name: '今日支付订单',
					value: 1234,
					icon: 'success',
					color: '#2ec7c9',
				},
				{
					name: '今日收藏订单',
					value: 210,
					icon: 'star-on',
					color: '#ffb980',
				},
				{
					name: '今日未支付订单',
					value: 1234,
					icon: 's-goods',
					color: '#5ab1ef',
				},
				{
					name: '本月支付订单',
					value: 1234,
					icon: 'success',
					color: '#2ec7c9',
				},
				{
					name: '本月收藏订单',
					value: 210,
					icon: 'star-on',
					color: '#ffb980',
				},
				{
					name: '本月未支付订单',
					value: 1234,
					icon: 's-goods',
					color: '#5ab1ef',
				},
			],
			echartData: {
				order: {
					xData: [],
					series: [],
				},
				user: {
					xData: [],
					series: [],
				},
				video: {
					series: [],
				},
			},
		}
	},
	mounted() {
		getData().then((res) => {
			const { code, data } = res.data
			if (code === 20000) {
				this.tabelData = data.tableData
				const order = data.orderData
				const xData = order.date
				const keyArray = Object.keys(order.data[0])
				const series = []
				keyArray.forEach((key) => {
					series.push({
						name: key,
						data: order.data.map((item) => item[key]),
						type: 'line',
					})
				})
				this.echartData.order.xData = xData
				this.echartData.order.series = series
				this.echartData.user.xData = data.userData.map((item) => item.date)
				this.echartData.user.series = [
					{
						name: '新增用户',
						data: data.userData.map((item) => item.new),
						type: 'bar',
					},
					{
						name: '活跃用户',
						data: data.userData.map((item) => item.active),
						type: 'bar',
					},
				]
				this.echartData.video.series = [
					{
						data: data.videoData,
						type: 'pie',
					},
				]
			}
		})
	},
}
</script>
<!-- //折线图
				// const option = {
				// 	xAxis: {
				// 		data: xData,
				// 	},
				// 	yAxis: {},
				// 	legend: {
				// 		data: keyArray,
				// 	},
				// 	series,
				// }

				// const E = echarts.init(this.$refs.echarts)
				// E.setOption(option)
				//柱状图
				// const userOption = {
				// 	legend: {
				// 		// 图例文字颜色
				// 		textStyle: {
				// 			color: '#333',
				// 		},
				// 	},
				// 	grid: {
				// 		left: '20%',
				// 	},
				// 	// 提示框
				// 	tooltip: {
				// 		trigger: 'axis',
				// 	},
				// 	xAxis: {
				// 		type: 'category', // 类目轴
				// 		data: data.userData.map((item) => item.date),
				// 		axisLine: {
				// 			lineStyle: {
				// 				color: '#17b3a3',
				// 			},
				// 		},
				// 		axisLabel: {
				// 			interval: 0,
				// 			color: '#333',
				// 		},
				// 	},
				// 	yAxis: [
				// 		{
				// 			type: 'value',
				// 			axisLine: {
				// 				lineStyle: {
				// 					color: '#17b3a3',
				// 				},
				// 			},
				// 		},
				// 	],
				// 	color: ['#2ec7c9', '#b6a2de'],
				// 	series: [
				// 		{
				// 			name: '新增用户',
				// 			data: data.userData.map((item) => item.new),
				// 			type: 'bar',
				// 		},
				// 		{
				// 			name: '活跃用户',
				// 			data: data.userData.map((item) => item.active),
				// 			type: 'bar',
				// 		},
				// 	],
				// }
				// const U = echarts.init(this.$refs.userEcharts)
				// U.setOption(userOption)

				//饼图
				// const videoOption = {
				// 	tooltip: {
				// 		trigger: 'item',
				// 	},
				// 	color: [
				// 		'#0f78f4',
				// 		'#dd536b',
				// 		'#9462e5',
				// 		'#a6a6a6',
				// 		'#e1bb22',
				// 		'#39c362',
				// 		'#3ed1cf',
				// 	],
				// 	series: [
				// 		{
				// 			data: data.videoData,
				// 			type: 'pie',
				// 		},
				// 	],
				// }
				// const V = echarts.init(this.$refs.videoEcharts)
				// V.setOption(videoOption) -->
<!-- 
		//axios引入的测试
		// this.$http.get('/user?ID=12345')
		// .get('/user?ID=12345')
		// .then(function (response) {
		//   console.log(response);
		// })
		// .catch(function (error) {
		//   console.log(error);
		// });
		// const _this = this -->
