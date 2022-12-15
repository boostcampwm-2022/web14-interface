import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Global, ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

import RootRoutes from '@routes/RootRoutes';
import globalStyle from '@styles/globalStyle';
import theme from '@styles/theme';
import ModalManager from '@components/ModalManager';
import Loading from '@components/Loading/Loading';

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
						<ToastContainer
							position="bottom-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
						/>
					</div>
					<div id="popup-root"></div>
				</ThemeProvider>
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default App;
