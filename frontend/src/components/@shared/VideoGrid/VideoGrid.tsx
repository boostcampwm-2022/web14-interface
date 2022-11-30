import React from 'react';
import { videoGridStyle } from './VideoGrid.style';

interface propType {
	children: React.ReactNode | React.ReactNode[];
}

const VideoGrid = ({ children }: propType) => {
	const colNumber = Array.isArray(children) ? Math.ceil(children.length ** 0.5) : 1;
	const rowNumber =
		Array.isArray(children) && children.length === colNumber ** 2 ? colNumber : colNumber - 1;

	return <div css={videoGridStyle(rowNumber, colNumber)}>{children}</div>;
};

export default VideoGrid;
