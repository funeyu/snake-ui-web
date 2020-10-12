const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/api',
      proxy({
        // target: 'https://xiaoshesoso.com/',
        target: 'http://localhost:8090/',
        changeOrigin: true,
      })
    );
  };
