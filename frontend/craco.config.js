const CracoAlias = require('craco-alias');

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				tsConfigPath: 'tsconfig.paths.json',
			},
		},
	],
	babel: {
		plugins: ['transform-remove-console'],
		presets: ['@emotion/babel-preset-css-prop'],
	},
};
