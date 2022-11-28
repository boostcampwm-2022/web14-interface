import React from 'react';

import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { feedbackState, isFbClickedState, isFbSyncState } from '@store/feedback.atom';
import { currentVideoTimeState } from '@store/currentVideoTime.atom';
import useCrudFeedback from '@hooks/useCrudFeedback';

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
		<div ref={(el) => (feedbackRef.current[index] = el)}>
			{/* TODO: find first innerIndex */}
			<div>{startTime}</div>
			<textarea
				cols={30}
				rows={3}
				value={content}
				onChange={(e) => handleFbChange(e.target.value)}
				readOnly={readOnly}
				onClick={handleClickFeedback}
			/>
			<div>
				<DeleteIcon onClick={handleDeleteFeedback} width={20} />
			</div>
			<div>
				{readOnly ? (
					<EditIcon onClick={handleStartEditFeedback} width={20} />
				) : (
					<button onClick={handleEndEditFeedback}>수정완료</button>
				)}
			</div>
		</div>
	);
};

export default React.memo(EditableFeedbackBox);
