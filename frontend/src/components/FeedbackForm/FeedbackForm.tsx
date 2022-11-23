/*  */
import { FeedbackType } from '@customType/feedback';
import { currentVideoTimeState } from '@store/currentVideoTime.atom';
import { feedbackIdsState, feedbackState } from '@store/feedback.atom';
import React, { useState } from 'react';
import { useRecoilCallback, useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';

const FeedbackForm = () => {
	const [inputVal, setInputVal] = useState('');
	const [startTime, setStartTime] = useState(0);
	const currentVideoTime = useRecoilValue(currentVideoTimeState);

	const handleAddFeedback = (e) => {
		e.preventDefault();
		const newFeedback = {
			startTime: startTime,
			content: [inputVal],
			readOnly: [true],
		};

		insertTodo(newFeedback);
		setInputVal('');
	};

	const insertTodo = useRecoilTransaction_UNSTABLE(
		({ set, get }) =>
			(newFeedback: FeedbackType) => {
				const targetFb = get(feedbackState(newFeedback.startTime));
				if (!targetFb) {
					set(feedbackIdsState, (curTodoIds) =>
						curTodoIds.concat(newFeedback.startTime).sort((a, b) => a - b)
					);
					set(feedbackState(newFeedback.startTime), newFeedback);
				} else {
					set(feedbackState(newFeedback.startTime), {
						...targetFb,
						content: targetFb.content.concat(newFeedback.content),
						readOnly: targetFb.readOnly.concat(newFeedback.readOnly),
					});
				}
			},
		[currentVideoTime]
	);

	const handleChange = (e) => {
		if (!inputVal.length) setStartTime(currentVideoTime);
		setInputVal(e.target.value);
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
