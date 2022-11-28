import { FeedbackType } from '@customType/feedback';
import { currentVideoTimeState } from '@store/currentVideoTime.atom';
import { feedbackIdsState, feedbackState } from '@store/feedback.atom';
import React, { useState } from 'react';
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';

const FeedbackForm = () => {
	const [inputVal, setInputVal] = useState('');
	const [startTime, setStartTime] = useState(0);
	const currentVideoTime = useRecoilValue(currentVideoTimeState);

	const handleChange = (e) => {
		if (!inputVal.length) setStartTime(currentVideoTime);
		setInputVal(e.target.value);
	};

	const handleAddFeedback = (e) => {
		e.preventDefault();
		const newFeedback = {
			startTime: startTime,
			content: [inputVal],
			readOnly: [true],
		};

		insertFeedback(newFeedback);
		setInputVal('');
	};

	const insertFeedback = useRecoilTransaction_UNSTABLE(
		({ set, get }) =>
			(newFeedback: FeedbackType) => {
				const existFeedback = get(feedbackState(newFeedback.startTime));
				if (!existFeedback) createNewFeedbackBox(set, newFeedback);
				else appendFeedback(set, newFeedback, existFeedback);
			},
		[currentVideoTime]
	);

	const createNewFeedbackBox = (set, newFeedback) => {
		set(feedbackIdsState, (curTodoIds) =>
			curTodoIds.concat(newFeedback.startTime).sort((a, b) => a - b)
		);
		set(feedbackState(newFeedback.startTime), newFeedback);
	};

	const appendFeedback = (set, newFeedback, existFeedback) => {
		set(feedbackState(newFeedback.startTime), {
			...existFeedback,
			content: existFeedback.content.concat(newFeedback.content),
			readOnly: existFeedback.readOnly.concat(newFeedback.readOnly),
		});
	};

	return (
		<>
			<form onSubmit={handleAddFeedback}>
				<input type="text" value={inputVal} onChange={handleChange} />
				<button type="submit">추가</button>
			</form>
		</>
	);
};

export default React.memo(FeedbackForm);
