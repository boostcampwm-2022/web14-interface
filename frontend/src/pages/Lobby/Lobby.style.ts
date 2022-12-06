import { css } from '@emotion/react';

export const lobbyWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;
	background-color: ${theme.colors.tertiary};
`;

export const startInterviewBtnStyle = (theme) => css`
	box-sizing: border-box;
	background-color: ${theme.colors.primary};
	width: 200px;
	height: 50px;
	border-radius: 36px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 30px;

	div {
		color: white;
		font-size: 24px;
	}
`;

export const VideoAreaStyle = () => css`
	display: flex;
	justify-content: center;
	align-content: center;

	width: 100%;
	height: calc(100% - 72px);
`;
