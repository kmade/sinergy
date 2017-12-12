const path = require('path')
const { Tray, Menu, dialog } = require('electron')
exports.create = (win) => {
  const img = path.join(__dirname, 'icons/tray.png')
  this.tray = new Tray(img)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Offline mode',
      type: 'checkbox',
      checked: true,
    },
    {
      type: 'separator',
    },
    {
      label: 'Preferences...',
      accelerator: 'CmdOrCtrl+,',
      click: () => {
        let buttons = ['Save', 'Close']
        let message = 'Display Preferences window'
        dialog.showMessageBox({ buttons, message })
      }
    },
    {
      role: 'quit',
      accelerator: 'CmdOrCtrl+q',
    },
  ])
  this.tray.setToolTip('Open tray!')
  this.tray.setContextMenu(contextMenu)
}
exports.tray
