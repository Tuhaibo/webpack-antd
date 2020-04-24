const menuConfig = [
	{

		name: '首页',
		path: '/',
		icon: 'yonghu',

	},
	{

		name: '首页2',
		path: '/home2',
		icon: 'yonghu',

	},
	{
		name: '列表',
		path: '/table',
		icon: 'yonghu',
		children: [
			{
				name: '列表-1',
				path: '/table/first',
			},
			{
				name: '列表-2',
				path: '/table/sec',
			},

		],
	}
]
export {
	menuConfig
}