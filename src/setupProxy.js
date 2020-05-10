const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/snake',
      proxy({
        target: 'http://127.0.0.1:8099/',
        changeOrigin: true,
      })
    );
  };