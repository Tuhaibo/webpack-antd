console.log(process.env.NODE_ENV, '----process.env.NODE_ENV')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, 'public/index.html'), // 指定模板路径
	filename: 'index.html', // 最终创建的文件名
	minify: {//压缩 html
		removeAttributeQuotes: true,//删除属性双引号
		collapseWhitespace: true,//变成一行
	},
	// hash: true //有一个hash值
	// chunks: ['home']
})

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const miniCssPlugin = new MiniCssExtractPlugin({
	filename: 'css/index.css',// 产生到css目录下
})

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin()//压缩css文件

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin() //每次打包会把dist目录下的文件都删除后重新打包 也可以传入一个数组 告诉清理哪些文件夹


module.exports = {
	entry: "./src/index.js", //入口
	output: {
		// filename: "bundle.js.[hash:8]", //配置hash  :8只显示8位
		filename: "js/index.js", //打包后的文件名
		path: path.resolve(__dirname, "dist"),//路径必须是一个绝对路径
		// publicPath:  'http://www.hanke.com'//公共的路径 
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader?cacheDirectory=true' //开启缓存
					}
				]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					// "style-loader", // 创建style标签，并将css添加进去
					MiniCssExtractPlugin.loader,//生成单独的css文件 产生到css目录下
					"css-loader", // 编译css
					{
						loader: 'postcss-loader', // 对css做预处理
					},
				]
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS
					},
					{
						loader: 'postcss-loader', // 对css做预处理
					},
					{
						loader: 'less-loader', // compiles Less to CSS
						// options: {}

					}
				],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader', // translates CSS into CommonJS
					},
					{
						loader: 'postcss-loader', // 对css做预处理
					},
					{
						loader: 'sass-loader', // compiles Less to CSS
					}
				],
			},
		]
	},
	plugins: [
		htmlPlugin,
		miniCssPlugin,
		optimizeCSSAssetsPlugin,
		cleanPlugin
	]
}