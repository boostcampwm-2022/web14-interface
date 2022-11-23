/*  */
import React from 'react';
import FeedbackForm from '@components/FeedbackForm/FeedbackForm';
import EditableFeedbackBox from '@components/EditableFeedbackBox/EditableFeedbackBox';
import { useRecoilValue } from 'recoil';
import { feedbackIdsState } from '@store/feedback.atom';

const FeedbackArea = () => {
	const feedbackIds = useRecoilValue(feedbackIdsState);
	return (
		<div>
			{feedbackIds.map((startTime, i) => (
				<EditableFeedbackBox key={startTime} startTime={startTime} index={i} />
			))}
			<FeedbackForm />
		</div>
	);
};

export default FeedbackArea;
