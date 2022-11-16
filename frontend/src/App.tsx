import React from 'react';
import { RecoilRoot } from 'recoil';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyle from './styles/globalStyle';
import theme from './styles/theme';
import Feedback from '@pages/Feedback';

function App() {
	return (
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<div className="App">
					<Global styles={globalStyle} />
					<Feedback />
				</div>
			</ThemeProvider>
		</RecoilRoot>
	);
}

export default App;
