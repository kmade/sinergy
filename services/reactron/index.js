require('dotenv').config()
const { format } = require('url')
const path = require('path')

const { BrowserWindow, app } = require('electron')
const prepareNext = require('electron-next')
const isDev = process.env.NODE_ENV === 'development';
const isSecure = process.env.SSL_SECURE === 'true';

// Keep a global reference of the window object, so the window will
// not be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = async () => {
  const port = 8000
  await prepareNext('./src', port)

  let appUrl = format({
    pathname: path.join(__dirname, 'src/out/start/index.html'),
    protocol: 'file:',
    slashes: true
  })
  const options = {
    width: 1024,
    height: 800,
  }
  mainWindow = new BrowserWindow(options)
  if(isDev) {

    appUrl = `http://localhost:${port}/start`
  }
  mainWindow.loadURL(appUrl)

  if(isDev) {
    require('electron-reload')(path.resolve(__dirname), {
      electron: path.resolve(__dirname, 'node_modules', '.bin', 'electron')
    })
    win.webContents.openDevTools()
  }
  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)
// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
// SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(!isSecure);
});
