((global, config) => {

  // Native
  const electron = window.require && require('./electron') || {
    MockNativeIMPL: 'N/A'
  }
  // Errors

  // Local PouchDB
  const db = new PouchDB('clientDb', {adapter: 'websql'})

  // Async/Await fetch
  const api = async (uri) => await (await fetch(`${config.API_URL}${uri}`, {})).json()
  // Logger
  const log = console //@todo
  // Socket.io
  const socket = io(config.API_URL)
    .on('connect', () => log.debug('Socket connected'))
    .on('disconnect', () => log.warn('Socket disconnected'))

  return global.Sinergy = {
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
