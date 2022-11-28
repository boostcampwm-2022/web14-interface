import React from 'react';
import { useRecoilState } from 'recoil';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import usePreventLeave from '@hooks/usePreventLeave';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import { isFbSyncState } from '@store/feedback.atom';

import { feedbackPageStyle, feedbackPageContainerStyle } from './Feddback.style';

const Feedback = () => {
	usePreventLeave();
	const [isFbSync, setIsFbSync] = useRecoilState(isFbSyncState);

	return (
		<div css={feedbackPageStyle}>
			<div css={feedbackPageContainerStyle}>
				<IntervieweeVideo />
				<button
					type="button"
					onClick={() => setIsFbSync((current) => !current)}
					style={{ color: 'white', height: '40px', width: '65px' }}
				>
					{isFbSync ? 'Sync' : 'UnSync'}
				</button>
				<FeedbackArea />
			</div>
		</div>
	);
};

export default Feedback;
