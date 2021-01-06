import Vue from 'vue'
import axios from 'axios'
// import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'
import store from '@/store'

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

function checkNeed() {
  const env = process.env.NODE_ENV
  return needErrorLog.includes(env)
}

if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info) {
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    // Vue.nextTick(() => {
    axios
      .post(process.env.VUE_APP_BASE_API + '/error/add', {
        err: err,
        vm: vm,
        info: info,
        name: store.state.user.name
      })
      .then((res) => {
        if (res.data.code === 20000) {
          console.log('错误码已发送')
        } else {
          console.log('错误发送失败：' + res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    console.error(err, info)
    // })
  }
}
