import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Global, ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';

import RootRoutes from '@routes/RootRoutes';
import globalStyle from '@styles/globalStyle';
import theme from '@styles/theme';

function App() {
	return (
		<RecoilRoot>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<div className="App">
						<Global styles={globalStyle} />
						<Suspense fallback={<>spinner...</>}>
							<RootRoutes />
						</Suspense>
					</div>
				</ThemeProvider>
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default App;
