import React, { useEffect, useRef } from 'react';
import FeedbackItem from '@components/FeedbackItem/FeedbackItem';
import { useRecoilValue } from 'recoil';
import { isFbSyncState } from '@store/feedback.store';
import { focusIndexSelector } from '@store/currentVideoTime.store';

import {
	emptyFeedbackStyle,
	fbTimelineStyle,
	feedbackListStyle,
	timelineStyle,
} from './FeedbackList.style';
import FeedbackEditBtn from '@components/FeedbackEditBtns/FeedbackEditBtns';
import { FeedbackItemType } from '@customType/feedback';

interface Props {
	editable?: boolean;
	feedbackList: FeedbackItemType[];
}
const FeedbackList = ({ editable = false, feedbackList }: Props) => {
	const feedbackRef = useRef([]);

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
		<div css={fbTimelineStyle}>
			{feedbackList.length > 0 ? (
				<>
					<div css={feedbackListStyle}>
						{feedbackList.map((feedback, idx) => (
							<FeedbackItem
								key={feedback.id}
								feedback={feedback}
								feedbackRef={feedbackRef}
								index={idx}
								editableBtns={editableBtns({
									id: feedback.id,
									readOnly: feedback.readOnly,
								})}
							/>
						))}
					</div>
					<div css={timelineStyle}></div>
				</>
			) : (
				<div css={emptyFeedbackStyle}>작성된 피드백이 없습니다</div>
			)}
		</div>
	);
};

export default FeedbackList;
