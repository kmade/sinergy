const { format } = require('url')
const path = require('path')
const fs = require('fs')
const electron = require('electron')

const {
  BrowserWindow,
} = electron

const windowStateKeeper = require('electron-window-state')
const touchBar = require('./touch-bar')

const getStyles = () => {
  return `
    body {
      font: caption;
    }
    * {
      cursor: default
    }
    ::selection {
      background: none;
    }
  `
}

exports.create = () => {
  const { size } = electron.screen.getPrimaryDisplay()
  const winState = windowStateKeeper({
    defaultWidth: size.width,
    defaultHeight: size.height,
    maximize: true,
  })
  const options = {
    width: winState.width,
    height: winState.height,
    x: winState.x,
    y: winState.y,
    minWidth: 600,
    minHeight: 300,
    backgroundColor: '#EF712E',
    frame: true,
  }

  win = new BrowserWindow(options)
  winState.manage(win)

  let appUrl = format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  })
  // Renderer
  win.loadURL(appUrl)
  const bar = touchBar.create(win);
  win.setTouchBar(bar)

  // Events
  win.on('closed', () => win = null)
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS(getStyles())
  })
  return win;
}

