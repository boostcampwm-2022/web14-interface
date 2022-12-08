import { css } from '@emotion/react';

export const feedbackBoxStyle = css`
	display: flex;
	gap: 10px;
	position: relative;
`;

export const fbTextAreaStyle = (theme) => css`
	position: relative;
	width: 100%;
	border-radius: 5px;
	border: none;
	background-color: ${theme.colors.secondary};
	padding: 15px 30px 15px 15px;
	box-sizing: border-box;
`;

export const fbStartTimeStyle = (theme) => css`
	width: 30px;
	height: 15px;
	font-size: 12px;
	border-radius: 2px;
	line-height: 15px;
	text-align: center;

	background-color: ${theme.colors.secondary};
`;
