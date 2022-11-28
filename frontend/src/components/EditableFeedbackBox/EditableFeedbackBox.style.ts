import { css } from '@emotion/react';

export const feedbackBoxStyle = (theme) => css`
	display: flex;
	gap: 10px;
`;

export const fbTextAreaStyle = (theme) => css`
	position: relative;
	width: 260px;
	border-radius: 5px;
	border: none;
	background-color: ${theme.colors.primary2};
	padding: 15px 30px 15px 15px;
	box-sizing: border-box;
`;

export const fbBtnContainer = css`
	position: relative;
	right: 30px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const fbStartTimeStyle = (theme) => css`
	width: 30px;
	height: 15px;
	font-size: 12px;
	border-radius: 2px;
	line-height: 15px;
	text-align: center;

	background-color: ${theme.colors.primary2};
`;
