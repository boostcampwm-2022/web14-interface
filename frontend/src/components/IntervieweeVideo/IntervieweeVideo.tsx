import React, { useRef, useEffect } from 'react';
import Video from '@components/@shared/Video/Video';
import { useSetRecoilState } from 'recoil';
import { currentVideoTimeSelector } from '@store/currentVideoTime.atom';

const IntervieweeVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const setVideoTimeState = useSetRecoilState(currentVideoTimeSelector(0));

	const sendPeriod = 1000;
	const sendCurrentTime = () => {
		if (!videoRef.current?.currentTime) return;

		const currentTime = videoRef.current.currentTime;
		setVideoTimeState(currentTime);
	};

	useEffect(() => {
		if (videoRef) {
			const intervalId = setInterval(sendCurrentTime, sendPeriod);

			return () => clearInterval(intervalId);
		}
	}, []);

	return <Video src="assets/test.mp4" width={400} controls ref={videoRef} />;
};

export default React.memo(IntervieweeVideo);
