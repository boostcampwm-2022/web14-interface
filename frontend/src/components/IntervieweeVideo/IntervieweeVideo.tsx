import React, { useRef, useEffect } from 'react';
import Video from '@components/@shared/Video/Video';
import { useRecoilState } from 'recoil';
import { currentVideoTimeState } from '@store/currentVideoTime.atom';
import { isFbClickedState } from '@store/feedback.atom';

const IntervieweeVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [currentVideoTime, setCurrentVideoTime] = useRecoilState(currentVideoTimeState);
	const [isFbClicked, setIsFbClicked] = useRecoilState(isFbClickedState);

	const sendPeriod = 1000;
	const sendCurrentTime = () => {
		if (!videoRef.current?.currentTime) return;

		const currentTime = videoRef.current.currentTime;
		setCurrentVideoTime(Math.floor(currentTime));
	};

	useEffect(() => {
		if (!videoRef.current) return;
		if (!isFbClicked) return;
		videoRef.current.currentTime = currentVideoTime;
		setIsFbClicked(false);
	}, [currentVideoTime]);

	useEffect(() => {
		if (videoRef) {
			const intervalId = setInterval(sendCurrentTime, sendPeriod);

			return () => clearInterval(intervalId);
		}
	}, []);

	return <Video src="assets/test.mp4" width={400} controls ref={videoRef} />;
};

export default React.memo(IntervieweeVideo);
