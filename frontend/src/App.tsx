import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Global, ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';

import RootRoutes from '@routes/RootRoutes';
import globalStyle from '@styles/globalStyle';
import theme from '@styles/theme';
import ModalManager from '@components/ModalManager';
import Loading from '@components/Loading/Loading';
import ToastContainer from '@components/ToastManager';

function App() {
	return (
		<RecoilRoot>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<div className="App">
						<Global styles={globalStyle} />
						<Suspense fallback={<Loading />}>
							<RootRoutes />
							<ModalManager />
						</Suspense>
					</div>
					<div id="popup-root"></div>
					<ToastContainer />
				</ThemeProvider>
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default App;
