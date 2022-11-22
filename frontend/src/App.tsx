import React from 'react';
import { RecoilRoot } from 'recoil';
import { Global, ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';

import globalStyle from './styles/globalStyle';
import theme from './styles/theme';
import Login from '@pages/Login';
import Landing from '@pages/Landing';
import Lobby from '@pages/Lobby';
import Interviewee from '@pages/Interviewee';
import Interviewer from '@pages/Interviewer';
import Waitting from '@pages/Waitting';
import Feedback from '@pages/Feedback';


function App() {
	return (
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<div className="App">
					<Global styles={globalStyle} />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/landing" element={<Landing />} />
						<Route path="/lobby" element={<Lobby />} />
						<Route path="/interviewee" element={<Interviewee />} />
						<Route path="/interviewer" element={<Interviewer />} />
						<Route path="/waitting" element={<Waitting />} />
						<Route path="/feedback" element={<Feedback />} />
					</Routes>
				</div>
			</ThemeProvider>
		</RecoilRoot>
	);
}

export default App;
