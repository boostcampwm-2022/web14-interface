import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@pages/Login';
import Landing from '@pages/Landing';
import Lobby from '@pages/Lobby';
import Interviewee from '@pages/Interviewee';
import Interviewer from '@pages/Interviewer';
import Waitting from '@pages/Waitting';
import Feedback from '@pages/Feedback';
import PrivateRoute from './PrivateRoute';

// TODO: barrel import 도입
// TODO: 서비스의 phase를 전역 상태로 관리하고, 특정 상태일 때만 페이지를 허용 가능하도록 한다.
const RootRoutes = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<PrivateRoute />}>
				<Route path="/feedback" element={<Feedback />} />
				<Route path="/landing" element={<Landing />} />
				<Route path="/lobby" element={<Lobby />} />
				<Route path="/interviewee" element={<Interviewee />} />
				<Route path="/interviewer" element={<Interviewer />} />
				<Route path="/waitting" element={<Waitting />} />
			</Route>
			<Route>
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Route>
		</Routes>
	);
};

export default RootRoutes;
