import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth.store';

const PrivateRoute = () => {
	const isAuth = useRecoilValue(authState);
	return isAuth ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
