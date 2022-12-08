import { css } from '@emotion/react';

export const feedbackWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background-color: ${theme.colors.tertiary};
`;

export const feedbackPageContainerStyle = css`
	height: 100%;
	display: flex;
	gap: 25px;
	justify-content: center;
	align-items: center;
	max-width: 1200px;
	margin: auto;
`;
