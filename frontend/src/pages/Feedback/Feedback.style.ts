import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const feedbackWrapperStyle = (theme) => css`
	width: 100%;
	height: calc(100% - ${theme.bottomBarHeight});
	background-color: ${theme.colors.tertiary};
`;

export const feedbackContainerStyle = (theme) => css`
	${flexRow({ gap: '24px' })};

	width: 80%;
	height: 100%;
	max-width: 1200px;
	margin: auto;

	color: ${theme.colors.white};
`;

export const feedbackAreaStyle = css`
	${flexColumn({ gap: '24px' })};

	width: 50%;
	height: 80%;
`;

export const syncButtonAreaStyle = (theme) => css`
	${flexRow({ gap: '16px' })};
`;

export const syncDotLineStyle = () => css`
	width: 16px;
`;
