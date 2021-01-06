/**
 * Created by lycheng on 2019/8/1.
 *
 * 语音听写流式 WebAPI 接口调用示例 接口文档（必看）：https://doc.xfyun.cn/rest_api/语音听写（流式版）.html
 * webapi 听写服务参考帖子（必看）：http://bbs.xfyun.cn/forum.php?mod=viewthread&tid=38947&extra=
 * 语音听写流式WebAPI 服务，热词使用方式：登陆开放平台https://www.xfyun.cn/后，找到控制台--我的应用---语音听写---个性化热词，上传热词
 * 注意：热词只能在识别的时候会增加热词的识别权重，需要注意的是增加相应词条的识别率，但并不是绝对的，具体效果以您测试为准。
 * 错误码链接：
 * https://www.xfyun.cn/doc/asr/voicedictation/API.html#%E9%94%99%E8%AF%AF%E7%A0%81
 * https://www.xfyun.cn/document/error-code （code返回错误码时必看）
 * 语音听写流式WebAPI 服务，方言或小语种试用方法：登陆开放平台https://www.xfyun.cn/后，在控制台--语音听写（流式）--方言/语种处添加
 * 添加后会显示该方言/语种的参数值
 *
 */

// 1. websocket连接：判断浏览器是否兼容，获取websocket url并连接，这里为了方便本地生成websocket url
// 2. 获取浏览器录音权限：判断浏览器是否兼容，获取浏览器录音权限，
// 3. js获取浏览器录音数据
// 4. 将录音数据处理为文档要求的数据格式：采样率16k或8K、位长16bit、单声道；该操作属于纯数据处理，使用webWork处理
// 5. 根据要求（采用base64编码，每次发送音频间隔40ms，每次发送音频字节数1280B）将处理后的数据通过websocket传给服务器，
// 6. 实时接收websocket返回的数据并进行处理

// ps: 该示例用到了es6中的一些语法，建议在chrome下运行

import CryptoJS from 'crypto-js'
import TransWorker from './transcode2.worker.js'
// import './index.css'
// import {getAuthUrl} from '@/api/websocketUrl.js'

// const transWorker = new Worker('./transcode2.worker.js')
const transWorker = new TransWorker()
// console.log(transWorker)
// APPID，APISecret，APIKey在控制台-我的应用-语音听写（流式版）页面获取
const APPID = '5fc43f4e'
const API_SECRET = '36bed5c0abb02f5b27a5331188f3af08'
const API_KEY = 'b46fa3a731604783f3dc141b4e63628c'
var startTime = ''
var endTime = ''

/**
 * 获取websocket url
 * 该接口需要后端提供，这里为了方便前端处理
 */
function getWebSocketUrl() {
  return new Promise((resolve, reject) => {
    // 请求地址根据语种不同变化
    var url = 'wss://iat-api.xfyun.cn/v2/iat'
    var host = 'iat-api.xfyun.cn'
    var apiKey = API_KEY
    var apiSecret = API_SECRET
    var date = new Date().toGMTString()
    var algorithm = 'hmac-sha256'
    var headers = 'host date request-line'
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
    var signature = CryptoJS.enc.Base64.stringify(signatureSha)
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    var authorization = btoa(authorizationOrigin)
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
    resolve(url)
  })
}

class IatRecorder {
  constructor({ language, accent, appId } = {}) {
    const self = this
    this.status = 'null'
    this.language = language || 'zh_cn'
    this.accent = accent || 'mandarin'
    this.appId = appId || APPID
    // 记录音频数据
    this.audioData = []
    // 记录听写结果
    this.resultText = ''
    // 保存录音
    this.leftDataList = []
    this.rightDataList = []
    // 保存录音 end
    // wpgs下的听写结果需要中间状态辅助记录

    this.resultTextTemp = ''
    this.stream_track = null
    transWorker.onmessage = function(event) {
      // console.log('构造方法中', self.audioData)
      self.audioData.push(...event.data)
    }
  }
  // 修改录音听写状态
  setStatus(status) {
    this.onWillStatusChange && this.status !== status && this.onWillStatusChange(this.status, status)
    this.status = status
  }
  setResultText({ resultText, resultTextTemp } = {}) {
    // console.log(resultText + '-----' + resultTextTemp)
    this.onTextChange && this.onTextChange(resultTextTemp || resultText || '')
    resultText !== undefined && (this.resultText = resultText)
    resultTextTemp !== undefined && (this.resultTextTemp = resultTextTemp)
  }
  // 修改听写参数
  setParams({ language, accent } = {}) {
    language && (this.language = language)
    accent && (this.accent = accent)
  }
  // 连接websocket
  connectWebSocket() {
    return getWebSocketUrl().then(url => {
      let iatWS
      if ('WebSocket' in window) {
        iatWS = new WebSocket(url)
      } else {
        alert('浏览器不支持WebSocket')
        return
      }
      this.webSocket = iatWS
      this.setStatus('init')
      iatWS.onopen = e => {
        this.setStatus('ing')
        // 重新开始录音
        setTimeout(() => {
          this.webSocketSend()
        }, 500)
      }
      iatWS.onmessage = e => {
        this.result(e.data)
      }
      iatWS.onerror = e => {
        this.recorderStop()
      }
      iatWS.onclose = e => {
        endTime = Date.parse(new Date())
        console.log('持续时间', endTime - startTime)
        this.recorderStop()
      }
    })
  }
  getUserMedia(constrains) {
    if (navigator.mediaDevices.getUserMedia) {
      // 最新标准API
      navigator.mediaDevices.getUserMedia(constrains).then(stream => { this.getMediaSuccess(stream) }).catch(err => { this.getMediaFail(err) })
    } else if (navigator.webkitGetUserMedia) {
      // webkit内核浏览器
      navigator.webkitGetUserMedia(constrains).then(stream => { this.getMediaSuccess(stream) }).catch(err => { this.getMediaFail(err) })
    } else if (navigator.mozGetUserMedia) {
      // Firefox浏览器
      navigator.mozGetUserMedia(constrains).then(stream => { this.getMediaSuccess(stream) }).catch(err => { this.getMediaFail(err) })
    } else if (navigator.getUserMedia) {
      // 旧版API
      navigator.getUserMedia(constrains).then(stream => { this.getMediaSuccess(stream) }).catch(err => { this.getMediaFail(err) })
    } else {
      if (navigator.userAgent.toLowerCase().match(/chrome/) && location.origin.indexOf('https://') < 0) {
        alert('chrome下获取浏览器录音功能，因为安全性问题，需要在localhost或127.0.0.1或https下才能获取权限')
      } else {
        alert('无法获取浏览器录音功能，请升级浏览器或使用chrome')
      }
      this.audioContext && this.audioContext.close()
      return
    }
  }
  // 初始化浏览器录音
  recorderInit() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    // 创建音频环境
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.audioContext.resume()
      if (!this.audioContext) {
        alert('浏览器不支持webAudioApi相关接口')
        return
      }
    } catch (e) {
      if (!this.audioContext) {
        alert('浏览器不支持webAudioApi相关接口')
        return
      }
    }
    // console.log(navigator, navigator.mediaDevices)
    // 获取浏览器录音权限

    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   // console.log(navigator)
    //   navigator.mediaDevices
    //     .getUserMedia({
    //       audio: true,
    //       video: false
    //     })
    //     .then(stream => {
    //       // console.log(stream)
    //       getMediaSuccess(stream)
    //     })
    //     .catch(e => {
    //       getMediaFail(e)
    //     })
    // } else if (navigator.getUserMedia) {
    //   navigator.getUserMedia(
    //     {
    //       audio: true,
    //       video: false
    //     },
    //     stream => {
    //       getMediaSuccess(stream)
    //     },
    //     function(e) {
    //       getMediaFail(e)
    //     }
    //   )
    // } else {
    //   if (navigator.userAgent.toLowerCase().match(/chrome/) && location.origin.indexOf('https://') < 0) {
    //     alert('chrome下获取浏览器录音功能，因为安全性问题，需要在localhost或127.0.0.1或https下才能获取权限')
    //   } else {
    //     alert('无法获取浏览器录音功能，请升级浏览器或使用chrome')
    //   }
    //   this.audioContext && this.audioContext.close()
    //   return
    // }
    const constrains = { audio: true }
    if (navigator.mediaDevices.getUserMedia) {
      // 最新标准API
      navigator.mediaDevices.getUserMedia(constrains).then(stream => { getMediaSuccess(stream) }).catch(err => { getMediaFail(err) })
    } else if (navigator.webkitGetUserMedia) {
      // webkit内核浏览器
      navigator.webkitGetUserMedia(constrains).then(stream => { getMediaSuccess(stream) }).catch(err => { getMediaFail(err) })
    } else if (navigator.mozGetUserMedia) {
      // Firefox浏览器
      navigator.mozGetUserMedia(constrains).then(stream => { getMediaSuccess(stream) }).catch(err => { getMediaFail(err) })
    } else if (navigator.getUserMedia) {
      // 旧版API
      navigator.getUserMedia(constrains).then(stream => { getMediaSuccess(stream) }).catch(err => { getMediaFail(err) })
    } else {
      if (navigator.userAgent.toLowerCase().match(/chrome/) && location.origin.indexOf('https://') < 0) {
        alert('chrome下获取浏览器录音功能，因为安全性问题，需要在localhost或127.0.0.1或https下才能获取权限')
      } else {
        alert('无法获取浏览器录音功能，请升级浏览器或使用chrome')
      }
      this.audioContext && this.audioContext.close()
      return
    }
    var that = this
    // 获取浏览器录音权限成功的回调
    const getMediaSuccess = stream => {
      // console.log('getMediaSuccess')
      // 创建一个用于通过JavaScript直接处理音频
      // 新增保存录音

      // 新增保存录音end
      this.scriptProcessor = this.audioContext.createScriptProcessor(4096, 2, 2)
      // 保存录音

      // 保存录音 end
      this.scriptProcessor.onaudioprocess = e => {
        // 去处理音频数据
        if (this.status === 'ing') {
          // debugger
          transWorker.postMessage(e.inputBuffer.getChannelData(0))
          // 保存录音

          const leftChannelData = e.inputBuffer.getChannelData(0)
          const rightChannelData = e.inputBuffer.getChannelData(1)
          // 需要克隆一下
          that.leftDataList.push(leftChannelData.slice(0))
          that.rightDataList.push(rightChannelData.slice(0))

          // 保存录音 end
        }
      }
      // 创建一个新的MediaStreamAudioSourceNode 对象，使来自MediaStream的音频可以被播放和操作
      this.mediaSource = this.audioContext.createMediaStreamSource(stream)
      // 连接
      this.stream_track = stream.getTracks()[0]
      this.mediaSource.connect(this.scriptProcessor)
      this.scriptProcessor.connect(this.audioContext.destination)
      this.connectWebSocket()
    }

    const getMediaFail = (e) => {
      alert('请求麦克风失败')
      console.log(e)
      this.audioContext && this.audioContext.close()
      this.audioContext = undefined
      // 关闭websocket
      if (this.webSocket && this.webSocket.readyState === 1) {
        this.webSocket.close()
      }
    }
  }
  recorderStart() {
    if (!this.audioContext) {
      this.recorderInit()
      console.log('录音初始化')
    } else {
      this.audioContext.resume()
      console.log('继续录音')
      this.connectWebSocket()
    }
  }
  // 暂停录音
  recorderStop() {
    // safari下suspend后再次resume录音内容将是空白，设置safari下不做suspend
    if (!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgen))) {
      this.audioContext && this.audioContext.suspend()
    }
    // console.log('audioContext', this.audioContext)
    this.setStatus('end')
    // this.stream_track.stop()
    // 发送语音并保存点击播放
    if (this.leftDataList.length !== 0) {
      this.stopRecord(this.leftDataList, this.rightDataList)
    }
    return this.stream_track
  }
  //
  mergeArray(list) {
    const length = list.length * list[0].length
    const data = new Float32Array(length)
    let offset = 0
    for (let i = 0; i < list.length; i++) {
      data.set(list[i], offset)
      offset += list[i].length
    }
    return data
  }
  stopRecord(leftDataList, rightDataList) {
    // 停止录音
    const leftData = this.mergeArray(leftDataList)
    const rightData = this.mergeArray(rightDataList)
    const audioData = this.interleaveLeftAndRight(leftData, rightData)
    const wavBuffer = this.createWavFile(audioData)
    this.playRecord(wavBuffer)
  }
  interleaveLeftAndRight(left, right) {
    const totalLength = left.length + right.length
    const data = new Float32Array(totalLength)
    for (let i = 0; i < left.length; i++) {
      const k = i * 2
      data[k] = left[i]
      data[k + 1] = right[i]
    }
    return data
  }
  createWavFile(audioData) {
    // console.log(this.audioData, this.audioContext)
    const WAV_HEAD_SIZE = 44
    const buffer = new ArrayBuffer(audioData.length * 2 + WAV_HEAD_SIZE)
    // 需要用一个view来操控buffer
    const view = new DataView(buffer)
    // 写入wav头部信息
    // RIFF chunk descriptor/identifier
    this.writeUTFBytes(view, 0, 'RIFF')
    // RIFF chunk length
    view.setUint32(4, 44 + audioData.length * 2, true)
    // RIFF type
    this.writeUTFBytes(view, 8, 'WAVE')
    // format chunk identifier
    // FMT sub-chunk
    this.writeUTFBytes(view, 12, 'fmt ')
    // format chunk length
    view.setUint32(16, 16, true)
    // sample format (raw)
    view.setUint16(20, 1, true)
    // stereo (2 channels)
    view.setUint16(22, 2, true)
    // sample rate
    view.setUint32(24, 48000, true)
    // byte rate (sample rate * block align)
    view.setUint32(28, 48000 * 2, true)
    // block align (channel count * bytes per sample)
    view.setUint16(32, 2 * 2, true)
    // bits per sample
    view.setUint16(34, 16, true)
    // data sub-chunk
    // data chunk identifier
    this.writeUTFBytes(view, 36, 'data')
    // data chunk length
    view.setUint32(40, audioData.length * 2, true)
    // 写入PCM数据
    const length = audioData.length
    let index = 44
    const volume = 1
    for (let i = 0; i < length; i++) {
      view.setInt16(index, audioData[i] * (0x7FFF * volume), true)
      index += 2
    }
    return buffer
  }
  writeUTFBytes(view, offset, string) {
    var lng = string.length
    for (var i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }
  playRecord(arrayBuffer) {
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'audio/wav' })
    // console.log(blob)
    const blobUrl = URL.createObjectURL(blob)
    localStorage.setItem('audioURLnew', blobUrl)
    console.log('保存成功')
    this.leftDataList = []
    this.rightDataList = []
  }
  // 处理音频数据
  // transAudioData(audioData) {
  //   audioData = transAudioData.transaction(audioData)
  //   this.audioData.push(...audioData)
  // }
  // 对处理后的音频数据进行base64编码，
  toBase64(buffer) {
    var binary = ''
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }
  // 向webSocket发送数据
  webSocketSend() {
    if (this.webSocket.readyState !== 1) {
      return
    }
    let audioData = this.audioData.splice(0, 1280)
    var params = {
      common: {
        app_id: this.appId
      },
      business: {
        language: this.language, // 小语种可在控制台--语音听写（流式）--方言/语种处添加试用
        domain: 'iat',
        accent: this.accent, // 中文方言可在控制台--语音听写（流式）--方言/语种处添加试用
        vad_eos: 5000,
        dwa: 'wpgs' // 为使该功能生效，需到控制台开通动态修正功能（该功能免费）
      },
      data: {
        status: 0,
        format: 'audio/L16;rate=16000',
        encoding: 'raw',
        audio: this.toBase64(audioData)
      }
    }
    console.log('参数language：', this.language)
    console.log('参数accent：', this.accent)
    startTime = Date.parse(new Date())
    this.webSocket.send(JSON.stringify(params))
    this.handlerInterval = setInterval(() => {
      // websocket未连接
      if (this.webSocket.readyState !== 1) {
        console.log('websocket未连接')
        this.audioData = []
        clearInterval(this.handlerInterval)
        return
      }
      if (this.audioData.length === 0) {
        console.log('自动关闭', this.status)
        if (this.status === 'end') {
          this.webSocket.send(
            JSON.stringify({
              data: {
                status: 2,
                format: 'audio/L16;rate=16000',
                encoding: 'raw',
                audio: ''
              }
            })
          )
          this.audioData = []
          clearInterval(this.handlerInterval)
        }
        return false
      }
      audioData = this.audioData.splice(0, 1280)
      // 中间帧
      // localStorage.setItem('voiceFun', 'on')
      this.webSocket.send(
        JSON.stringify({
          data: {
            status: 1,
            format: 'audio/L16;rate=16000',
            encoding: 'raw',
            audio: this.toBase64(audioData)
          }
        })
      )
    }, 40)
  }
  result(resultData) {
    // 识别结束
    // localStorage.setItem('voiceFun', 'on')
    const jsonData = JSON.parse(resultData)
    if (jsonData.data && jsonData.data.result) {
      const data = jsonData.data.result
      let str = ''
      // const resultStr = ''
      const ws = data.ws
      for (let i = 0; i < ws.length; i++) {
        str = str + ws[i].cw[0].w
      }
      console.log('识别的结果为：', str)
      // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
      // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
      if (data.pgs) {
        if (data.pgs === 'apd') {
          // 将resultTextTemp同步给resultText
          this.setResultText({
            resultText: this.resultTextTemp
          })
        }
        // 将结果存储在resultTextTemp中
        this.setResultText({
          resultTextTemp: this.resultText + str
        })
      } else {
        this.setResultText({
          resultText: this.resultText + str
        })
      }
    }
    if (jsonData.code === 0 && jsonData.data.status === 2) {
      this.webSocket.close()
      localStorage.setItem('voiceFun', 'off')
    }
    if (jsonData.code !== 0) {
      this.webSocket.close()
      localStorage.setItem('voiceFun', 'off')
    }
  }
  start() {
    localStorage.setItem('voiceFun', 'on')
    this.recorderStart()
    this.setResultText({ resultText: '', resultTextTemp: '' })
  }
  stop() {
    return this.recorderStop()
  }
}

export {
  IatRecorder
}
