import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isLogin = false;

const PrivateRoute = () => {
	return isLogin ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
