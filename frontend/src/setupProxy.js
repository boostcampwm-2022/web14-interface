/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:8080',
			changeOrigin: true,
		})
	);
	app.use(
		'/socket.io',
		createProxyMiddleware({
			target: 'http://localhost:8081',
			changeOrigin: true,
			// secure: false,
		})
	);
};
