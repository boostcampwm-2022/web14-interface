import React, { useState, useEffect, useRef } from 'react';
import { FeedbackBox } from '@components/@shared/FeedbackBox/FeedbackBox';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import { useRecoilState } from 'recoil';
import { currentTimeState, feedbackListState } from '@store/feedbackStore';
import { findCurrentFeedback } from '@utils/utils';
import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';

const Feedback = () => {
	const [feedbackList, setFeedbackList] = useRecoilState(feedbackListState);
	const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
	const [isFbClicked, setIsFbClicked] = useState(false);
	const [focusIndex, setFocusIndex] = useState(0);
	const [inputValue, setInputValue] = useState('');

	const feedbackRef = useRef([]);

	useEffect(() => {
		const nearestIndex = findCurrentFeedback(feedbackList, currentTime);
		console.log(nearestIndex, feedbackList[nearestIndex].startTime);
		if (nearestIndex !== focusIndex) setFocusIndex(nearestIndex);
	}, [currentTime]);

	useEffect(() => {
		feedbackRef.current[focusIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [focusIndex]);

	const handleClickFeedback = (e, startTime: number) => {
		e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		setCurrentTime(startTime);
		setIsFbClicked(true);
	};

	return (
		<>
			<IntervieweeVideo
				isFbClicked={isFbClicked}
				setIsFbClicked={setIsFbClicked}
				src="assets/test.mp4"
				width={400}
				controls
			/>
			<FeedbackArea>
				<FeedbackArea.FAScrollView>
					{feedbackList.map((feedback, idx) => (
						<FeedbackBox
							key={feedback.id}
							onClick={(e) => handleClickFeedback(e, feedback.startTime)}
							ref={(elem) => (feedbackRef.current[idx] = elem)}
						>
							<FeedbackBox.StartTime>{feedback.startTime}</FeedbackBox.StartTime>
							<FeedbackBox.Content>{feedback.content}</FeedbackBox.Content>
						</FeedbackBox>
					))}
				</FeedbackArea.FAScrollView>
				<FeedbackArea.FATextArea
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</FeedbackArea>
		</>
	);
};

export default Feedback;
