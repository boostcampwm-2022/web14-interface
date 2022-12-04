import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@pages/Login/Login';
import { PATH_TYPE } from '@constants/path.constant';
import NotFound from '@pages/NotFound/NotFound';

const { LOGIN_PATH } = PATH_TYPE;

const PublicRoutes = () => {
	return (
		<Routes>
			<Route path={LOGIN_PATH} element={<Login />} />
			<Route path="/" element={<Navigate to={LOGIN_PATH} replace />} />
			<Route path="/landing" element={<Navigate to={LOGIN_PATH} replace />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default PublicRoutes;
