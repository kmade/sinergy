// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { BrowserWindow, getCurrentWindow } = require('electron').remote

const parent = getCurrentWindow()

module.exports = (config) => {
  return {
    openApp: (url) => {
      let app = new BrowserWindow({
        parent,
        modal: false,
        show: false,
        width: 800,
        height: 600,
        frame: true,
      })
      app.loadURL(url)
      app.once('ready-to-show', () => {
          app.show()
        })
      return app
    }
  }
}
