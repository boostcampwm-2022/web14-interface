import { css } from '@emotion/react';

export const lobbyWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;
	background-color: ${theme.colors.tertiary};
`;

export const VideoAreaStyle = () => css`
	display: flex;
	justify-content: center;
	align-content: center;

	width: 100%;
	height: calc(100% - 72px);
`;
