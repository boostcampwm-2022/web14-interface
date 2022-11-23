import React from 'react';
import { FeedbackBox } from '@components/@shared/FeedbackBox/FeedbackBox';

import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
	feedbackIdsState,
	feedbackState,
	isFbClickedState,
	isFbSyncState,
} from '@store/feedback.atom';
import { currentVideoTimeSelector } from '@store/currentVideoTime.atom';
import { focusIndexState } from '@store/focusIndex.atom';

interface PropsType {
	startTime: number;
	index: number;
}
const EditableFeedbackBox = ({ startTime, index }: PropsType) => {
	const [feedback, setFeedback] = useRecoilState(feedbackState(startTime));
	if (!feedback) return;
	const deleteFeedback = useResetRecoilState(feedbackState(startTime));
	const isFbSync = useRecoilValue(isFbSyncState);
	const setFocusIndex = useSetRecoilState(focusIndexState);
	const setIsFbClicked = useSetRecoilState(isFbClickedState);
	const setCurrentVideoTime = useSetRecoilState(currentVideoTimeSelector(startTime));
	const setfeedbackIdsState = useSetRecoilState(feedbackIdsState);

	const { content, readOnly } = feedback;

	const handleClickFeedback = () => {
		if (!isFbSync) return;
		setFocusIndex(index + 1);
		setIsFbClicked(true);
		setCurrentVideoTime(feedback.startTime);
	};

	const handleStartEditFeedback = (i) => {
		setFeedback((fb) => {
			const newReadOnlyList = fb.readOnly.slice();
			newReadOnlyList[i] = false;
			return { ...fb, readOnly: newReadOnlyList };
		});
	};

	const handleEndEditFeedback = (i) => {
		setFeedback((fb) => {
			const newReadOnlyList = fb.readOnly.slice();
			newReadOnlyList[i] = true;
			return {
				...fb,
				readOnly: newReadOnlyList,
			};
		});
	};

	const handleFbChange = (e, i) => {
		setFeedback((fb) => {
			const newContentList = fb.content.slice();
			newContentList[i] = e.target.value;
			return {
				...fb,
				content: newContentList,
			};
		});
	};

	const handleDeleteFeedback = (idx) => {
		if (feedback.content.length === 1) {
			deleteFeedback();
			setfeedbackIdsState((fbIds) => fbIds.filter((st) => st !== startTime));
		} else {
			setFeedback((fb) => {
				const newContentList = fb.content.reduce((prev, cur, i) => {
					if (idx === i) return prev;
					return prev.concat(cur);
				}, []);
				const newReadOnlyList = fb.readOnly.reduce((prev, cur, i) => {
					if (idx === i) return prev;
					return prev.concat(cur);
				}, []);
				return {
					...fb,
					content: newContentList,
					readOnly: newReadOnlyList,
				};
			});
		}
	};
	console.log(content);
	return (
		<div id={'fb-' + index} onClick={handleClickFeedback}>
			<div>{startTime}</div>
			{content.map((c, i) => (
				<div key={i}>
					<textarea
						value={c}
						readOnly={readOnly[i]}
						onChange={(e) => handleFbChange(e, i)}
					/>
					<button onClick={() => handleDeleteFeedback(i)}>
						<DeleteIcon width={20} />
					</button>
					<button>
						{readOnly[i] ? (
							<EditIcon onClick={() => handleStartEditFeedback(i)} width={20} />
						) : (
							<div onClick={() => handleEndEditFeedback(i)}>수정완료</div>
						)}
					</button>
				</div>
			))}
		</div>
	);
};

export default React.memo(EditableFeedbackBox);
