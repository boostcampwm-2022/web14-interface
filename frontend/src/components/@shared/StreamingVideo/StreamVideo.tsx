import React, { forwardRef, useEffect, useRef } from 'react';
import { nameTagStyle, streamVideoStyle, streamVideoWrapperStyle } from './StreamVideo.style';

import { ReactComponent as MicOnIcon } from '@assets/icon/mic_on.svg';
import { ReactComponent as MicOffIcon } from '@assets/icon/mic_off.svg';

export interface StreamVideoPropType {
	src: MediaStream;
	nickname: string;
	width?: string;
	height?: string;
	audio?: boolean;
	isMyStream?: boolean;
}

const StreamVideo = (
	{ src, nickname, width, height, audio, isMyStream }: StreamVideoPropType,
	ref
) => {
	const videoRef = ref ? ref : useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (!videoRef.current) return;

		videoRef.current.srcObject = src;
		videoRef.current.controls = false;
	}, [src]);

	return (
		<div css={(theme) => streamVideoWrapperStyle(theme, width, height)}>
			<video css={streamVideoStyle} ref={videoRef} muted={isMyStream} autoPlay playsInline />
			<span css={(theme) => nameTagStyle(theme, audio)}>
				{audio ? <MicOnIcon /> : <MicOffIcon />}
				<span>{nickname}</span>
			</span>
		</div>
	);
};

export default forwardRef(StreamVideo);
