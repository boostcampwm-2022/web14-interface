import React, { Suspense } from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isAuthQuery from '@store/authState';

const RootRoutes = () => {
	// const isAuth = useRecoilValue(isAuthQuery);
	const isAuth = true;
	return (
		<Routes>
			<Route path="*" element={isAuth ? <PrivateRoutes /> : <PublicRoutes />} />
		</Routes>
	);
};

export default RootRoutes;
