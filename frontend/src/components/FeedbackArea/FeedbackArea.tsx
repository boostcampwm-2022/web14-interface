import React, { useEffect, useRef } from 'react';
import FeedbackForm from '@components/FeedbackForm/FeedbackForm';
import EditableFeedbackBox from '@components/EditableFeedbackBox/EditableFeedbackBox';
import { useRecoilValue } from 'recoil';
import { feedbackIdsState } from '@store/feedback.atom';
import { focusIndexState } from '@store/focusIndex.atom';

const FeedbackArea = () => {
	const feedbackRef = useRef([]);
	const feedbackIds = useRecoilValue(feedbackIdsState);
	const focusIndex = useRecoilValue(focusIndexState);

	useEffect(() => {
		if (feedbackRef.current.length)
			feedbackRef.current[focusIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [focusIndex]);

	return (
		<div>
			<div
				style={{
					overflow: 'scroll',
					height: '200px',
				}}
			>
				{feedbackIds.map((feedbackId, idx) => (
					<EditableFeedbackBox
						key={feedbackId}
						feedbackId={feedbackId}
						feedbackRef={feedbackRef}
						index={idx}
					/>
				))}
			</div>
			<FeedbackForm />
		</div>
	);
};

export default FeedbackArea;
