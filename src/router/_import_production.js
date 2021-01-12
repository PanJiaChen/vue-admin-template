// 生产环境导入组件
module.exports = file => () => import('@/views/' + file + '.vue')
