const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  distDir: 'build',
  // assetPrefix: isProd ? 'https://cdn.mydomain.com' : ''
  webpack: (config, { buildId, dev }) => {
    // Perform customizations to webpack config
    config.externals = Object.assign({}, config.externals, {
      'electron': 'electron',
    })
    // config.externals = 'electron'

    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    return config
  },

  exportPathMap: function() {
    return {
      '/start': { page: '/start' },
    }
  }
}
