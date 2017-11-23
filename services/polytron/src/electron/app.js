require('dotenv').config()

const { format } = require('url')
const path = require('path')

const { BrowserWindow, app } = require('electron')



const isDev = process.env.NODE_ENV === 'development'
const isSecure = process.env.SSL_SECURE === 'true'
// Keep a global reference of the window object, so the window will
// not be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
  // and load the index.html of the app.
  let appUrl = format({
    pathname: path.join(__dirname, '../../index.html'),
    protocol: 'file:',
    slashes: true
  })

  const options = {
    width: 1024,
    height: 800,
  }

  mainWindow = new BrowserWindow(options)
  if(isDev) {
    require('devtron').install()
    require('electron-reload')('../', {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
    mainWindow.setSize(1440, 900)
    mainWindow.webContents.openDevTools()
  }
  mainWindow.loadURL(appUrl)
  mainWindow.on('closed', () => mainWindow = null)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('before-quit', (ev) => {
  console.log('App is about to quit')
  //ev.preventDefault()
  setTimeout(() => {
    console.log('Quit')
    //app.exit()
  }, 1000)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
// SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(!isSecure);
});
