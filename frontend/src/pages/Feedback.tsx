import React, { useState, useEffect, useRef } from 'react';
import { FeedbackBox } from '@components/@shared/FeedbackBox/FeedbackBox';
import FeedbackArea from '@components/FeedbackArea/FeedbackArea';
import { useRecoilState } from 'recoil';
import { currentTimeState, feedbackListState } from '@store/feedbackStore';
import { findCurrentFeedback } from '@utils/utils';
import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import { ReactComponent as DeleteIcon } from '@assets/icon/delete.svg';
import { ReactComponent as EditIcon } from '@assets/icon/edit.svg';

const Feedback = () => {
	const [feedbackList, setFeedbackList] = useRecoilState(feedbackListState);
	const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
	const [isFbClicked, setIsFbClicked] = useState(false);
	const [focusIndex, setFocusIndex] = useState(0);

	const feedbackRef = useRef([]);
	const idRef = useRef<number>(10);

	const addFeedback = (content: string) => {
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
							<FeedbackBox.Content
								value={feedback.content}
								onChange={(e) => handleChangeFeedback(e, feedback.id)}
								readOnly={feedback.readOnly}
							/>
							<FeedbackBox.Btn onClick={() => handleDeleteFeedback(feedback.id)}>
								<DeleteIcon width={20} />
							</FeedbackBox.Btn>
							<FeedbackBox.Btn onClick={() => handleToggleEditFeedback(feedback.id)}>
								{ feedback.readOnly ? <EditIcon width={20} /> : '수정완료'}
							</FeedbackBox.Btn>
						</FeedbackBox>
					))}
				</FeedbackArea.FAScrollView>
				<FeedbackArea.FATextArea onInsertFeedback={addFeedback} />
			</FeedbackArea>
		</>
	);
};

export default Feedback;
