/*  */
import { FeedbackType } from '@customType/feedback';
import { currentVideoTimeState } from '@store/currentVideoTime.atom';
import { feedbackIdsState, feedbackState } from '@store/feedback.atom';
import React, { useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const FeedbackForm = () => {
	const [inputVal, setInputVal] = useState('');
	const [startTime, setStartTime] = useState(0);
	const currentVideoTime = useRecoilValue(currentVideoTimeState);

	const handleAddFeedback = (e) => {
		e.preventDefault();
		const newFeedback = {
			startTime: startTime,
			endTime: currentVideoTime,
			content: inputVal,
			readOnly: true,
		};
		console.log(JSON.stringify(newFeedback));
		insertTodo(newFeedback);
		setInputVal('');
	};

	const insertTodo = useRecoilCallback(
		({ set }) =>
			(newFeedback: FeedbackType) => {
				set(feedbackIdsState, (curTodoIds) => curTodoIds.concat(startTime));
				set(feedbackState(newFeedback.startTime), newFeedback);
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
