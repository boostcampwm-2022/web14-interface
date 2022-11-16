import React, { useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Video, { VideoPropType } from '@components/@shared/Video/Video';
import { currentTimeState } from '@store/feedbackStore';

const IntervieweeVideo = (props: VideoPropType) => {
	const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
	const videoRef = useRef<HTMLVideoElement>(null);

	const sendPeriod = 1000;
	const sendCurrentTime = () => {
		if (!videoRef.current?.currentTime) return;

		const currentTime = videoRef.current.currentTime;
		setCurrentTime(currentTime);
	};

	useEffect(() => {
		if (videoRef) {
			const intervalId = setInterval(sendCurrentTime, sendPeriod);

			return () => clearInterval(intervalId);
		}
	}, []);

	useEffect(() => {
		if (videoRef) {
			videoRef.current.currentTime = currentTime;
			console.log(currentTime);
		}
	}, [currentTime]);

	return <Video {...props} ref={videoRef} />;
};

export default IntervieweeVideo;
