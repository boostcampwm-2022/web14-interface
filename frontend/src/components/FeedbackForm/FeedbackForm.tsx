import { EditableFeedbackType } from '@customType/feedback';
import { currentVideoTimeState } from '@store/currentVideoTime.store';
import { feedbackIdsState, feedbackIdxMapState, feedbackState } from '@store/feedback.store';
import React, { useState } from 'react';
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';

import { fbFormWrapperStyle, fbInputStyle, fbStartTimeStyle } from './FeedbackForm.style';

const FeedbackForm = () => {
	const [inputVal, setInputVal] = useState('');
	const [startTime, setStartTime] = useState(0);
	const feedbackIdxMap = useRecoilValue(feedbackIdxMapState);
	const currentVideoTime = useRecoilValue(currentVideoTimeState);

	const handleChange = (e) => {
		if (!inputVal.length) {
			setStartTime(currentVideoTime);
		}
		setInputVal(e.target.value);
	};

	const handleAddFeedback = () => {
		feedbackIdxMap.set(startTime, feedbackIdxMap.get(startTime) + 1 || 1);
		const nextInnerIdx = feedbackIdxMap.get(startTime);
		const newFeedbackId = generateFeedbackId(startTime, nextInnerIdx);
		const newFeedback = {
			id: newFeedbackId,
			startTime: startTime,
			innerIndex: nextInnerIdx,
			content: inputVal,
			readOnly: true,
		};

		insertFeedback(newFeedback, newFeedbackId);
		setInputVal('');
	};

	const generateFeedbackId = (startTime: number, innerIdx: number) => {
		return ('000000' + startTime).slice(-6) + ('00' + innerIdx).slice(-2);
	};

	const insertFeedback = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(newFeedback: EditableFeedbackType, newFeedbackId: string) => {
				set(feedbackIdsState, (todoId) => todoId.concat(newFeedbackId).sort());
				set(feedbackState(newFeedbackId), newFeedback);
			},
		[]
	);

	const handleKeyDown = (e) => {
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			handleAddFeedback();
		}
	};

	return (
		<div css={fbFormWrapperStyle}>
			<div css={fbStartTimeStyle}>{inputVal ? startTime : currentVideoTime}</div>
			<textarea
				value={inputVal}
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				css={fbInputStyle}
			/>
		</div>
	);
};

export default React.memo(FeedbackForm);
