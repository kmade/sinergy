require('dotenv').config()
const path = require('path')
const {
  app,
} = require('electron')

const mainWindow = require('./electron/main-window')
const mainMenu = require('./electron/main-menu')
const tray = require('./electron/tray')

/**
* ------------------------------------------------------------------------
* ENVs
* ------------------------------------------------------------------------
*/
const isDev     = process.env.NODE_ENV === 'development'
const isSecure  = process.env.SSL_SECURE === 'true'

/**
* ------------------------------------------------------------------------
* App
* ------------------------------------------------------------------------
*/
let windowUrl = path.join(__dirname, 'index.html')
let win = null
app.once('ready', () => {
  let win = mainWindow.create(windowUrl)
  mainMenu.create()
  tray.create()
  /**
  * ------------------------------------------------------------------------
  * Dev
  * ------------------------------------------------------------------------
  */
  if(isDev) {
    require('electron-reload')(path.resolve(__dirname), {
      electron: path.resolve(__dirname, 'node_modules', '.bin', 'electron')
    })
    win.webContents.openDevTools()
  }
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
