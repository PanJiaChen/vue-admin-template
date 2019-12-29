const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const express = require('express')

const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(router) {
  let mockLastIndex
  const { default: mocks } = require('./index.js')
  for (const mock of mocks) {
    router[mock.type](mock.url, mock.response)
    mockLastIndex = router.stack.length
  }
  const mockRoutesLength = Object.keys(mocks).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

module.exports = app => {
  // es6 polyfill
  require('@babel/register')
  const router = express.Router()

  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(router)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex
  app.use(/^\/mock/, router)

  // watch files, hot reload mock server
  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        router.stack.splice(mockStartIndex, mockRoutesLength)

        // clear routes cache
        unregisterRoutes()

        const mockRoutes = registerRoutes(router)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
