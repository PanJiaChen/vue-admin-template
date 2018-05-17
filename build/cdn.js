const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const package = require('../package')
const externals = {
    // 'element-ui':'ELEMENT'
}
// 生产环境中使用生产环境的 vue
// 开发环境继续使用本地 node_modules 中的 vue
if (process.env.NODE_ENV === 'production') {
    externals['vue'] = 'Vue'
    externals['element-ui'] = 'ELEMENT'
}
// console.log(package.dependencies.vue, package.dependencies['element-ui'])
const vueVersion = package.dependencies.vue
const elementVersion = package.dependencies['element-ui']

// 生产环境默认注入 vue 
// 开发环境中不注入
const assets = (process.env.NODE_ENV === 'production' ? [
    { path: `https://cdn.bootcss.com/vue/${vueVersion}/vue.min.js`, type: 'js' },
    { path: `https://cdn.bootcss.com/element-ui/${elementVersion}/index.js`, type: 'js' },
    { path: `https://cdn.bootcss.com/element-ui/${elementVersion}/locale/zh-CN.min.js`, type: 'js' },
] : []).concat([
    { path: `https://cdn.bootcss.com/element-ui/${elementVersion}/theme-chalk/index.css`, type: 'css' }
])
// console.log(process.env.NODE_ENV, defaultJS)
const plugins = [
    new HtmlWebpackIncludeAssetsPlugin({
        assets,
        // 是否在 webpack 注入的 js 文件后新增？true 为 append, false 为 prepend。
        // 生产环境中，这些 js 应该先加载。
        append: process.env.NODE_ENV !== 'production',
        publicPath: '',
    })
]

console.log(process.env.NODE_ENV, externals, assets)

module.exports = {
    externals,
    plugins
}