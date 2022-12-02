import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from '@pages/Login/Login';
import { PATH_TYPE } from '@constants/path.constant';

const { LOGIN_PATH } = PATH_TYPE;

const PublicRoutes = () => {
	return (
		<Routes>
			<Route path={LOGIN_PATH} element={<Login />} />
			<Route path="*" element={<Navigate to={LOGIN_PATH} replace />} />
		</Routes>
	);
};

export default PublicRoutes;
