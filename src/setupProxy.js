const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/api',
      proxy({
        target: 'http://49.233.52.50/',
        changeOrigin: true,
      })
    );
  };