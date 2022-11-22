import { atom } from 'recoil';
import { PHASE_TYPE } from '@constants/phase.constant';

export const phaseState = atom<PHASE_TYPE>({
	key: 'phase',
	default: PHASE_TYPE.LOGIN_PHASE,
});
