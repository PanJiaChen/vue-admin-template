/**
 * Created by PanJiaChen on 16/11/18.
 */
import { isexist } from '@/api/user'
/**
 * @param {string} path
 * @returns {Promise}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Promise}
 */

export function validUsername(str) {
  // /*
  //   校验用户名是否存在
  // */

  return new Promise((resolve, reject) => {
    isexist({ username: str.trim() }).then(response => {
      resolve(response.msg === 'true')
    }).catch(error => {
      reject(error)
    })
  })
}

