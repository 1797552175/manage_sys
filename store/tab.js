import Cookies from 'js-cookie'
import router from '../router/index.js'
export default {
	state: {
		isCollapse: false,
		tabsList: [
			{
				path: '/',
				name: 'home',
				label: '首页',
				icon: 'home',
			},
		],
		//表示高亮显示的面包屑
		currentMenu: null,
		menu: [],
	},
	mutations: {
		collapseMenu(state) {
			state.isCollapse = !state.isCollapse
		},
		selectMenu(state, val) {
			if (val.name !== 'home') {
				state.currentMenu = val
				//判断当前选择项的索引存不存在'state.tabList'
				const result = state.tabsList.findIndex( item => item.name === val.name )
				if (result === -1) {
					state.tabsList.push(val)
				} else {
					state.currentMenu = null
				}
			}
		},
		closeTag(state, val) {
			const result = state.tabsList.findIndex((item) => item.name === val.name)
			state.tabsList.splice(result, 1)
		},
		setMenu(state, val) {
			state.menu = val
			Cookies.set('menu', JSON.stringify(val))
		},
		clearMenu(state) {
			state.menu = []
			Cookies.remove('menu')
		},
		addMenu(state, router) {
			if (!Cookies.get('menu')) {
				return
			}
			const menu = JSON.parse(Cookies.get('menu'))
			state.menu = menu
			const menuArray = []
			menu.forEach((item) => {
				if (item.children) {
					item.children = item.children.map((item) => {
						item.component = () => import(`../src/views/${item.url}`)
						return item
					})
					menuArray.push(...item.children)
				} else {
					item.component = () => import(`../src/views/${item.url}`)
					menuArray.push(item)
				}
			})
			//动态路由的添加
			menuArray.forEach((item) => {
				// console.log(router)
				router.addRoute('Main', item)
			})
		},
	},
}
