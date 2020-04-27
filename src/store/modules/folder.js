import { getTreeInfo, download } from '@/api/folder'

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
  }

}

export default {
  namespaced: true,
  actions
}
