import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@pages/Login/Login';
import { ROUTE_TYPE } from '@constants/route.constant';
import NotFound from '@pages/NotFound/NotFound';

const { LOGIN_ROUTE } = ROUTE_TYPE;

const PublicRoutes = () => {
	return (
		<Routes>
			<Route path={LOGIN_ROUTE} element={<Login />} />
			<Route path="/" element={<Navigate to={LOGIN_ROUTE} replace />} />
			<Route path="/landing" element={<Navigate to={LOGIN_ROUTE} replace />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default PublicRoutes;
