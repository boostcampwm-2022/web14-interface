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
import StrictRoute from './StrictRoute';
import { PATH_TYPE } from '@constants/path.constant';

const {
	LOGIN_PATH,
	LANDING_PATH,
	LOBBY_PATH,
	INTERVIEWER_PATH,
	INTERVIEWEE_PATH,
	WAITTING_PATH,
	FEEDBACK_PATH,
} = PATH_TYPE;

// TODO: barrel import 도입
const RootRoutes = () => {
	return (
		<Routes>
			<Route path={LOGIN_PATH} element={<Login />} />
			<Route path="/" element={<PrivateRoute />}>
				<Route path={LANDING_PATH} element={<Landing />} />
				<Route path={LOBBY_PATH} element={<Lobby />} />
				<Route element={<StrictRoute path={INTERVIEWER_PATH} />}>
					<Route path={INTERVIEWER_PATH} element={<Interviewee />} />
				</Route>
				<Route element={<StrictRoute path={INTERVIEWEE_PATH} />}>
					<Route path={INTERVIEWEE_PATH} element={<Interviewer />} />
				</Route>
				<Route element={<StrictRoute path={WAITTING_PATH} />}>
					<Route path={WAITTING_PATH} element={<Waitting />} />
				</Route>
				<Route element={<StrictRoute path={FEEDBACK_PATH} />}>
					<Route path={FEEDBACK_PATH} element={<Feedback />} />
				</Route>
			</Route>
			<Route>
				<Route path="*" element={<Navigate to={LOGIN_PATH} replace />} />
			</Route>
		</Routes>
	);
};

export default RootRoutes;
