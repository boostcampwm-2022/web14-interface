import { css } from '@emotion/react';

export const feedbackPageStyle = (theme) => css`
	width: 100vw;
	height: 100vh;
	padding: 50px;
	box-sizing: border-box;
	background-color: ${theme.colors.primary3};
`;

export const feedbackPageContainerStyle = css`
	display: flex;
	gap: 10px;
	align-items: center;
	max-width: 850px;
	height: 600px;
	margin: auto;
`;
