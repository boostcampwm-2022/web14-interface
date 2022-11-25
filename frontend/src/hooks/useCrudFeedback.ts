import { feedbackIdsState, feedbackState } from '@store/feedback.atom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

const useCrudFeedback = (startTime) => {
	const [feedback, setFeedback] = useRecoilState(feedbackState(startTime));
	const deleteFeedback = useResetRecoilState(feedbackState(startTime));
	const setfeedbackIds = useSetRecoilState(feedbackIdsState);

	const handleStartEditFeedback = (i) => {
		setFeedback((fb) => {
			const newReadOnlyList = fb.readOnly.slice();
			newReadOnlyList[i] = false;
			return { ...fb, readOnly: newReadOnlyList };
		});
	};

	const handleEndEditFeedback = (i) => {
		setFeedback((fb) => {
			const newReadOnlyList = fb.readOnly.slice();
			newReadOnlyList[i] = true;
			return {
				...fb,
				readOnly: newReadOnlyList,
			};
		});
	};

	const handleFbChange = (e, i) => {
		setFeedback((fb) => {
			const newContentList = fb.content.slice();
			newContentList[i] = e.target.value;
			return {
				...fb,
				content: newContentList,
			};
		});
	};

	const handleDeleteFeedback = (idx) => {
		if (feedback.content.length === 1) {
			deleteFeedback();
			setfeedbackIds((fbIds) => fbIds.filter((st) => st !== startTime));
		} else {
			setFeedback((fb) => {
				const newContentList = fb.content.splice(idx, 1);
				const newReadOnlyList = fb.readOnly.splice(idx, 1);
				return {
					...fb,
					content: newContentList,
					readOnly: newReadOnlyList,
				};
			});
		}
	};

	return { handleStartEditFeedback, handleEndEditFeedback, handleFbChange, handleDeleteFeedback };
};

export default useCrudFeedback;
