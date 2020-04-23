import { uploadInit, uploadFile } from '@/api/file'

const actions = {
  uploadInit({ commit, state }, fileInfo) {
    const { filePath, fileHash, fileSize } = fileInfo
    return new Promise((resolve, reject) => {
      uploadInit({ filePath: filePath, fileHash: fileHash, fileSize: fileSize }).then(response => {
        // console.log(response)
        // commit(' SET_UPLOADID', response.data.UploadId)
        resolve(response)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  uploadFile({ commit, state }, fileInfo) {
    const { file } = fileInfo
    return new Promise((resolve, reject) => {
      uploadFile({ file: file }).then(response => {
        // console.log(response)
        // commit(' SET_UPLOADID', response.data.UploadId)
        resolve(response)
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
