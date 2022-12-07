import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Landing from '@pages/Landing/Landing';
import Lobby from '@pages/Lobby/Lobby';
import Interviewee from '@pages/Interviewee/Interviewee';
import Interviewer from '@pages/Interviewer/Interviewer';
import Waitting from '@pages/Waitting/Waitting';
import Feedback from '@pages/Feedback/Feedback';
import StrictRoute from './StrictRoute';
import { ROUTE_TYPE } from '@constants/route.constant';
import NotFound from '@pages/NotFound/NotFound';

import useSafeNavigator from '@hooks/useSafeNavigator';

const {
	FEEDBACK_ROUTE,
	LANDING_ROUTE,
	LOBBY_ROUTE,
	INTERVIEWER_ROUTE,
	INTERVIEWEE_ROUTE,
	WAITTING_ROUTE,
} = ROUTE_TYPE;

// TODO: barrel import 도입
const PrivateRoutes = () => {
	useSafeNavigator();
	return (
		<Routes>
			<Route path={LANDING_ROUTE} element={<Landing />} />
			<Route element={<StrictRoute targetPath={LOBBY_ROUTE} />}>
				<Route path={LOBBY_ROUTE} element={<Lobby />} />
			</Route>
			<Route element={<StrictRoute targetPath={INTERVIEWER_ROUTE} />}>
				<Route path={INTERVIEWER_ROUTE} element={<Interviewer />} />
			</Route>
			<Route element={<StrictRoute targetPath={INTERVIEWEE_ROUTE} />}>
				<Route path={INTERVIEWEE_ROUTE} element={<Interviewee />} />
			</Route>
			<Route element={<StrictRoute targetPath={WAITTING_ROUTE} />}>
				<Route path={WAITTING_ROUTE} element={<Waitting />} />
			</Route>
			<Route element={<StrictRoute targetPath={FEEDBACK_ROUTE} />}>
				<Route path={FEEDBACK_ROUTE} element={<Feedback />} />
			</Route>
			<Route path="/" element={<Navigate to={LANDING_ROUTE} replace />} />
			<Route path="/login" element={<Navigate to={LANDING_ROUTE} replace />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default PrivateRoutes;
