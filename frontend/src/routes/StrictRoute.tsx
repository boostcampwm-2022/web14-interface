import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { pageState } from '@store/page.store';
import { ROUTE_TYPE } from '@constants/route.constant';
import { getPathWithPage } from '@utils/getPathWithPage';

interface PropType {
	targetPath: string;
}
const StrictRoute = ({ targetPath }: PropType) => {
	const page = useRecoilValue(pageState);
	const isValid = getPathWithPage(page) === targetPath;

	return isValid ? <Outlet /> : <Navigate to={ROUTE_TYPE.LANDING_ROUTE} replace={true} />;
};

export default StrictRoute;
