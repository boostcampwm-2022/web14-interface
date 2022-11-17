import { useRef } from 'react';

const useEditableFeedbackList = (feedbackList, setFeedbackList, currentTime) => {
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

    return {
		handleInsertFeedback,
		handleDeleteFeedback,
		handleToggleEditFeedback,
		handleChangeFeedback,
	};
};

export default useEditableFeedbackList;
