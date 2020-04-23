const path = require('path')
const webpack = require('webpack')

const TerserPlugin = require('terser-webpack-plugin');
const terserPlugin = new TerserPlugin({
	cache: true,// 使用 cache，加快二次构建速度
	extractComments: false,//不打包出.txt文件
	terserOptions: {
		parallel: true,  // 多线程压缩
		compress: {
			unused: true,// 删除无用的代码
			drop_debugger: true, // 删掉 debugger
			drop_console: true, // 移除 console
			dead_code: true //  移除无用的代码
		}
	}
})

//webpack自带插件  变成动态链接库
const dllPlugin = new webpack.DllPlugin({ //name==library
	name: '_dll_[name]',
	//manifest.json就是一个任务清单
	path: path.resolve(__dirname, 'public', 'manifest.json')
})
const config = {
	mode: 'production',
	optimization: {
		minimizer: [terserPlugin],
	},
	entry: {
		vendor: [
			'react',
			'react-dom',
			'react-router-dom',
			'redux',
			'redux-thunk',
			'axios',
		]
	},
	optimization: {
		minimize: true,
	},
	output: {
		filename: '_dll_[name].js', //产生文件名
		path: path.resolve(__dirname, 'public'),
		//指定 var a = '...'
		library: '_dll_[name]',
		//配置commonjs 会变成export["ab"] 配置umd会变成umd模式 可配置 commonjs var this 主要用var(默认就是)
		//libraryTarget: 'var'
	},
	plugins: [
		//导出 manifest.json 以及 _dll_react.js
		dllPlugin,
	]
}

module.exports = config
