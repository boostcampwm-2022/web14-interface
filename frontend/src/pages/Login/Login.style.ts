import { css } from '@emotion/react';
import { flexColumn, flexRow } from '@styles/globalStyle';

export const LoginWrapper = (theme) => css`
	${flexRow({ gap: '64px' })};

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;
	background: ${theme.colors.tertiary};

	gap: 128px;
	color: ${theme.colors.white};

	span {
		font-weight: bold;
	}
`;

export const previewStyle = css`
	width: 40%;
`;

export const logoStyle = css`
	width: 320px;
`;

export const LoginButtonAreaStyle = () => css`
	${flexColumn({ gap: '16px' })};

	width: 100%;
`;
