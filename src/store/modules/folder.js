import { getTreeInfo, download, deleteFile, addFolder } from '@/api/folder'
import { Message } from 'element-ui'

const actions = {
  getTreeInfo({ commit, state }, treeInfo) {
    const { zones } = treeInfo
    return new Promise((resolve, reject) => {
      getTreeInfo({ zones: zones }).then(response => {
        resolve(response.data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  download({ commit, state }, treeInfo) {
    const { zones } = treeInfo
    return new Promise((resolve, reject) => {
      download({ zones: zones }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  delete({ commit, state }, treeInfo) {
    const { zones } = treeInfo
    return new Promise((resolve, reject) => {
      deleteFile({ zones: zones }).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  addFolder({ commit, state }, treeInfo) {
    const { zones, folderName } = treeInfo
    return new Promise((resolve, reject) => {
      addFolder({ zones: zones, folderName: folderName }).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  actions
}
