((window, config) => {

  // Native
  const electron = window.require && require('./electron')(config) || {
    // Adapter for Browser support
    openApp: (url) => {
      return window.open(url, 'AppName', 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes')
    }
  }

  // Errors

  // Local PouchDB
  const db = new PouchDB('clientDb', {adapter: 'websql'})

  // Async/Await fetch
  const api = async (uri) => await (await fetch(`${config.API_URL}${uri}`, {})).json()
  // Logger
  // @todo
  const log = console
  // Socket.io
  const socket = io(config.API_URL, {
    path: '/io',
    transports: ['websocket'],
  })
  .on('connect', () => log.debug('Socket connected'))
  .on('disconnect', () => log.warn('Socket disconnected'))

  return window.Sinergy = {
      version: 'x.x.x',
      config,
      electron,
      socket,
      db,
      api,
      log,
  }

})(window, {
  API_URL: 'https://api.sinergy.localhost',
})
