import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '@pages/Login';
import Landing from '@pages/Landing';
import Lobby from '@pages/Lobby';
import Interviewee from '@pages/Interviewee';
import Interviewer from '@pages/Interviewer';
import Waitting from '@pages/Waitting';
import Feedback from '@pages/Feedback';

const RootRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/landing" element={<Landing />} />
			<Route path="/lobby" element={<Lobby />} />
			<Route path="/interviewee" element={<Interviewee />} />
			<Route path="/interviewer" element={<Interviewer />} />
			<Route path="/waitting" element={<Waitting />} />
			<Route path="/feedback" element={<Feedback />} />
		</Routes>
	);
};

export default RootRoutes;
