import { css } from '@emotion/react';

export const roundButtonStyle = (style) => css`
	display: flex;
	justify-content: center;
	align-items: center;

	width: ${style.width}px;
	height: ${style.height}px;
	border-radius: ${style.height / 2}px;
	background-color: ${style.backgroundColor};
	color: ${style.color};
`;
