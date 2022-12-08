import { css } from '@emotion/react';

export const interviewerWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;
	background-color: ${theme.colors.tertiary};
`;

export const interviewerContainerStyle = css`
	height: 100%;
	display: flex;
	gap: 25px;
	justify-content: center;
	align-items: center;
	max-width: 1200px;
	margin: auto;
`;
