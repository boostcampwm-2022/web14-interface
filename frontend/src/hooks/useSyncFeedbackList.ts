import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { currentTimeState, feedbackListState } from '@store/feedbackStore';
import { findCurrentFeedback } from '@utils/utils';

const useSyncFeedbackList = () => {
	const [feedbackList, setFeedbackList] = useRecoilState(feedbackListState);
	const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
	const [focusIndex, setFocusIndex] = useState(0);
	const [isFbClicked, setIsFbClicked] = useState(false);
	const feedbackRef = useRef([]);

	const handleClickFeedback = (e, startTime: number) => {
		e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		setCurrentTime(startTime);
		setIsFbClicked(true);
	};

	useEffect(() => {
		const nearestIndex = findCurrentFeedback(feedbackList, currentTime);
		console.log(nearestIndex, feedbackList[nearestIndex].startTime);
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
		setIsFbClicked,
		handleClickFeedback,
	};
};

export default useSyncFeedbackList;
