import React from 'react';

import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { feedbackState, isFbClickedState, isFbSyncState } from '@store/feedback.atom';
import { currentVideoTimeState } from '@store/currentVideoTime.atom';
import useCrudFeedback from '@hooks/useCrudFeedback';

import {
	feedbackBoxStyle,
	fbTextAreaStyle,
	fbBtnContainer,
	fbStartTimeStyle,
} from './EditableFeedbackBox.style';

interface PropsType {
	feedbackId: string;
	feedbackRef: React.MutableRefObject<any[]>;
	index: number;
}
const EditableFeedbackBox = ({ feedbackId, feedbackRef, index }: PropsType) => {
	const feedback = useRecoilValue(feedbackState(feedbackId));
	const isFbSync = useRecoilValue(isFbSyncState);
	const setIsFbClicked = useSetRecoilState(isFbClickedState);
	const setCurrentVideoTime = useSetRecoilState(currentVideoTimeState);
	const { handleStartEditFeedback, handleEndEditFeedback, handleFbChange, handleDeleteFeedback } =
		useCrudFeedback(feedbackId);

	const { startTime, innerIndex, content, readOnly } = feedback;

	const handleClickFeedback = () => {
		if (!isFbSync) return;
		setIsFbClicked(true);
		setCurrentVideoTime(startTime);
	};

	return (
		<div ref={(el) => (feedbackRef.current[index] = el)} css={feedbackBoxStyle}>
			{/* TODO: find first innerIndex */}
			<div css={fbStartTimeStyle}>{startTime}</div>
			<textarea
				rows={3}
				value={content}
				onChange={(e) => handleFbChange(e.target.value)}
				readOnly={readOnly}
				onClick={handleClickFeedback}
				css={fbTextAreaStyle}
			/>
			<div css={fbBtnContainer}>
				<div>
					{readOnly ? (
						<EditIcon onClick={handleStartEditFeedback} width={15} />
					) : (
						<button onClick={handleEndEditFeedback}>수정완료</button>
					)}
				</div>
				<div>
					<DeleteIcon onClick={handleDeleteFeedback} width={15} />
				</div>
			</div>
		</div>
	);
};

export default React.memo(EditableFeedbackBox);
