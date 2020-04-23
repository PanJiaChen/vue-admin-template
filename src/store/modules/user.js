import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { uploadInit, uploadChunk, getStreamReader } from '@/api/file'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    uploadid: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_UPLOADID: (state, uploadid) => {
    state.uploadid = uploadid
  }

}

const actions = {
  // user login 设置Token
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.SET_TOKEN)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  register({ commit }, userInfo) {
    const { username, password, repassword } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password, repassword: repassword }).then(response => {
        // const { data } = response
        // commit('SET_TOKEN', data.token)
        // setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(response)

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  uploadInit({ commit, state }, fileInfo) {
    const { file, filePath, fileHash, fileSize } = fileInfo

    return new Promise((resolve, reject) => {
      uploadInit({ filePath: filePath, fileHash: fileHash, fileSize: fileSize }).then(response => {
        // console.log(response)
        commit('SET_UPLOADID', response.data.UploadId)
        // ---------------------------------------------

        const read = getStreamReader(file);

        (async() => {
          let chunk
          var chunk_index = 0
          while ((chunk = await read())) {
            chunk_index++
            console.log('chunk', chunk)
            await uploadChunk({ chunk_index: chunk_index, chunk: chunk, uploadid: response.data.UploadId }).then(response => {
              console.log('chunk', response)
            }).catch(error => {
              console.log(error)
            })
          }
        })()

        // ---------------------------------------------
        resolve(response)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

