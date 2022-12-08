import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useCrudFeedback from '@hooks/useCrudFeedback';
import { isFbClickedState, isFbSyncState } from '@store/feedback.store';
import { currentVideoTimeState } from '@store/currentVideoTime.store';

import { feedbackBoxStyle, fbTextAreaStyle, fbStartTimeStyle } from './FeedbackItem.style';

import { FeedbackItemType } from '@customType/feedback';
import { mmssFormatter } from '@utils/common.util';
import { ONE_SECOND } from '@constants/time.constant';

export interface Props {
	feedback: FeedbackItemType;
	//TODO ref type any
	feedbackRef: React.MutableRefObject<any[]>;
	index: number;
	editableBtns: React.ReactNode;
}
const FeedbackItem = ({ feedback, feedbackRef, index, editableBtns }: Props) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const isFbSync = useRecoilValue(isFbSyncState);
	const setIsFbClicked = useSetRecoilState(isFbClickedState);
	const setCurrentVideoTime = useSetRecoilState(currentVideoTimeState);
	const { handleFbChange } = useCrudFeedback(feedback.id);

	useEffect(() => {
		const effect = () => {
			if (!feedbackRef) return;
			feedbackRef.current[index].style.height = textareaRef.current.scrollHeight + 'px';
		};
		effect();
	});

	const { startTime, isFirst, content, readOnly } = feedback;

	const handleClickFeedback = () => {
		if (!isFbSync) return;
		setIsFbClicked(true);
		setCurrentVideoTime(startTime);
	};

	const getFbRef = (el) => {
		if (!feedbackRef) return;
		return (feedbackRef.current[index] = el);
	};

	return (
		<div ref={getFbRef} css={feedbackBoxStyle}>
			<div css={fbStartTimeStyle} style={{ visibility: isFirst ? 'visible' : 'hidden' }}>
				{mmssFormatter(startTime * ONE_SECOND)}
			</div>
			<textarea
				ref={textareaRef}
				value={content}
				onChange={(e) => handleFbChange(e.target.value)}
				readOnly={readOnly}
				onClick={handleClickFeedback}
				css={fbTextAreaStyle}
			/>
			{editableBtns}
		</div>
	);
};

export default React.memo(FeedbackItem);
