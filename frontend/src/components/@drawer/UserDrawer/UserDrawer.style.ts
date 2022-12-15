import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const userListStyle = (theme) => css`
	${flexColumn({ gap: '8px', justifyContent: 'space-between', alignItems: 'center' })}
	width: 100%;

	color: ${theme.colors.white};
	padding: 20px 0px;
`;

export const userItemStyle = () => css`
	width: 100%;
	${flexRow({ justifyContent: 'space-between' })};
`;

export const userIconStyle = (theme) => css`
	${flexRow({ gap: '16px' })};
	padding-right: 12px;

	svg {
		width: 20px;
		height: 20px;
		fill: ${theme.colors.white};
	}
`;

export const drawerBottomBoxStyle = css`
	${flexColumn({ justifyContent: 'center' })};

	width: 100%;

	position: absolute;
	left: 0px;
	bottom: 0;
`;

export const dividerStyle = (theme) => css`
	height: 1px;
	width: 90%;
	background-color: ${theme.colors.gray3};
`;

export const roomUUIDStyle = (theme) => css`
	${flexRow({ gap: '32px', justifyContent: 'space-between' })}
	width: 100%;
	height: 72px;
	padding: ${theme.fontSize.medium};

	color: ${theme.colors.secondary};
	font-size: ${theme.fontSize.xSmall};
`;

export const offIconStyle = (theme) => css`
	fill: ${theme.colors.red};
`;
