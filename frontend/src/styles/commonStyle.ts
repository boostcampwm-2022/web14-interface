import { css } from '@emotion/react';
import { flexColumn, flexRow } from './globalStyle';
import theme from './theme';

export const iconSmStyle = {
	width: '24px',
	height: '24px',
	fill: theme.colors.white,
};

export const videoAreaStyle = () => css`
	${flexColumn({ gap: '24px', alignItems: 'center' })};
	width: 50%;
	height: 100%;
`;

export const videoListStyle = () => css`
	${flexRow({ gap: '20px', justifyContent: 'center' })};
	width: 100%;
`;
