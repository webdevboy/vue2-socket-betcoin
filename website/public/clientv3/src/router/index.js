
import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/pages/Home'
import FAQ from '@/components/pages/FAQ'
import About from '@/components/pages/About'
import Buy from '@/components/pages/Buy'
import Dashboard from '@/components/pages/Dashboard'
import DashboardHome from '@/components/pages/DashboardHome'
import LeaderBoard from '@/components/pages/LeaderBoard'
import Profile from '@/components/pages/Profile'
import Reports from '@/components/pages/Reports'
import ResetPassword from '@/components/pages/ResetPassword'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Trade from '@/components/pages/Trade'
import VerifyEmail from '@/components/pages/VerifyEmail'
import LoginAsUser from '@/components/pages/LoginAsUser'

Vue.use(Router)

export default new Router({
    mode: "hash",
    base: window.location.href,
    scrollBehavior: () => ({ y: 0 }),
	routes: [
		{ 
			path: '/', 
			redirect: '/index'
		},
		{ 
			path: '/index', 
			component: Home
		},
		{
			path: '/index/ref/:ref',
			component: Home
		},
		{
			path: '/login/guid/:guid',
			component: LoginAsUser
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/resetpassword/guid/:guid',
			component: ResetPassword
		},
		{
			path: '/verifyemail/guid/:guid',
			component: VerifyEmail
		},
		{
			path: '/faq',
			component: FAQ
		},
		{
			path: '/about',
			component: About
		},
		{
			path: '/dashboard',
			component: Dashboard,
			children: [
				{
					path: '',
					component: DashboardHome
				},
				{
					path: 'profile',
					component: Profile
				},
				{
					path: 'buy',
					component: Buy
				},
				{
					path: 'trade',
					component: Trade
				},
				{
					path: 'reports',
					component: Reports
				},
				{
					path: 'leader-board',
					component: LeaderBoard
				}
			]
		},
		{
			path: '*',
			redirect: '/index'
		}
	]
})
