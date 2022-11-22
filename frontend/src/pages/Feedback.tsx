import React, { useState } from 'react';
import FeedbackArea from '@components/@shared/FeedbackArea/FeedbackArea';

import IntervieweeVideo from '@components/IntervieweeVideo/IntervieweeVideo';
import EditableFeedbackBox from '@components/EditableFeedbackBox/EditableFeedbackBox';

import useSyncFeedbackList from '@hooks/useSyncFeedbackList';
import useEditableFeedbackList from '@hooks/useEditableFeedbackList';

const Feedback = () => {
	const {
		feedbackList,
		currentTime,
		isFbClicked,
		feedbackRef,
		setFeedbackList,
		setCurrentTime,
		setIsFbClicked,
		handleClickFeedback,
		isFbSync,
		setIsFbSync,
	} = useSyncFeedbackList();

	const {
		handleInsertFeedback,
		handleDeleteFeedback,
		handleStartEditFeedback,
		handleEndEditFeedback,
	} = useEditableFeedbackList(feedbackList, setFeedbackList, currentTime);

	return (
		<>
			<IntervieweeVideo
				currentTime={currentTime}
				setCurrentTime={setCurrentTime}
				isFbClicked={isFbClicked}
				setIsFbClicked={setIsFbClicked}
				src="assets/test.mp4"
				width={400}
				controls
			/>
			<button type="button" onClick={() => setIsFbSync((current) => !current)}>
				{isFbSync ? '현재 Sync 중' : '현재 UnSync 중'}
			</button>
			<FeedbackArea>
				<FeedbackArea.FAScrollView>
					{feedbackList.map((feedback, idx) => (
						<EditableFeedbackBox
							key={feedback.id}
							feedback={feedback}
							handleClickFeedback={handleClickFeedback}
							handleDeleteFeedback={handleDeleteFeedback}
							handleStartEditFeedback={handleStartEditFeedback}
							handleEndEditFeedback={handleEndEditFeedback}
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
