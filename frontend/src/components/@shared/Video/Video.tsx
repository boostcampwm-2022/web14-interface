import React, { forwardRef, useEffect, useRef } from 'react';

export interface VideoPropType {
	src: string | MediaStream;
	width?: number;
	height?: number;
	autoplay?: boolean;
	controls?: boolean;
	muted?: boolean;
}

const Video = ({ src, width, height, autoplay, controls, muted }: VideoPropType, ref) => {
	const videoRef = ref ? ref : useRef<HTMLVideoElement>(null);
	const isStatic = typeof src === 'string';

	useEffect(() => {
		if (!videoRef.current) return;

		videoRef.current.autoplay = autoplay;
		videoRef.current.controls = controls;
		videoRef.current.muted = muted;

		if (isStatic) return;

		videoRef.current.srcObject = src;
	}, [src]);

	return isStatic ? (
		<video src={src} width={width} height={height} ref={videoRef} />
	) : (
		<video width={width} height={height} ref={videoRef} />
	);
};

export default forwardRef(Video);
