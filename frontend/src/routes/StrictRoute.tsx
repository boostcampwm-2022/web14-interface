import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { phaseState } from '@store/phase.atom';
import { PATH_TYPE } from '@constants/path.constant';
import { getPathWithPhase } from '@utils/getPathWithPhase';

interface PropType {
	targetPath: string;
}
const StrictRoute = ({ targetPath }: PropType) => {
	const phase = useRecoilValue(phaseState);
	const isValid = getPathWithPhase(phase) === targetPath;

	return isValid ? <Outlet /> : <Navigate to={PATH_TYPE.LANDING_PATH} replace={true} />;
};

export default StrictRoute;
