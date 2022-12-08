import React, { useEffect, useRef } from 'react';
import EditableFeedbackBox from '@components/FeedbackItem/FeedbackItem';
import { useRecoilValue } from 'recoil';
import { feedbackListSelector, isFbSyncState } from '@store/feedback.store';
import { focusIndexSelector } from '@store/currentVideoTime.store';

import { feedbackListStyle } from './FeedbackList.style';

const FeedbackList = () => {
	const feedbackRef = useRef([]);
	const feedbackList = useRecoilValue(feedbackListSelector);
	const focusIndex = useRecoilValue(focusIndexSelector);
	const isFbSync = useRecoilValue(isFbSyncState);

	useEffect(() => {
		if (feedbackRef.current.length && isFbSync)
			feedbackRef.current[focusIndex].scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
	}, [focusIndex, isFbSync]);

	return (
		<div css={feedbackListStyle}>
			{feedbackList.map((feedback, idx) => (
				<EditableFeedbackBox
					key={feedback.id}
					feedback={feedback}
					feedbackRef={feedbackRef}
					index={idx}
				/>
			))}
		</div>
	);
};

export default FeedbackList;
