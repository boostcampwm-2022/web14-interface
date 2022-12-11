import React, { forwardRef, useEffect, useRef } from 'react';
import { videoStyle, videoWrapperStyle } from './Video.style';

export interface VideoPropType {
	src: string;
	width?: string;
	height?: string;
	autoplay?: boolean;
	controls?: boolean;
	muted?: boolean;
}

const Video = ({ src, width, height, autoplay, controls, muted }: VideoPropType, ref) => {
	const videoRef = ref ? ref : useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (!videoRef.current) return;

		videoRef.current.autoplay = autoplay;
		videoRef.current.controls = controls;
		videoRef.current.muted = muted;
	}, [src]);

	return (
		<div css={(theme) => videoWrapperStyle(theme, width, height)}>
			<video css={videoStyle} src={src} ref={videoRef} />
		</div>
	);
};

export default forwardRef(Video);
