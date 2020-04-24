import Home from '@pages/Home'
import Table from '@pages/Table'

import Login from '@pages/Login'

import NotFound from '@pages/NotFound'

export default [
	{
		path: '/',
		component: Home,
		exact: true
	},
	{
		path: '/login',
		component: Login,
		exact: true,
		isFullScreen: true,

	},
	{
		path: '/table',
		component: Table,
		exact: true,
		requiresAuth: true,
	},
	{
		component: NotFound,
	}


]