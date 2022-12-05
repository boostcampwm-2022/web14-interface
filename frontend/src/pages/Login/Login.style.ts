import { css } from "@emotion/react";

export const LoginWrapper = (theme) => css`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;
	background: ${theme.colors.tertiary};

	gap: 64px;
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