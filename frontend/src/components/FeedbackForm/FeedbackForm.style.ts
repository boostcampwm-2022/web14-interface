import { css } from '@emotion/react';

export const fbFormStyle = (theme) => css`
	display: flex;
	gap: 10px;
`;

export const fbInputStyle = (theme) => css`
	width: 260px;
	height: 70px;
	border-radius: 5px;
	border: none;
	background-color: ${theme.colors.primary2};
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

	background-color: ${theme.colors.primary2};
`;
