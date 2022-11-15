import React, { useRef, useEffect } from 'react';
import Video, { VideoPropType } from '@components/Video/Video';

export interface IntervieweeVideoPropType extends VideoPropType {
	second?: number;
	callback?: (params: number) => void;
}

const IntervieweeVideo = ({
	src,
	width,
	height,
	autoplay,
	controls,
	muted,
	second = 0,
	callback,
}: IntervieweeVideoPropType) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	const sendPeriod = 1000;
	const sendCurrentTime = () => {
		if (!videoRef.current?.currentTime) return;

		const currentTime = videoRef.current.currentTime;
		callback(currentTime);
	};

	useEffect(() => {
		if (!callback || !videoRef) return;

		setInterval(sendCurrentTime, sendPeriod);
	}, []);

	useEffect(() => {
		if (!videoRef) return;

		videoRef.current.currentTime = second;
	}, [second]);

	return (
		<Video
			src={src}
			width={width}
			height={height}
			autoplay={autoplay}
			controls={controls}
			muted={muted}
			ref={videoRef}
		/>
	);
};

export default IntervieweeVideo;
