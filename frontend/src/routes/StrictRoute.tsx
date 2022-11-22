import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { phaseState } from '@store/phase.atom';
import { PATH_TYPE } from '@constants/path.constant';
import { getPathWithPhase } from '@utils/getPathWithPhase';

interface PropType {
	path: string;
}
const StrictRoute = ({ path }: PropType) => {
	const phase = useRecoilValue(phaseState);
	const isValid = getPathWithPhase(phase) === path;
	console.log(phase, getPathWithPhase(phase), isValid);
	return isValid ? <Outlet /> : <Navigate to={PATH_TYPE.LOBBY_PATH} replace={true} />;
};

export default StrictRoute;
