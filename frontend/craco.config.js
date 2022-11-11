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
};
