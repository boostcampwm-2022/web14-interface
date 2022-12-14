import { css } from '@emotion/react';

export const videoWrapperStyle = (theme, width, height) => css`
	display: flex;
	justify-content: center;

	width: ${width};
	height: ${height};
	background-color: ${theme.colors.black};
	overflow: hidden;

	aspect-ratio: 16 / 9;

	border: 2px solid ${theme.colors.gray2};
	border-radius: ${theme.borderRadius};
`;

export const videoStyle = () => css`
	width: 100%;
`;
