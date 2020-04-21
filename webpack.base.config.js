const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, 'public/index.html'), // 指定模板路径
	filename: 'index1.html', // 最终创建的文件名

	// chunks: ['home']
})
console.log(process.env.NODE_ENV, '----process.env.NODE_ENV')
module.exports = {
	entry: "./src/index.js", //入口
	output: {
		// filename: "bundle.js.[hash:8]", //配置hash  :8只显示8位
		filename: "bundle.js", //打包后的文件名
		path: path.resolve(__dirname, "dist"),//路径必须是一个绝对路径
		// publicPath:  'http://www.hanke.com'//公共的路径 
	},
	module: {
	},
	plugins: [
		htmlPlugin
	]
}