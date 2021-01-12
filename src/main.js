import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Print from 'vue-print-nb-z'
import JsonExcel from 'vue-json-excel'
import moment from 'moment'
import '@/icons' // icon
import '@/permission' // permission control
import { iatRecorder } from '@/utils/IatRecorder'
import audio from 'vue-mobile-audio'
import './utils/error-log' // 错误日志
// import VConsole from 'vconsole'
// new VConsole()
// import vueConfig from 'vue.config'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })
Vue.use(Print)
Vue.use(audio)
Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false
Vue.prototype.$moment = moment // 赋值使用
Vue.prototype.iatRecorder = iatRecorder
moment.locale('zh-cn')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
