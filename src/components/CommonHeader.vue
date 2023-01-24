<template>
	<header>
		<div class="l-content">
			<el-button
				@click="handleMenu"
				plain
				icon="el-icon-menu"
				sizi="mini"
			></el-button>
			<!-- <h3 style="color: #fff">首页</h3> -->
			<el-breadcrumb separator="/">
				<el-breadcrumb-item
					v-for="item in tags"
					:key="item.path"
					:to="{ path: item.path }"
					>{{ item.label }}</el-breadcrumb-item
				>
			</el-breadcrumb>
		</div>
		<div class="r-content">
			<el-dropdown trigger="click" sizi="mini">
				<span>
					<img class="user" :src="userImg" />
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</header>
</template>
<script>
import { mapState } from 'vuex'
export default {
	name: 'CommonHeader',
	data() {
		return {
			userImg: require('../assets/images/user.png'),
			isActive: { color: '#303133' }
		}
	},
	methods: {
		handleMenu() {
			this.$store.commit('collapseMenu')
		},
		logout() {
			this.$store.commit('clearToken')
			this.$store.commit('clearMenu')
			this.$router.push('/login')
		},
		onSelect() {
			isActive = { color: '#606266'}
		}
	},
	computed: {
		...mapState({
			tags: (state) => state.tab.tabsList,
		}),
	},
}
</script>
<style lang="less" scoped>
header {
	//flex 布局 ，高度百分之百
	display: flex;
	height: 100%;
	//左右居中
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	padding: 0px;
}
.l-content {
	//flex 布局 上下居中
	display: flex;
	align-items: center;
	.el-buttun {
		margin-right: 20px;
	}
}
.r-content {
	.user {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
}
</style>
