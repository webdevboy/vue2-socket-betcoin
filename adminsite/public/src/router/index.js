import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Container from 'components/Container'

// Components -> Pages
import Login from 'components/pages/Login'
import Register from 'components/pages/Register'
import Dashboard from 'components/pages/Dashboard'
import Users from 'components/pages/Users'
import UserProfile from 'components/pages/UserProfile'
import Deposits from 'components/pages/Deposits'
import DepositDetail from 'components/pages/DepositDetail'
import CreateDeposit from 'components/pages/CreateDeposit'
import EarningDistributions from 'components/pages/EarningDistributions'
import EarningDistributionDetail from 'components/pages/EarningDistributionDetail'
import CreateEarningDistribution from 'components/pages/CreateEarningDistribution'
import Earnings from 'components/pages/Earnings'
import EarningDetail from 'components/pages/EarningDetail'
import CreateEarning from 'components/pages/CreateEarning'

Vue.use(Router)

export default new Router({
    mode: 'hash',
        linkActiveClass: 'open active',
        scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: '/login'
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
            path: '/dashboard',
            component: Container,
            children: [
                {
                    path: 'home',
                    component: Dashboard
                },
                {
                    path: 'users',
                    component: Users
                },
                {
                    path: 'profile',
                    component: UserProfile  
                },
                {
                    path: 'deposits',
                    component: Deposits
                },
                {
                    path: 'deposit-detail',
                    component: DepositDetail
                },
                {
                    path: 'create-deposit',
                    component: CreateDeposit
                },
                {
                    path: 'earning-distributions',
                    component: EarningDistributions
                },
                {
                    path: 'earning-distribution-detail',
                    component: EarningDistributionDetail
                },
                {
                    path: 'create-earning-distribution',
                    component: CreateEarningDistribution
                },
                {
                    path: 'earnings',
                    component: Earnings
                },
                {
                    path: 'earning-detail',
                    component: EarningDetail
                },
                {
                    path: 'create-earning',
                    component: CreateEarning
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
