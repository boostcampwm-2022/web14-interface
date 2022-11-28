import { FeedbackType } from '@customType/feedback';
import { currentVideoTimeState } from '@store/currentVideoTime.atom';
import { feedbackIdsState, feedbackIdxMapState, feedbackState } from '@store/feedback.atom';
import React, { useState } from 'react';
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';

import { fbFormStyle, fbInputStyle, fbStartTimeStyle } from './FeedbackForm.style';

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

	const handleAddFeedback = (e) => {
		e.preventDefault();
		feedbackIdxMap.set(startTime, feedbackIdxMap.get(startTime) + 1 || 1);
		const nextInnerIdx = feedbackIdxMap.get(startTime);
		const newFeedback = {
			startTime: startTime,
			innerIndex: nextInnerIdx,
			content: inputVal,
			readOnly: true,
		};

		insertFeedback(newFeedback);
		setInputVal('');
	};

	const generateFeedbackId = (startTime: number, innerIdx: number) => {
		return ('000000' + startTime).slice(-6) + ('00' + innerIdx).slice(-2);
	};

	const insertFeedback = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(newFeedback: FeedbackType) => {
				const newFeedbackId = generateFeedbackId(
					newFeedback.startTime,
					newFeedback.innerIndex
				);
				set(feedbackIdsState, (todoId) => todoId.concat(newFeedbackId).sort());
				set(feedbackState(newFeedbackId), newFeedback);
			},
		[]
	);

	return (
		<div css={fbFormStyle}>
			<div css={fbStartTimeStyle}>{inputVal ? startTime : currentVideoTime}</div>
			<form onSubmit={handleAddFeedback}>
				<input type="text" value={inputVal} onChange={handleChange} css={fbInputStyle} />
			</form>
		</div>
	);
};

export default React.memo(FeedbackForm);
