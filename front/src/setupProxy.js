const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	// /api 포함 route에 대해서는 "http://back:5000"을 domain으로 하여 proxy설정
    app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://back:5000',
			changeOrigin: true,
		}))
}
