import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { phaseState } from '@store/phase.atom';
import { PHASE_TYPE } from '@constants/phase.constant';
import { getPathWithPhase } from '@utils/getPathWithPhase';
import { useCallback } from 'react';

const useSafeNavigate = () => {
	const navigate = useNavigate();
	const [phase, phaseSetter] = useRecoilState(phaseState);
	const safeNavigate = (newPhase: PHASE_TYPE) => {
		phaseSetter(newPhase);
		setTimeout(() => navigateTo(newPhase), 100);
	};
	//TODO: 상태 타이밍 문제
	const navigateTo = useCallback(
		(phase) => {
			navigate(getPathWithPhase(phase));
		},
		[phase]
	);
	return { safeNavigate };
};
export default useSafeNavigate;
