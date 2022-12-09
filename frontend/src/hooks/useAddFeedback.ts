import { EditableFeedbackType } from '@customType/feedback';
import { feedbackIdsState, feedbackIdxMapState, feedbackState } from '@store/feedback.store';
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';

interface AddFeedbackArgsType {
	startTime: number;
	inputVal: string;
}

const useAddFeedback = () => {
	const feedbackIdxMap = useRecoilValue(feedbackIdxMapState);

	const handleAddFeedback = ({ startTime, inputVal }: AddFeedbackArgsType) => {
		feedbackIdxMap.set(startTime, feedbackIdxMap.get(startTime) + 1 || 1);
		const nextInnerIdx = feedbackIdxMap.get(startTime);
		const newFeedbackId = generateFeedbackId(startTime, nextInnerIdx);
		const newFeedback = {
			id: newFeedbackId,
			startTime: startTime,
			innerIndex: nextInnerIdx,
			content: inputVal,
			readOnly: true,
		};

		insertFeedback(newFeedback, newFeedbackId);
	};

	const generateFeedbackId = (startTime: number, innerIdx: number) => {
		return ('000000' + startTime).slice(-6) + ('00' + innerIdx).slice(-2);
	};

	const insertFeedback = useRecoilTransaction_UNSTABLE(
		({ set }) =>
			(newFeedback: EditableFeedbackType, newFeedbackId: string) => {
				set(feedbackIdsState, (todoId) => todoId.concat(newFeedbackId).sort());
				set(feedbackState(newFeedbackId), newFeedback);
			},
		[]
	);

	return { handleAddFeedback };
};

export default useAddFeedback;
