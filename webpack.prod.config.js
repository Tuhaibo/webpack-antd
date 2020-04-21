const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.config.js')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin') // 引入 PWA 插件
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
if(process.env.BUILD_ARGV) {
    let argv = JSON.parse(process.env.BUILD_ARGV)
    if(/prod/.test(argv.pop())) {
        cdn = 'prod'
    }
}
module.exports = merge(commonConfig, {
    mode: "production",
    output: {
        // 输出目录
        path: path.resolve(__dirname, "./build"),
        // 文件名称
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        publicPath: `${cdnBasePath[cdn]}/${process.env.BUILD_GIT_GROUP}/${process.env.BUILD_GIT_PROJECT}/${process.env.BUILD_GIT_BRANCH.split('/')[1]}/build`
    },
    // devtool: 'cheap-module-source-map',
    optimization: {
        usedExports: true,
        // minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
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
            // cacheGroups: {
            //     // 公共代码打包分组配置
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         name: 'vendors'
            //     }
            // }
        },
    },
    plugins: [
        // 清除无用 css---生产环境---csstree-shaking
        // new PurifyCSS({
        //   paths: glob.sync(path.join(__dirname, 'app/*.html')),
        // }),
        // PWA配置，生产环境才需要
        // new WorkboxPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true
        // }),
        // new MiniCssExtractPlugin({
        //   // 这里的配置和webpackOptions.output中的配置相似
        //   // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
        //   filename: 'css/[name].[hash].css',
        //   chunkFilename: 'css/[id].[hash].css',
        // }),
        new OptimizeCSSAssetsPlugin({}),
        new CleanWebpackPlugin()
    ]
});