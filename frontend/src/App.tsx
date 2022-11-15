import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyle from './styles/globalStyle';
import theme from './styles/theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Global styles={globalStyle} />
			</div>
		</ThemeProvider>
	);
}

export default App;
