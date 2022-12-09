import { currentVideoTimeState } from '@store/currentVideoTime.store';
import { feedbackIdsState, feedbackIdxMapState } from '@store/feedback.store';
import { docsListQuery } from '@store/interviewDocs.store';
import { roomUUIDState } from '@store/room.store';
import { completedFbCntState, docsUUIDState } from '@store/interview.store';
import { useCallback } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useResetRecoilState } from 'recoil';

const useCleanupInterview = () => {
	const roomUUID = useRecoilValue(roomUUIDState);
	const docsListRefresher = useRecoilRefresher_UNSTABLE(docsListQuery(roomUUID));
	const resetFeedback = useResetRecoilState(feedbackIdsState);
	const resetFeedbackIdxMap = useResetRecoilState(feedbackIdxMapState);
	const resetCurrentVideoTime = useResetRecoilState(currentVideoTimeState);
	const resetDocsUUID = useResetRecoilState(docsUUIDState);
	const resetCompletedFbCnt = useResetRecoilState(completedFbCntState);

	const cleanupInterview = useCallback(() => {
		console.log('cleanup interview');
		resetFeedback();
		resetFeedbackIdxMap();
		resetCurrentVideoTime();
		resetDocsUUID();
		resetCompletedFbCnt();

		docsListRefresher();
	}, []);

	return cleanupInterview;
};

export default useCleanupInterview;
