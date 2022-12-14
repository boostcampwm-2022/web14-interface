import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';

export const interviewerWrapperStyle = (theme) => css`
	width: 100%;
	height: calc(100% - ${theme.bottomBarHeight});
	background-color: ${theme.colors.tertiary};

	padding: 56px;
`;

export const interviewerContainerStyle = (theme) => css`
	${flexRow({ gap: '48px' })};

	height: 100%;
	color: ${theme.colors.white};
`;
