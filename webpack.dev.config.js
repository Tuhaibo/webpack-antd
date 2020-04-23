const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')


module.exports = merge(commonConfig, {
	mode: "development",
	optimization: {
		splitChunks: {
			chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
		},
	},
	devtool: 'eval-source-map', //  不会单独生成一个文件 但会显示行和列
	devServer: {
		// hot: true,
		// disableHostCheck: true,
		contentBase: path.resolve(__dirname, "dist"),
		// host: "local.taobao.com", // 可以使用手机访问
		port: 8080,
		open: true,
		// historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
		proxy: {
			// 代理到后端的服务地址
			// "http://alscmarket.daily.taobao.net/gw": "https://market.alsc.taobao.com"
		}
	}

})