import React, { useEffect, useRef } from 'react';
import FeedbackItem from '@components/FeedbackItem/FeedbackItem';
import { useRecoilValue } from 'recoil';
import { feedbackListSelector, isFbSyncState } from '@store/feedback.store';
import { focusIndexSelector } from '@store/currentVideoTime.store';

import { feedbackListStyle } from './FeedbackList.style';
import FeedbackEditBtn from '@components/FeedbackEditBtns/FeedbackEditBtns';

interface Props {
	editable: boolean;
}
const FeedbackList = ({ editable }: Props) => {
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

	const editableBtns = (props) => editable && <FeedbackEditBtn {...props} />;

	return (
		<div css={feedbackListStyle}>
			{feedbackList.map((feedback, idx) => (
				<FeedbackItem
					key={feedback.id}
					feedback={feedback}
					feedbackRef={feedbackRef}
					index={idx}
					editableBtns={editableBtns({ id: feedback.id, readOnly: feedback.readOnly })}
				/>
			))}
		</div>
	);
};

export default FeedbackList;
