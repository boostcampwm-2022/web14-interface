import React, { useRef, useEffect, useState } from 'react';
import Video, { VideoPropType } from '@components/@shared/Video/Video';
import { useRecoilState } from 'recoil';
import { currentVideoTimeState } from '@store/currentVideoTime.store';
import { isFbClickedState } from '@store/feedback.store';
import StreamVideo, { StreamVideoPropType } from '@components/@shared/StreamingVideo/StreamVideo';

const IntervieweeVideo = (props: VideoPropType | StreamVideoPropType) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const offsetRef = useRef(0);
	const [currentVideoTime, setCurrentVideoTime] = useRecoilState(currentVideoTimeState);
	const [isFbClicked, setIsFbClicked] = useRecoilState(isFbClickedState);
	const isStaticVideo = typeof props.src === 'string';

	const sendPeriod = 1000;
	const sendCurrentTime = () => {
		if (!videoRef.current?.currentTime || videoRef.current.currentTime === 0) return;
		if (offsetRef.current === 0) {
			offsetRef.current = videoRef.current.currentTime;
		}

		setCurrentVideoTime(Math.floor(videoRef.current.currentTime - offsetRef.current + 1));
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

	return isStaticVideo ? (
		<Video {...(props as VideoPropType)} ref={videoRef} />
	) : (
		<StreamVideo {...(props as StreamVideoPropType)} ref={videoRef} />
	);
};

export default React.memo(IntervieweeVideo);
