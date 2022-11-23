import { PHASE_TYPE } from '@constants/phase.constant';
import { PATH_TYPE } from '@constants/path.constant';

const phaseList = Object.values(PHASE_TYPE);
const pathList = Object.values(PATH_TYPE);
const phaseToPathMap = new Map(phaseList.map((p, i) => [p, pathList[i]]));

export const getPathWithPhase = (phase: PHASE_TYPE) => {
	return phaseToPathMap.get(phase);
};
