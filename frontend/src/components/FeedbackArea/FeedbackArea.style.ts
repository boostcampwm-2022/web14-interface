import { css } from '@emotion/react';

export const feedbackAreaStyle = (theme) => css`
	display: flex;
	flex-direction: column;
	width: 50%;
	gap: 25px;
`;

export const feedbackListStyle = (theme) => css`
	overflow: scroll;
	display: flex;
	flex-direction: column;
	height: 800px;
	gap: 10px;
`;
