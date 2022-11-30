import React from 'react';
import { css } from '@emotion/react';

interface propType {
	children: React.ReactNode | React.ReactNode[];
}

const VideoGrid = ({ children }: propType) => {
	const colNumber = Array.isArray(children) ? Math.ceil(children.length ** 0.5) : 1;
	const rowNumber =
		Array.isArray(children) && children.length === colNumber ** 2 ? colNumber : colNumber - 1;

	return <div css={videoGridStyle(rowNumber, colNumber)}>{children}</div>;
};

const videoGridStyle = (rowNumber: number, colNumber: number) => css`
	display: grid;
	grid-template-rows: repeat(${rowNumber}, 1fr);
	grid-template-columns: repeat(${colNumber}, 1fr);
	gap: 2px;

	video {
		width: 100% !important;
	}
`;

export default VideoGrid;
