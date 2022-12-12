import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';
import { StyleType } from './RoundButton';

export const roundButtonStyle = ({
	theme,
	width,
	size = 'medium',
	color = 'primary',
}: StyleType) => css`
	${flexRow({ gap: '8px', justifyContent: 'center' })}

	width: ${width}px;
	background-color: ${theme.colors[color]};
	color: ${color === 'secondary' ? theme.colors.primary : theme.colors.white};

	${size === 'small' ? roundButtonSmall(theme) : roundButtonMedium(theme)}

	&:hover {
		filter: ${color === 'black' ? `brightness(200%)` : `brightness(110%)`};
	}

	svg {
		fill: ${color === 'secondary' ? theme.colors.primary : theme.colors.white};
	}
`;

const roundButtonSmall = (theme) => css`
	font-size: ${theme.fontSize.small};
	line-height: ${theme.fontSize.small};

	padding: 12px;

	border-radius: 100px;

	svg {
		width: ${theme.fontSize.small};
		height: ${theme.fontSize.small};
	}
`;

const roundButtonMedium = (theme) => css`
	font-size: ${theme.fontSize.medium};
	line-height: ${theme.fontSize.medium};
	padding: 12px;

	border-radius: 100px;

	svg {
		width: ${theme.fontSize.medium};
		height: ${theme.fontSize.medium};

		margin-top: 2px;
	}
`;
