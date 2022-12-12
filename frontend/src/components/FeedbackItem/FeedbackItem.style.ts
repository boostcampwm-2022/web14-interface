import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';

export const feedbackBoxStyle = () => css`
	${flexRow({ gap: '8px', justifyContent: 'space-between', alignItems: 'flex-start' })};

	width: 100%;
`;

export const feedbackContentAreaStyle = (theme) => css`
	${flexRow({ gap: '8px', justifyContent: 'space-between', alignItems: 'flex-start' })}
	width: 100%;
	min-height: 96px;
	background-color: ${theme.colors.secondary};
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
	background-color: ${theme.colors.secondary};
	padding: 15px 30px 15px 15px;
	box-sizing: border-box;
`;

export const fbStartTimeStyle = (theme) => css`
	width: 45px;
	height: 15px;
	font-size: 12px;
	border-radius: 2px;
	line-height: 15px;
	text-align: center;

	background-color: ${theme.colors.secondary};
`;
