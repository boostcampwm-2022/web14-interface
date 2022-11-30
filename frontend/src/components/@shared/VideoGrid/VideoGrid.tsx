import React from 'react';
import { css } from '@emotion/react';

interface propType {
	children: React.ReactNode | React.ReactNode[];
}

const VideoGrid = ({ children }: propType) => {
	const repeatNumber = Array.isArray(children) ? Math.ceil(children.length ** 0.5) : 1;

	return <div css={videoGridStyle(repeatNumber)}>{children}</div>;
};

const videoGridStyle = (repeatNumber: number) => css`
	display: grid;
	grid-template-rows: repeat(${repeatNumber}, 1fr);
	grid-template-columns: repeat(${repeatNumber}, 1fr);
	gap: 2px;

	video {
		width: 100% !important;
	}
`;

export default VideoGrid;
