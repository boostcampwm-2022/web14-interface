import React, { useRef, useEffect, Dispatch, SetStateAction } from 'react';
import Video, { VideoPropType } from '@components/@shared/Video/Video';

interface IntervieweeVideoType extends VideoPropType {
	currentTime: number;
	setCurrentTime: Dispatch<SetStateAction<number>>;
	isFbClicked: boolean;
	setIsFbClicked: Dispatch<SetStateAction<boolean>>;
}
const IntervieweeVideo = (props: IntervieweeVideoType) => {
	const { currentTime, setCurrentTime, isFbClicked, setIsFbClicked } = props;
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
		if (videoRef && isFbClicked) {
			videoRef.current.currentTime = currentTime;
			setIsFbClicked(false);
		}
	}, [currentTime]);

	return <Video {...props} ref={videoRef} />;
};

export default React.memo(IntervieweeVideo);
