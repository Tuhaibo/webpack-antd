import React from 'React'
import { render } from 'react-dom'
import { HashRouter as Router } from "react-router-dom";
import '../public/css/common.scss'
import { Provider } from 'react-redux'
import store from '@/store'
import renderRoutes from './react-router-config'

import routes from './router-config'
import BasicLayout from '@/layouts/index'

const authed = false // 如果登陆之后可以利用redux修改该值(关于redux不在我们这篇文章的讨论范围之内）
const authPath = '/login' // 默认未登录的时候返回的页面，可以自行设置
// 
render(
	<Provider store={store}>
		<Router>
			<BasicLayout >
				{renderRoutes(routes, authed, authPath)}
			</BasicLayout >
		</Router>
	</Provider>
	,
	document.getElementById("root"))