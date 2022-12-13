import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';

export const feedbackBoxStyle = (theme, readOnly) => css`
	${flexRow({ gap: '8px', justifyContent: 'space-between', alignItems: 'flex-start' })};
	color: ${readOnly ? theme.colors.black : theme.colors.white};

	width: 100%;
`;

export const feedbackContentAreaStyle = (theme, readOnly) => css`
	${flexRow({ gap: '8px', justifyContent: 'space-between', alignItems: 'flex-start' })}
	width: calc(100% - 32px - 52px);
	min-height: 96px;
	background-color: ${readOnly ? theme.colors.secondary : theme.colors.primary};
	padding: 12px;

	border-radius: ${theme.borderRadius};

	word-break: break-all;
`;

export const feedbackContentStyle = (theme) => css`
	width: 100%;

	outline: none;
`;

export const fbTextAreaStyle = (theme) => css`
	position: relative;
	width: 100%;
	border-radius: 5px;
	border: none;

	padding: 15px 30px 15px 15px;
	box-sizing: border-box;
`;

export const fbStartTimeStyle = (theme, readOnly) => css`
	width: 52px;
	height: 24px;
	background-color: ${readOnly ? theme.colors.secondary : theme.colors.primary};

	font-size: 16px;
	line-height: 20px;
	text-align: center;

	border-radius: 4px;
`;
