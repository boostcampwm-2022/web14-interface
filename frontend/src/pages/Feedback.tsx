import React from 'react';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import usePreventLeave from '@hooks/usePreventLeave';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';

const Feedback = () => {
	usePreventLeave();

	return (
		<>
			<IntervieweeVideo />
			{/* <button type="button" onClick={() => setIsFbSync((current) => !current)}>
				{isFbSync ? '현재 Sync 중' : '현재 UnSync 중'}
			</button> */}
			<FeedbackArea />
		</>
	);
};

export default Feedback;
