import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';

export const recordLabelStyle = (theme) => css`
	${flexRow({ gap: '4px' })};

	background-color: ${theme.colors.white};
	border-radius: 100px;
	padding: 2px 8px 2px 2px;

	position: absolute;
	left: 24px;
	top: 24px;

	line-height: 12px;

	color: ${theme.colors.red};

	svg {
		fill: ${theme.colors.red};
		width: 24px;
		height: 24px;

		animation-name: blinking;
		animation-duration: 2s;
		animation-direction: alternate-reverse;
		animation-iteration-count: infinite;
		animation-timing-function: ease;
	}

	@keyframes blinking {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
