const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin() //每次打包会把dist目录下的文件都删除后重新打包 也可以传入一个数组 告诉清理哪些文件夹

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const miniCssPlugin = new MiniCssExtractPlugin({
	// filename: 'css/index.css', 产生到css目录下 推荐使用contenthash
	filename: 'css/[name].[contenthash:8].css',
	// chunkFilename: 'css/[id].[contenthash].css',
})

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({})//压缩css文件


const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob')
const purifyCSSPlugin = new PurifyCSSPlugin({ // 清除无用 css---生产环境---csstree-shaking
	paths: glob.sync(path.join(__dirname, 'public/*.html')),
})

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

// const WorkboxPlugin = require('workbox-webpack-plugin') // 引入 PWA 插件
// const exec = require('child_process').execSync;
// const name = exec('git init&&git rev-parse --abbrev-ref HEAD');
// const buildArgv = require('yargs-parser')(process.env.BUILD_ARGV_STR);
// const BUILD_GIT_BRANCH = process.env.BUILD_GIT_BRANCH

// console.log(process.env.BUILD_ARGV, '---buld')
// console.log(process.env.BUILD_ARGV_STR, '---buld1')
// console.log(process.env.BUILD_DEBUG, '---buld3')
// console.log(process.env.BUILD_ENV, '---buld2')
// console.log(process.env.BUILD_GIT_BRANCH, '---buld21')
// console.log(process.env.BUILD_GIT_GROUP, '----process.env.group')
// console.log(process.env.BUILD_GIT_PROJECT, '----process.env.BUILD_GIT_PROJECT')
// console.log(process.env.BUILD_ARGV, '---process.env.BUILD_ARGV ')
// console.log(path.join(process.cwd(),process.env.BUILD_DEST), '------butld_dest')

// ["--def_publish_type=webapp","--def_publish_pages=","--def_publish_env=daily"] ---buld
// --def_publish_type=webapp --def_publish_pages= --def_publish_env=daily ---buld1
//  ---buld3
// cloud ---buld2
// daily/0.0.2 ---buld21

// ["--def_publish_type=webapp","--def_publish_pages=[\"index.html\"]","--def_publish_env=prod"] ---buld
// --def_publish_type=webapp --def_publish_pages=["index.html"] --def_publish_env=prod ---buld1
//  ---buld3

const cdnBasePath = {
	'daily': 'https://dev.g.alicdn.com',
	'prod': 'https://g.alicdn.com'
}
let cdn = 'daily'
if (process.env.BUILD_ARGV) {
	let argv = JSON.parse(process.env.BUILD_ARGV)
	if (/prod/.test(argv.pop())) {
		cdn = 'prod'
	}
}
module.exports = merge(commonConfig, {
	mode: "production",
	output: {
		// 输出目录
		path: path.resolve(__dirname, "dist"),
		// 文件名称
		filename: 'js/[name].[chunkhash:8].js', //js文件生产环境推荐使用chunkhash
		chunkFilename: 'js/[name].[chunkhash:8].js',
		// publicPath: `${cdnBasePath[cdn]}/${process.env.BUILD_GIT_GROUP}/${process.env.BUILD_GIT_PROJECT}/${process.env.BUILD_GIT_BRANCH.split('/')[1]}/build`
	},
	optimization: {
		usedExports: true,
		// minimize: true,
		minimizer: [terserPlugin, optimizeCSSAssetsPlugin],
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				commons: {
					chunks: 'all',
					minChunks: 2,
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
				},
				vendors: {
					test: /react/,
					name: 'vendors'
				}
			}
		},
	},
	plugins: [
		cleanPlugin,
		miniCssPlugin,
		optimizeCSSAssetsPlugin,
		purifyCSSPlugin,
		// PWA配置，生产环境才需要
		// new WorkboxPlugin.GenerateSW({
		//      cacheId: 'webpack-pwa', // 设置前缀
		// 		skipWaiting: true, // 强制等待中的 Service Worker 被激活
		// 		clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
		// 		swDest: 'service-wroker.js', // 输出 Service worker 文件
		// 		globPatterns: ['**/*.{html,js,css,png.jpg}'], // 匹配的文件
		// 		globIgnores: ['service-wroker.js'], // 忽略的文件
		// 		runtimeCaching: [
		// 	     配置路由请求缓存
		// 		  {
		// 			urlPattern: /.*\.js/, // 匹配文件
		// 			handler: 'networkFirst' // 网络优先
		// 		  }
		// 	    ]
		// }),
	]
});