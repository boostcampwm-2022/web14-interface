import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { phaseState } from '@store/phase.atom';
import { PHASE_TYPE } from '@constants/phase.constant';
import { getPathWithPhase } from '@utils/getPathWithPhase';

const useSafeNavigate = () => {
	const navigate = useNavigate();
	const setPhase = useSetRecoilState(phaseState);
	const safeNavigate = (newPhase: PHASE_TYPE) => {
		setPhase(newPhase);
		setTimeout(() => navigate(getPathWithPhase(newPhase)));
	};
	return { safeNavigate };
};
export default useSafeNavigate;
