import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const docsModalWrapperStyle = (theme, section) => css`
	${flexColumn({ justifyContent: 'unset' })};

	width: 840px;
	height: 80vh;

	background-color: ${section === 'list' ? theme.colors.white : theme.colors.tertiary};
	color: ${section === 'list' ? theme.colors.black : theme.colors.white};
	overflow-x: hidden;

	border-radius: ${theme.borderRadius};
`;

export const docsModalHeaderStyle = () => css`
	${flexRow({ justifyContent: 'space-between' })};

	width: 100%;
	padding: 16px;

	span {
		font-size: 24px;
		line-height: 16px;
	}
`;

export const docsModalContentStyle = (section) => css`
	${flexRow({ justifyContent: 'unset', gap: '64px' })};

	width: 100%;
	height: calc(100% - 72px);
	padding: 16px 32px;

	transform: translateX(${section === 'list' ? '0%' : '-100%'});
`;

export const modalSyncButtonAreaStyle = (theme) => css`
	${flexRow({ gap: '12px' })};

	padding-left: 96px;
`;

export const modalSyncDotLineStyle = (theme) => css`
	width: 12px;
`;
