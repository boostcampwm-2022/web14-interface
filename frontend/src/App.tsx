import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyle from './styles/globalStyle';
import theme from './styles/theme';
import Test from '@components/Test/Test';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Global styles={globalStyle} />
				<Test text={'test'} />
			</div>
		</ThemeProvider>
	);
}

export default App;
