const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')


module.exports = merge(commonConfig, {
	mode: "development",
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