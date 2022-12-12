import { css } from '@emotion/react';

export const feedbackWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background-color: ${theme.colors.tertiary};
`;

export const feedbackContainerStyle = css`
	height: 100%;
	display: flex;
	gap: 25px;
	justify-content: center;
	align-items: center;
	max-width: 1200px;
	margin: auto;
`;

export const feedbackAreaStyle = css`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 80%;
	gap: 25px;
`;
