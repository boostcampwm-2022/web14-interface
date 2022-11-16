import React, { useEffect, useRef } from 'react';
import { FeedbackBox } from '@components/@shared/FeedbackBox/FeedbackBox';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';

const Feedback = () => {
	const feedbackRef = useRef([]);
	const dummyFeedback = [
		{ id: 0, content: '테스트 피드백1', startTime: 3, endTime: 4 },
		{ id: 1, content: '테스트 피드백2', startTime: 6, endTime: 9 },
		{ id: 2, content: '테스트 피드백3', startTime: 10, endTime: 15 },
		{ id: 3, content: '테스트 피드백4', startTime: 16, endTime: 20 },
		{ id: 4, content: '테스트 피드백5', startTime: 23, endTime: 30 },
		{ id: 5, content: '테스트 피드백6', startTime: 31, endTime: 33 },
		{ id: 6, content: '테스트 피드백7', startTime: 34, endTime: 40 },
		{ id: 7, content: '테스트 피드백8', startTime: 45, endTime: 50 },
		{ id: 8, content: '테스트 피드백9', startTime: 51, endTime: 53 },
		{ id: 9, content: '테스트 피드백10', startTime: 56, endTime: 57 },
	];

	useEffect(() => {
		console.log(feedbackRef);
	}, []);

	const onClickFeedback = (e) => {
		e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<FeedbackArea>
			<FeedbackArea.FBAScrollView>
				{dummyFeedback.map((feedback, idx) => (
					<FeedbackBox
						key={feedback.id}
						handleClick={onClickFeedback}
						ref={(elem) => (feedbackRef.current[idx] = elem)}
					>
						<FeedbackBox.StartTime>{feedback.startTime}</FeedbackBox.StartTime>
						<FeedbackBox.Content>{feedback.content}</FeedbackBox.Content>
					</FeedbackBox>
				))}
			</FeedbackArea.FBAScrollView>
			<FeedbackArea.FBATextArea></FeedbackArea.FBATextArea>
		</FeedbackArea>
	);
};

export default Feedback;
