import { atom } from 'recoil';
import { PHASE_TYPE } from '@constants/phase.constant';

export const phaseState = atom<PHASE_TYPE>({
	key: 'pahse',
	default: PHASE_TYPE.LOGIN_PHASE,
});
