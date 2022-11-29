import { css } from '@emotion/react';

export const feedbackAreaStyle = (theme) => css`
	display: flex;
	flex-direction: column;
	width: 40%;
	gap: 25px;
`;

export const feedbackListStyle = (theme) => css`
	overflow: scroll;
	display: flex;
	flex-direction: column;
	height: 500px;
	gap: 5px;
`;
