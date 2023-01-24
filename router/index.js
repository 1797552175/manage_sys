//编写路由逻辑代码的地方
import Vue from 'vue'
//引入vue-touter 文件，vue内置路由文件
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'   这是全局引用

Vue.use(VueRouter)

//路由配置的核心代码
const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('../src/views/login/login.vue'),
	},
	{
		path: '/',
		name: 'Main',
		//这是按需引用的方法
		component: () => import('../src/views/Main.vue'),
		children: [
			// {
			// 	path: '/home',
			// 	name: 'home',
			// 	component: () => import('../src/views/home'),
			// },
			// {
			// 	path: '/user',
			// 	name: 'user',
			// 	component: () => import('../src/views/User'),
			// },
			// {
			// 	path: '/mall',
			// 	name: 'mall',
			// 	component: () => import('../src/views/mall'),
			// },
			// {
			// 	path: '/page1',
			// 	name: 'page1',
			// 	component: () => import('../src/views/other/pageOne.vue'),
			// },
			// {
			// 	path: '/page2',
			// 	name: 'page2',
			// 	component: () => import('../src/views/other/pageTwo.vue'),
			// },
		],
	},
]

const router = new VueRouter({
	mode: 'history',
	routes,
})

export default router
