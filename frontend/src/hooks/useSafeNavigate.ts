import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { phaseState } from '@store/phase.atom';
import { PHASE_TYPE } from '@constants/phase.constant';
import { getPathWithPhase } from '@utils/getPathWithPhase';

const useSafeNavigate = () => {
	const navigate = useNavigate();
	const phaseSetter = useSetRecoilState(phaseState);
	const safeNavigate = (phase: PHASE_TYPE) => {
		phaseSetter(phase);
		navigate(getPathWithPhase(phase));
	};
	return { safeNavigate };
};
export default useSafeNavigate;
