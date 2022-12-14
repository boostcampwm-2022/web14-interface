import React, { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useEditFeedback from '@hooks/useEditFeedback';
import { isFbClickedState, isFbSyncState } from '@store/feedback.store';
import { currentVideoTimeState } from '@store/currentVideoTime.store';

import {
	fbStartTimeStyle,
	feedbackBoxStyle,
	feedbackContentStyle,
	feedbackContentAreaStyle,
} from './FeedbackItem.style';

import { FeedbackItemType } from '@customType/feedback';
import { mmssFormatter } from '@utils/common.util';
import { ONE_SECOND } from '@constants/time.constant';

export interface FeedbackItemPropType {
	feedback: FeedbackItemType;
	feedbackRef: React.MutableRefObject<HTMLDivElement[]>;
	index: number;
	editableBtns: React.ReactNode;
}
const FeedbackItem = ({ feedback, feedbackRef, index, editableBtns }: FeedbackItemPropType) => {
	const isFbSync = useRecoilValue(isFbSyncState);
	const setIsFbClicked = useSetRecoilState(isFbClickedState);
	const setCurrentVideoTime = useSetRecoilState(currentVideoTimeState);
	const { handleFbChange } = useEditFeedback(feedback.id);

	const { startTime, isFirst, content, readOnly } = feedback;
	const editable = readOnly !== undefined ? (readOnly === true ? false : true) : false;

	const handleClickFeedback = () => {
		if (!isFbSync) return;
		setIsFbClicked(true);
		setCurrentVideoTime(startTime);
	};

	return (
		<div
			ref={(el) => (feedbackRef.current[index] = el)}
			css={(theme) => feedbackBoxStyle(theme, editable)}
		>
			<div
				css={(theme) => fbStartTimeStyle(theme, editable)}
				style={{ visibility: isFirst ? 'visible' : 'hidden' }}
			>
				{mmssFormatter(startTime * ONE_SECOND)}
			</div>
			<div
				css={(theme) => feedbackContentAreaStyle(theme, editable)}
				onClick={handleClickFeedback}
			>
				<div css={feedbackContentStyle} contentEditable={editable}>
					{content}
				</div>
			</div>
			{editableBtns}
		</div>
	);
};

export default React.memo(FeedbackItem);
