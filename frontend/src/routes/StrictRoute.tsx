import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { pageState } from '@store/page.atom';
import { PATH_TYPE } from '@constants/path.constant';
import { getPathWithPage } from '@utils/getPathWithPage';

interface PropType {
	targetPath: string;
}
const StrictRoute = ({ targetPath }: PropType) => {
	const page = useRecoilValue(pageState);
	const isValid = getPathWithPage(page) === targetPath;

	return isValid ? <Outlet /> : <Navigate to={PATH_TYPE.LANDING_PATH} replace={true} />;
};

export default StrictRoute;
