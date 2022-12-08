import { css } from '@emotion/react';

export const fbFormWrapperStyle = (theme) => css`
	width: 100%;
	display: flex;
	gap: 10px;
`;

export const fbFormStyle = css`
	width: 100%;
`;

export const fbInputStyle = (theme) => css`
	width: 100%;
	height: 120px;
	border-radius: 5px;
	border: none;
	background-color: ${theme.colors.secondary};
	padding: 15px;
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
