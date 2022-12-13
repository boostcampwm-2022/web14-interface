import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';
import { StyleType } from './RoundButton';

export const roundButtonStyle = ({
	theme,
	width,
	size = 'medium',
	color = 'primary',
	style = 'contained',
}: StyleType) => css`
	${flexRow({ gap: '8px', justifyContent: 'center' })}

	width: ${width}px;

	${style === 'contained' ? containedButton(theme, color) : textButton(theme, color)}

	${size === 'small'
		? roundButtonSmall(theme)
		: size === 'medium'
		? roundButtonMedium(theme)
		: roundButtonLarge(theme)}
`;

const containedButton = (theme, color) => css`
	background-color: ${theme.colors[color]};
	color: ${color === 'secondary' ? theme.colors.primary : theme.colors.white};

	&:hover {
		filter: ${color === 'black' ? `brightness(200%)` : `brightness(110%)`};
	}

	svg {
		fill: ${color === 'secondary' ? theme.colors.primary : theme.colors.white};
	}
`;

const textButton = (theme, color) => css`
	background-color: rgba(0, 0, 0, 0);
	color: ${theme.colors[color]};

	svg {
		fill: ${theme.colors[color]};
	}

	&:hover {
		background-color: ${theme.colors[color] + '48'};
	}

	&:active {
		background-color: ${theme.colors[color] + '24'};
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
	}
`;

const roundButtonLarge = (theme) => css`
	font-size: ${theme.fontSize.large};
	line-height: ${theme.fontSize.large};
	padding: 12px;

	border-radius: 100px;

	svg {
		width: ${theme.fontSize.large};
		height: ${theme.fontSize.large};
	}
`;
