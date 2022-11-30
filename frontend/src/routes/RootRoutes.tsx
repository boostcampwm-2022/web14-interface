import React, { Suspense } from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import isAuthQuery from '@store/authState';


// TODO: 
const RootRoutes = () => {
	// const isAuth = useRecoilValue(isAuthQuery);
	const isAuth = true;
	return (
		<Suspense fallback={<>spinner...</>}>
			<Routes>
				<Route path="*" element={isAuth ? <PrivateRoutes /> : <PublicRoutes />} />
			</Routes>
		</Suspense>
	);
};

export default RootRoutes;
