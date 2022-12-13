import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const intervieweeWrapperStyle = (theme) => css`
	${flexColumn({ gap: '24px', justifyContent: 'center' })};

	width: 100%;
	height: calc(100% - ${theme.bottomBarHeight});
	padding: 24px;
	background-color: ${theme.colors.tertiary};
`;

export const VideoListAreaStyle = () => css`
	${flexRow({ gap: '20px', justifyContent: 'center' })};
	width: 100%;
	height: 33%;
`;
