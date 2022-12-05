import { Global, ThemeProvider, css } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import globalStyle from '../src/styles/globalStyle';
import theme from '../src/styles/theme';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const decorators = [
	(Story) => (
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<Global styles={globalStyle} />
				<Story />
			</ThemeProvider>
		</RecoilRoot>
	),
];
