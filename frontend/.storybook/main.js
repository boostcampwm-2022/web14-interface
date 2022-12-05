const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/preset-create-react-app',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
	webpackFinal: async (config, { configType }) => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			loader: require.resolve('babel-loader'),
			options: {
				presets: [
					['react-app', { flow: false, typescript: true }],
					require.resolve('@emotion/babel-preset-css-prop'),
				],
			},
		});

		config.resolve.alias = {
			...config.resolve.alias,
			'@assets': path.resolve(__dirname, '../src/assets'),
			'@components': path.resolve(__dirname, '../src/components'),
			'@constants': path.resolve(__dirname, '../src/constants'),
			'@customType': path.resolve(__dirname, '../src/customType'),
			'@hooks': path.resolve(__dirname, '../src/hooks'),
			'@layout': path.resolve(__dirname, '../src/layout'),
			'@pages': path.resolve(__dirname, '../src/pages'),
			'@routes': path.resolve(__dirname, '../src/routes'),
			'@service': path.resolve(__dirname, '../src/service'),
			'@store': path.resolve(__dirname, '../src/store'),
			'@styles': path.resolve(__dirname, '../src/styles'),
			'@utils': path.resolve(__dirname, '../src/utils'),
		};

		return config;
	},
};
