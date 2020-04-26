import request from '@/utils/request'
import axios from 'axios'

export function uploadInit(data) {
  return request({
    url: '/file/chunk/init',
    method: 'post',
    data
  })
}

export function uploadFile(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data
  })
}

export function getStreamBinaryReader(file, uploadid, chunkSize = 5 * 1024 * 1024) {
  const reader = new FileReader()
  let offset = 0
  var chunkindex = 1
  return function() {
    return new Promise(function(resolve, reject) {
      if (offset >= file.size) {
        return resolve(null)
      }

      console.log('chunk:', file.name, (offset / file.size) * 100 + '%')

      reader.onloadend = function() {
        resolve(reader.result)
        offset = offset + chunkSize
        chunkindex++
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
      var chunk = file.slice(offset, offset + chunkSize)
      // console.log(chunk, uploadid)
      PostChunk(chunk, uploadid, chunkindex)
    }
    )
  }
}

export function UploadChunk(file, uploadid) {
  const read = getStreamBinaryReader(file, uploadid);
  (async() => {
    let file
    while ((file = await read())) {
      // uploadChunk(file, uploadid)
      console.log(file)
    }
  })()
}

export function PostChunk(file, uploadid, chunkindex) {
  const formData = new FormData()
  formData.append('uploadid', uploadid)
  formData.append('chunkindex', chunkindex)
  formData.append('file', file)
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
    }
  }
  axios.post('/api/file/chunk/upload', formData, config).then(function(res) {
    console.log(res)
  })
}

