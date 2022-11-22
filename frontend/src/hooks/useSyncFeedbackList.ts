import { useCallback, useEffect, useRef, useState } from 'react';
import { findCurrentFeedback } from '@utils/utils';

const initialFeedbackList = [
	{ id: 0, content: '테스트 피드백1', startTime: 3, endTime: 4, readOnly: true },
	{ id: 1, content: '테스트 피드백2', startTime: 6, endTime: 9, readOnly: true },
	{ id: 2, content: '테스트 피드백3', startTime: 10, endTime: 15, readOnly: true },
	{ id: 3, content: '테스트 피드백4', startTime: 16, endTime: 20, readOnly: true },
	{ id: 4, content: '테스트 피드백5', startTime: 23, endTime: 30, readOnly: true },
	{ id: 5, content: '테스트 피드백6', startTime: 31, endTime: 33, readOnly: true },
	{ id: 6, content: '테스트 피드백7', startTime: 34, endTime: 40, readOnly: true },
	{ id: 7, content: '테스트 피드백8', startTime: 45, endTime: 50, readOnly: true },
	{ id: 8, content: '테스트 피드백9', startTime: 51, endTime: 53, readOnly: true },
	{ id: 9, content: '테스트 피드백10', startTime: 56, endTime: 57, readOnly: true },
];

const useSyncFeedbackList = () => {
	const [feedbackList, setFeedbackList] = useState(initialFeedbackList);
	const [currentTime, setCurrentTime] = useState(0);
	const [focusIndex, setFocusIndex] = useState(0);
	const [isFbClicked, setIsFbClicked] = useState(false);
	const [isFbSync, setIsFbSync] = useState(true);
	const feedbackRef = useRef([]);

	//TODO 10초에 피드백 2개가 있다고한다면, 2번 째 10초 피드백 클릭 시에도 첫번째 10초 피드백 박스로 이동
	const handleClickFeedback = useCallback(
		(e, startTime: number, idx: number) => {
			feedbackRef.current[focusIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });

			//CHECK 계속 if가 이렇게 추가되는게 좋은 로직인지 모르겠음???????
			if (!isFbSync) {
				setFocusIndex(idx);
				return;
			}
			setCurrentTime(startTime);
			setIsFbClicked(true);
		},
		[isFbSync]
	);

	//TODO (handleClickFeedback TODO과 같은 문제) 같은 초에서 nearestIndex가 무조건 최상위 feedback으로 설정되는 문제
	useEffect(() => {
		if (!isFbSync) return;

		const nearestIndex = findCurrentFeedback(feedbackList, currentTime);
		if (nearestIndex !== focusIndex) setFocusIndex(nearestIndex);
	}, [currentTime]);

	useEffect(() => {
		feedbackRef.current[focusIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [focusIndex]);

	return {
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
	};
};

export default useSyncFeedbackList;
