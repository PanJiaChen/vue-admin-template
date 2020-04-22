import { uploadInit } from '@/api/file'

const actions = {
  uploadInit({ commit }, fileInfo) {
    const { filePath, fileHash, fileSize } = fileInfo
    return new Promise((resolve, reject) => {
      uploadInit({ filePath: filePath, fileHash: fileHash, fileSize: fileSize }).then(response => {
        console.log(response)

        resolve()
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
