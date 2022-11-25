import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@pages/Login/Login';
import Landing from '@pages/Landing/Landing';
import Lobby from '@pages/Lobby/Lobby';
import Interviewee from '@pages/Interviewee/Interviewee';
import Interviewer from '@pages/Interviewer/Interviewer';
import Waitting from '@pages/Waitting/Waitting';
import Feedback from '@pages/Feedback/Feedback';
import PrivateRoute from './PrivateRoute';
import StrictRoute from './StrictRoute';
import { PATH_TYPE } from '@constants/path.constant';
import NotFound from '@pages/NotFound/NotFound';

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
			<Route element={<PrivateRoute />}>
				<Route path={LANDING_PATH} element={<Landing />} />
				<Route path={LOBBY_PATH} element={<Lobby />} />
				<Route element={<StrictRoute targetPath={INTERVIEWER_PATH} />}>
					<Route path={INTERVIEWER_PATH} element={<Interviewer />} />
				</Route>
				<Route element={<StrictRoute targetPath={INTERVIEWEE_PATH} />}>
					<Route path={INTERVIEWEE_PATH} element={<Interviewee />} />
				</Route>
				<Route element={<StrictRoute targetPath={WAITTING_PATH} />}>
					<Route path={WAITTING_PATH} element={<Waitting />} />
				</Route>
				{/* <Route element={<StrictRoute targetPath={FEEDBACK_PATH} />}>
					<Route path={FEEDBACK_PATH} element={<Feedback />} />
				</Route> */}
				<Route path="/" element={<Feedback />} />
			</Route>
			<Route path="/" element={<Navigate to={LANDING_PATH} replace />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default RootRoutes;
