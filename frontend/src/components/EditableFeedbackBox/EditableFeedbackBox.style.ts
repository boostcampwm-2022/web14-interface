import { css } from '@emotion/react';

export const feedbackBoxStyle = (theme) => css`
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

export const fbBtnContainer = css`
	position: absolute;
	right: 10px;
	height: 100%;
	padding: 5px 0px;
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

	background-color: ${theme.colors.secondary};
`;
