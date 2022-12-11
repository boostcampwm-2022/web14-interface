import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const NotFoundWrapperStyle = (theme) => css`
	${flexRow({ gap: '80px' })};

	width: 100%;
	height: 100%;

	background-color: ${theme.colors.tertiary};
`;

export const PreviewErrorStyle = () => css`
	width: 560px;
`;

export const ContentWrapperStyle = (theme) => css`
	${flexColumn({ gap: '32px' })};

	h1 {
		margin: 0px;

		font-size: 160px;
		line-height: 140px;

		color: ${theme.colors.primary};
	}

	span {
		font-size: 24px;

		color: ${theme.colors.secondary};
	}
`;

export const buttonAreaStyle = () => css`
	${flexRow({ gap: '16px' })};

	width: 100%;

	a {
		width: 100%;
	}
`;
