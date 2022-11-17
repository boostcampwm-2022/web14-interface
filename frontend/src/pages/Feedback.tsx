import React, { useState, useEffect, useRef } from 'react';
import { FeedbackBox } from '@components/@shared/FeedbackBox/FeedbackBox';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import { useRecoilState } from 'recoil';

import { currentTimeState, feedbackListState } from '@store/feedbackStore';
import { findCurrentFeedback } from '@utils/utils';
import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import EditableFeedbackBox from '@components/EditableFeedbackBox/EditableFeedbackBox';

const Feedback = () => {
	const [feedbackList, setFeedbackList] = useRecoilState(feedbackListState);
	const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
	const [isFbClicked, setIsFbClicked] = useState(false);
	const [focusIndex, setFocusIndex] = useState(0);

	const feedbackRef = useRef([]);
	const idRef = useRef<number>(10);

	const handleInsertFeedback = (content: string) => {
		const newFeedbackList = [
			...feedbackList,
			{
				id: idRef.current++,
				content,
				startTime: Math.floor(currentTime),
				endTime: 0,
				readOnly: true,
			},
		].sort((a, b) => a.startTime - b.startTime);

		setFeedbackList(newFeedbackList);
	};

	const handleClickFeedback = (e, startTime: number) => {
		e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		setCurrentTime(startTime);
		setIsFbClicked(true);
	};
	const handleDeleteFeedback = (id: number) => {
		setFeedbackList(feedbackList.filter((feedback) => feedback.id !== id));
	};
	const handleToggleEditFeedback = (id: number) => {
		setFeedbackList(
			feedbackList.map((feedback) => {
				if (feedback.id === id) return { ...feedback, readOnly: !feedback.readOnly };
				return feedback;
			})
		);
	};
	const handleChangeFeedback = (e, id: number) => {
		setFeedbackList(
			feedbackList.map((feedback) => {
				if (feedback.id === id) {
					return {
						...feedback,
						content: e.target.value,
					};
				}
				return feedback;
			})
		);
	};

	useEffect(() => {
		const nearestIndex = findCurrentFeedback(feedbackList, currentTime);
		console.log(nearestIndex, feedbackList[nearestIndex].startTime);
		if (nearestIndex !== focusIndex) setFocusIndex(nearestIndex);
	}, [currentTime]);

	useEffect(() => {
		feedbackRef.current[focusIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [focusIndex]);

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
						<EditableFeedbackBox
							key={feedback.id}
							feedback={feedback}
							handleClickFeedback={handleClickFeedback}
							handleDeleteFeedback={handleDeleteFeedback}
							handleToggleEditFeedback={handleToggleEditFeedback}
							handleChangeFeedback={handleChangeFeedback}
							feedbackRef={feedbackRef}
							idx={idx}
						/>
					))}
				</FeedbackArea.FAScrollView>
				<FeedbackArea.FATextArea onInsertFeedback={handleInsertFeedback} />
			</FeedbackArea>
		</>
	);
};

export default Feedback;
