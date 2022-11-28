import React from 'react';

import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { feedbackState, isFbClickedState, isFbSyncState } from '@store/feedback.atom';
import { currentVideoTimeSelector } from '@store/currentVideoTime.atom';
import { focusIndexState } from '@store/focusIndex.atom';
import useCrudFeedback from '@hooks/useCrudFeedback';

interface PropsType {
	startTime: number;
	index: number;
	feedbackRef: React.MutableRefObject<any[]>;
}
const EditableFeedbackBox = ({ startTime, index, feedbackRef }: PropsType) => {
	const feedback = useRecoilValue(feedbackState(startTime));

	const isFbSync = useRecoilValue(isFbSyncState);
	const setFocusIndex = useSetRecoilState(focusIndexState);
	const setIsFbClicked = useSetRecoilState(isFbClickedState);
	const setCurrentVideoTime = useSetRecoilState(currentVideoTimeSelector);

	const { handleStartEditFeedback, handleEndEditFeedback, handleFbChange, handleDeleteFeedback } =
		useCrudFeedback(startTime);

	if (!feedback) return;
	const { content, readOnly } = feedback;

	const handleClickFeedback = () => {
		if (!isFbSync) return;
		setFocusIndex(index);
		setIsFbClicked(true);
		setCurrentVideoTime(startTime);
	};

	return (
		<div ref={(el) => (feedbackRef.current[index] = el)} onClick={handleClickFeedback}>
			<div>{startTime}</div>
			{content.map((c, i) => (
				<div key={i}>
					<textarea
						value={c}
						readOnly={readOnly[i]}
						onChange={(e) => handleFbChange(e, i)}
					/>
					<div>
						<DeleteIcon onClick={() => handleDeleteFeedback(i)} width={20} />
					</div>
					<div>
						{readOnly[i] ? (
							<EditIcon onClick={() => handleStartEditFeedback(i)} width={20} />
						) : (
							<button onClick={() => handleEndEditFeedback(i)}>수정완료</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default React.memo(EditableFeedbackBox);
