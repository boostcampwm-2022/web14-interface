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
			'@hooks': path.resolve(__dirname, '../src/hooks'),
			'@layout': path.resolve(__dirname, '../src/layout'),
			'@pages': path.resolve(__dirname, '../src/pages'),
			'@customType': path.resolve(__dirname, '../src/customType'),
			'@store': path.resolve(__dirname, '../src/store'),
			'@utils': path.resolve(__dirname, '../src/utils'),
			'@routes': path.resolve(__dirname, '../src/routes'),
			'@constants': path.resolve(__dirname, '../src/constants'),
		};

		return config;
	},
};
