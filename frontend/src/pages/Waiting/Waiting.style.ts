import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';

export const waitingWrapperStyle = (theme) => css`
	${flexRow({ gap: '64px' })};

	width: 100%;
	height: 100%;

	text-align: center;
	background-color: ${theme.colors.tertiary};

	div {
		font-size: 20px;
		color: ${theme.colors.white};
	}

	div:nth-child(2) {
		font-size: 32px;
		color: ${theme.colors.white};
	}
`;
