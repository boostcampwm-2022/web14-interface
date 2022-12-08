import { css } from '@emotion/react';

export const feedbackWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background-color: ${theme.colors.tertiary};
`;

export const feedbackPageContainerStyle = css`
	height: 100%;
	display: flex;
	gap: 25px;
	justify-content: center;
	align-items: center;
	max-width: 1200px;
	margin: auto;
`;

export const feedbackSyncBtnStyle = (theme, isFbSync) => css`
	background-color: ${isFbSync ? theme.colors.primary : theme.colors.white};
	width: 50;
	height: 50;
	border-radius: '25px';
	display: 'flex';
	justify-content: 'center';
	align-items: 'center';
`;

export const feedbackAreaStyle = css`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 80%;
	gap: 25px;
`;
