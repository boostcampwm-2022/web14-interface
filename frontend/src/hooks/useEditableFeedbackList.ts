import { useCallback, useRef } from 'react';

const useEditableFeedbackList = (feedbackList, setFeedbackList, currentTime) => {
	const idRef = useRef<number>(10);

	const handleInsertFeedback = useCallback((content: string) => {
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
	}, []);

	const handleDeleteFeedback = useCallback(
		(id: number) => {
			setFeedbackList(feedbackList.filter((feedback) => feedback.id !== id));
		},
		[feedbackList]
	);
	const handleStartEditFeedback = useCallback(
		(id: number) => {
			setFeedbackList(
				feedbackList.map((feedback) => {
					if (feedback.id === id) return { ...feedback, readOnly: false };
					return feedback;
				})
			);
		},
		[feedbackList]
	);
	const handleEndEditFeedback = useCallback(
		(id, newContent) => {
			setFeedbackList(
				feedbackList.map((feedback) => {
					if (feedback.id === id)
						return { ...feedback, content: newContent, readOnly: true };
					return feedback;
				})
			);
		},
		[feedbackList]
	);

	return {
		handleInsertFeedback,
		handleDeleteFeedback,
		handleStartEditFeedback,
		handleEndEditFeedback,
	};
};

export default useEditableFeedbackList;
