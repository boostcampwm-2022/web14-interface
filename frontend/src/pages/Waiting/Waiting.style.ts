import { css } from '@emotion/react';

export const waitingWrapperStyle = (theme) => css`
	width: 100%;
	height: 100%;

	text-align: center;
	background-color: ${theme.colors.tertiary};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 40px;

	div {
		font-size: 36px;
		color: white;
	}
`;
