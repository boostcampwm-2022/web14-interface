import { css } from '@emotion/react';

export const lobbyWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;
	background-color: ${theme.colors.primary3};
`;

export const startInterviewBtnStyle = (theme) => css`
	box-sizing: border-box;
	background-color: ${theme.colors.primary};
	width: 262px;
	height: 64px;
	border-radius: 36px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 40px;

	div {
		color: white;
		font-size: 32px;
	}
`;
