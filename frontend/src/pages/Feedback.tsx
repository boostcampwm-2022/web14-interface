import React from 'react';
import { useRecoilState } from 'recoil';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import usePreventLeave from '@hooks/usePreventLeave';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import { isFbSyncState } from '@store/feedback.atom';

const Feedback = () => {
	usePreventLeave();
	const [isFbSync, setIsFbSync] = useRecoilState(isFbSyncState);

	return (
		<>
			<IntervieweeVideo />
			<button type="button" onClick={() => setIsFbSync((current) => !current)}>
				{isFbSync ? '현재 Sync 중' : '현재 UnSync 중'}
			</button>
			<FeedbackArea />
		</>
	);
};

export default Feedback;
