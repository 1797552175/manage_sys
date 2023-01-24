// 搭脚手架引过程 1、2为必选项，
import Vue from 'vue'

// 1.引入入口文件（默认访问的url地址），全局引入样式文件
import App from './App.vue'
import './assets/less/index.less'

// 2.引入一个router, 在根目录下创建一个router文件夹
import router from '../router'

// 3.引入vuex状态机
import store from '../store'

// 4. 引入axion文件，请求后端数据方法
import http from 'axios'

// 5. 引入mock文件，用于模拟后端数据库
import '../api/mock.js'

// 6. 引入外部UI组件库
import {
	Button,
	Radio,
	Container,
	Main,
	Header,
	Aside,
	MenuItemGroup,
	MenuItem,
	Menu,
	Submenu,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Row,
	Col,
	Card,
	Table,
	Breadcrumb,
	BreadcrumbItem,
	Tag,
	Form,
	FormItem,
	Input,
	Select,
	Switch,
	DatePicker,
	Option,
	Dialog,
	Pagination,
	TableColumn,
	MessageBox,
	Message,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

//局部引用
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Tag)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$messagebox = MessageBox
//引用axios

//导航守卫，实现路由监听
// router.beforeEach((to, from, next) => {
// 	store.commit('getToken') //防止页面刷新提前拿token
// 	const token = store.state.user.token
// 	if (!token && to.name !== 'login') {
// 		next({ name: 'login' })
// 	} else if (token && to.name === 'login') {
// 		next({ name: 'home' })
// 	} else {
// 		next()
// 	}
// })

new Vue({
	store,
	router,
	render: (h) => h(App),
	created() {
		store.commit('getToken') 
		const token = store.state.user.token
		if (!token) this.$router.push({ name: 'login' })
		if (token) {
			this.$store.commit('addMenu', this.$router)
			this.$router.push({ name: 'home' })
		}
	}
}).$mount('#app')
