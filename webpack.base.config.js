const isProduction = process.env.NODE_ENV === 'production';
// console.log(isProduction)
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
	title: 'webpack-主页',// 配置生成页面的标题
	// hash: true //有一个hash值
	// chunks: ['home']
})

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const WebpackBar = require('webpackbar');
const webpackBarPlugin = new WebpackBar() //进度条插件

const definePlugin = new webpack.DefinePlugin({ //判断开发环境的插件
	DEV: JSON.stringify(process.env.NODE_ENV)
})

const MomentLocalesWebpackPlugin = require('moment-locales-webpack-plugin');
const momentLocalesPlugin = new MomentLocalesWebpackPlugin({ localesToKeep: ['zh-cn'] }) //只加载moment 里面的中文语言包

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const addAssetHtmlWebpackPlugin = new AddAssetHtmlWebpackPlugin([{ //添加dll生成的js文件到html
	filepath: path.resolve(__dirname, 'public/_dll_vendor.js'),
	includeSourcemap: false,
	hash: true,
}])

const dllReferencePlugin = new webpack.DllReferencePlugin({
	manifest: path.resolve(__dirname, 'public', 'manifest.json')
})

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = {
	entry: "./src/index.js", //入口
	output: {
		// filename: "bundle.js.[hash:8]", //配置hash  :8只显示8位
		filename: "js/index.js", //打包后的文件名
		path: path.resolve(__dirname, "dist"),//路径必须是一个绝对路径
		// publicPath:  'http://www.xxx.com'//公共的路径 
	},
	resolve: {
		// modules: [path.resolve('node_modules')],//指定解析的模块
		extensions: ['.js', '.jsx', '.css', '.json'],//扩展名 可以省略 需配置 extensions  依次解析
		// mainFields: ['style', 'main'], //入口文件的名字 默认找index.js,或者用 mainFields  入口的字段 先找style 再找main
		alias: {
			"@": path.join(__dirname, "src"),
			"@pages": path.join(__dirname, "src/pages"),
			"@router": path.join(__dirname, "src/router"),
			"@assets": path.join(__dirname, "src/assets")
		}
	},
	module: {
		noParse: /jquery|lodash/,//不去解析jquery,lodash中的依赖库
		rules: [
			// {
			// 	// enforce: 'pre', //强制 pre 之前执行  post 之后  未设置为普通的loader
			// 	test: /\.(js|jsx?)$/,
			// 	exclude: /node_modules/,
			// 	loader: 'eslint-loader',
			// },
			{
				test: /\.(js|jsx?)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
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
					{ loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader' },
					// "style-loader", // 创建style标签，并将css添加进去
					//'MiniCssExtractPlugin.loader' 生成单独的css文件 产生到css目录下
					"css-loader", // 编译css
					{
						loader: 'postcss-loader', // 对css做预处理
					},
				]
			},
			{
				test: /\.less$/,
				// exclude: /node_modules/,
				use: [
					{ loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader' },
					{
						loader: 'css-loader', // translates CSS into CommonJS
					},
					{
						loader: 'less-loader', // compiles Less to CSS
						options: {
							modifyVars: {
								// 'primary-color': '#4D63FC',
								'tooltip-color': 'rgba(0, 0, 0, 0.75)',
								'tooltip-bg': '#fff',
							},
							javascriptEnabled: true,
						},

					}
				],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{ loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader' },
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
			{
				test: /\.(png|jpg|jpeg|gif|svg)/,
				exclude: /node_modules/,
				use: {
					loader: 'url-loader',
					options: {
						outputPath: 'img/', // 图片输出的路径
						limit: 3, //做一个限制  当小于多少k 用base64来转化 base64文件可以减少http请求 但是比原文件大3分之1
						// publicPath: 'img/',//只在图片中有一个公共的路径，在解析img的loader中单独配置
					}
				}
			},
			{
				test: /\.(eot|woff2?|ttf|svg)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]-[hash:5].min.[ext]',
							limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
							outputPath: 'fonts/',
							// publicPath: 'fonts/'
						}
					}
				]
			}
		]
	},
	plugins: [
		htmlPlugin,
		webpackBarPlugin,
		definePlugin,
		momentLocalesPlugin,
		addAssetHtmlWebpackPlugin,
		dllReferencePlugin,
		// new BundleAnalyzerPlugin()
	]
}