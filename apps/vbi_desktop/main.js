const { app, BrowserWindow } = require('electron')
const path = require('path')
const http = require('http')
const fs = require('fs')

let mainWindow

// 🟢 零依赖的内置 HTTP Web 服务器
function startLocalServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      // 1. 解析请求的 URL 路径
      const urlPath = req.url.split('?')[0]

      // 2. 映射到本地物理路径 dist
      let filePath = path.join(__dirname, 'dist', urlPath)

      // 3. SPA 路由兜底逻辑（核心）
      // 如果没有后缀名，或者文件在硬盘上根本不存在，强制返回 index.html
      if (!path.extname(filePath) || !fs.existsSync(filePath)) {
        filePath = path.join(__dirname, 'dist', 'VBI', 'index.html')
      }

      // 4. 判断并设置正确的 Content-Type，防止浏览器乱码
      const ext = path.extname(filePath)
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.wasm': 'application/wasm',
      }
      const contentType = mimeTypes[ext] || 'application/octet-stream'

      // 5. 读取并返回文件
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500)
          res.end('Server Error')
        } else {
          res.writeHead(200, { 'Content-Type': contentType })
          res.end(content, 'utf-8')
        }
      })
    })

    // 让系统分配一个随机绝对空闲的端口
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port
      resolve(port)
    })
  })
}

async function createWindow() {
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
    // 开发环境
    mainWindow.loadURL('http://localhost:3000/VBI/')
  } else {
    // 生产环境：等待内部服务器启动，拿到可用端口
    const port = await startLocalServer()
    // 就像在浏览器里一样加载！完美支持 Web Worker 和路由！
    mainWindow.loadURL(`http://127.0.0.1:${port}/VBI/index.html`)

    //mainWindow.webContents.openDevTools(); // 需要查错可以解除注释
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
