import { feedbackIdsState, feedbackState } from '@store/feedback.store';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

const useCrudFeedback = (feedbackId: string) => {
	const setFeedback = useSetRecoilState(feedbackState(feedbackId));
	const deleteFeedback = useResetRecoilState(feedbackState(feedbackId));
	const setFeedbackIds = useSetRecoilState(feedbackIdsState);

	const handleStartEditFeedback = () => {
		setFeedback((fb) => {
			return { ...fb, readOnly: false };
		});
	};

	const handleEndEditFeedback = () => {
		setFeedback((fb) => {
			return { ...fb, readOnly: true };
		});
	};

	const handleFbChange = (newContent) => {
		setFeedback((fb) => {
			return { ...fb, content: newContent };
		});
	};

	const handleDeleteFeedback = () => {
		deleteFeedback();
		setFeedbackIds((ids) => ids.filter((id) => id !== feedbackId));
	};

	return { handleStartEditFeedback, handleEndEditFeedback, handleFbChange, handleDeleteFeedback };
};

export default useCrudFeedback;
