import React, { useEffect, useRef } from 'react';
import FeedbackForm from '@components/FeedbackForm/FeedbackForm';
import EditableFeedbackBox from '@components/EditableFeedbackBox/EditableFeedbackBox';
import { useRecoilValue } from 'recoil';
import { feedbackListSelector, isFbSyncState } from '@store/feedback.store';
import { focusIndexSelector } from '@store/currentVideoTime.store';

import { feedbackAreaStyle, feedbackListStyle } from './FeedbackArea.style';

const FeedbackArea = () => {
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
		<div css={feedbackAreaStyle}>
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
			<FeedbackForm />
		</div>
	);
};

export default FeedbackArea;
