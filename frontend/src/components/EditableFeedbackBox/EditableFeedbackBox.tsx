import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useCrudFeedback from '@hooks/useCrudFeedback';
import { isFbClickedState, isFbSyncState } from '@store/feedback.store';
import { currentVideoTimeState } from '@store/currentVideoTime.store';

import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';
import { ReactComponent as CheckIcon } from '@assets/icon/check.svg';
import {
	feedbackBoxStyle,
	fbTextAreaStyle,
	fbBtnContainer,
	fbStartTimeStyle,
} from './EditableFeedbackBox.style';
import { iconSmStyle } from '@styles/commonStyle';
import { FeedbackItemType } from '@customType/feedback';

interface PropsType {
	feedback: FeedbackItemType;
	//TODO ref type any
	feedbackRef: React.MutableRefObject<any[]>;
	index: number;
}
const EditableFeedbackBox = ({ feedback, feedbackRef, index }: PropsType) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const isFbSync = useRecoilValue(isFbSyncState);
	const setIsFbClicked = useSetRecoilState(isFbClickedState);
	const setCurrentVideoTime = useSetRecoilState(currentVideoTimeState);
	const { handleStartEditFeedback, handleEndEditFeedback, handleFbChange, handleDeleteFeedback } =
		useCrudFeedback(feedback.id);

	useEffect(() => {
		feedbackRef.current[index].style.height = textareaRef.current.scrollHeight + 'px';
	});

	const { startTime, isFirst, content, readOnly } = feedback;

	const handleClickFeedback = () => {
		if (!isFbSync) return;
		setIsFbClicked(true);
		setCurrentVideoTime(startTime);
	};

	return (
		<div ref={(el) => (feedbackRef.current[index] = el)} css={feedbackBoxStyle}>
			<div css={fbStartTimeStyle} style={{ visibility: isFirst ? 'visible' : 'hidden' }}>
				{startTime}
			</div>
			<textarea
				ref={textareaRef}
				value={content}
				onChange={(e) => handleFbChange(e.target.value)}
				readOnly={readOnly}
				onClick={handleClickFeedback}
				css={fbTextAreaStyle}
			/>
			<div css={fbBtnContainer}>
				{readOnly ? (
					<button onClick={handleStartEditFeedback}>
						<EditIcon {...iconSmStyle} fill="black" />
					</button>
				) : (
					<button onClick={handleEndEditFeedback}>
						<CheckIcon {...iconSmStyle} fill="black" />
					</button>
				)}
				<button onClick={handleDeleteFeedback}>
					<DeleteIcon {...iconSmStyle} fill="black" />
				</button>
			</div>
		</div>
	);
};

export default React.memo(EditableFeedbackBox);
