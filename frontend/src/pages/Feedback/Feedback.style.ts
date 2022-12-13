import { css } from '@emotion/react';
import { flexColumn } from '@styles/globalStyle';

export const feedbackWrapperStyle = (theme) => css`
	width: 100%;
	height: calc(100% - ${theme.bottomBarHeight});
	background-color: ${theme.colors.tertiary};
`;

export const feedbackContainerStyle = css`
	height: 100%;
	display: flex;
	gap: 25px;
	justify-content: center;
	align-items: center;
	max-width: 1200px;
	margin: auto;
`;

export const feedbackAreaStyle = css`
	${flexColumn({ gap: '24px' })};

	width: 32%;
	height: 80%;
`;
