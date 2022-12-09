import { css } from '@emotion/react';

export const roundButtonStyle = (style) => css`
	display: flex;
	box-sizing: border-box;
	justify-content: space-around;
	align-items: center;

	width: ${style.width}px;
	height: ${style.height}px;
	border-radius: ${style.height / 2}px;
	background-color: ${style.backgroundColor};
	color: ${style.color || 'white'};
	font-size: ${style.fontsize || '24px'};
`;
