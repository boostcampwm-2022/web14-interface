const CracoAlias = require('craco-alias');

module.exports = {
	plugins: [
		{
			plugins: CracoAlias,
			options: {
				source: 'tsconfig',
				baseUrl: '.',
				tsConfigPath: 'tsconfig.paths.json',
				debug: false,
			},
		},
	],
	babel: {
		presets: ['@emotion/babel-preset-css-prop'],
	},
	webpack: {
		configure: (config, { env, paths }) => {
			config.module.rules.unshift({
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			});
			return config;
		},
	},
};
