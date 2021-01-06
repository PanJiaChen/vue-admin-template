import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import settings from '@/settings'

const { errorLog: needErrorLog } = settings

function checkNeed() {
  const env = process.env.NODE_ENV
  return needErrorLog.includes(env)
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true // send cookies when cross-domain requests
  // timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['x-csrftoken'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (process.env.NODE_ENV === 'development') {
      console.log(res)
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您已被登出，请重新登陆', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      if (checkNeed()) {
        axios
          .post(process.env.VUE_APP_BASE_API + '/error/add', {
            err: res.message,
            vm: '后端错误',
            info: '后端错误',
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
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
