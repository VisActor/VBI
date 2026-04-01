const { app, BrowserWindow } = require('electron')
const path = require('path')
const express = require('express')

let mainWindow
let server
let localServerUrl = ''

function startLocalServer() {
  return new Promise((resolve, reject) => {
    const expressApp = express()
    const distPath = path.join(__dirname, 'dist')

    // 1. 静态资源托管：映射整个 dist 目录
    expressApp.use(express.static(distPath))

    // 2. 捕获所有其他路由，重定向到 index.html 以支持 History 模式 (SPA)
    // 因为静态资源在 dist/VBI 下，路由也是以 /VBI 开头
    expressApp.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'VBI', 'index.html'))
    })

    // 3. 监听随机可用端口 (0 代表随机可用端口)，避免端口冲突
    server = expressApp.listen(0, '127.0.0.1', () => {
      const port = server.address().port
      localServerUrl = `http://127.0.0.1:${port}/VBI/index.html`
      console.log(`Local server started at ${localServerUrl}`)
      resolve()
    })

    server.on('error', (err) => {
      console.error('Express server error:', err)
      reject(err)
    })
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  const isDev = !app.isPackaged

  if (isDev) {
    // 开发环境下，加载本地服务器
    mainWindow.loadURL('http://localhost:3000/VBI/')
  } else {
    // 生产环境下，加载刚启动的 Express 本地服务
    mainWindow.loadURL(localServerUrl)
    // 保留控制台，以防万一。如果一切成功，以后可以把它注释掉
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(async () => {
  if (app.isPackaged) {
    try {
      // 生产环境先启动本地服务器，再创建窗口
      await startLocalServer()
    } catch (e) {
      console.error('Failed to start local express server', e)
    }
  }

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  // 退出时关闭服务
  if (server) {
    server.close()
  }
})
