import { css } from '@emotion/react';
import { flexRow } from '@styles/globalStyle';

export const buttonStyle = (theme, width, size, style, color, iconColor, justifyContent) => css`
	${flexRow({ gap: '8px', justifyContent })};

	${size === 'xSmall'
		? xSmallButtonStyle(theme, width)
		: size === 'small'
		? smallButtonStyle(theme, width)
		: size === 'medium'
		? mediumButtonStyle(theme, width)
		: largeButtonStyle(theme, width)}

	${style === 'contained'
		? containedButtonStyle(theme, color, iconColor)
		: textButtonStyle(theme, color, iconColor)}
`;

const xSmallButtonStyle = (theme, width) => css`
	width: ${width};
	padding: 8px;

	font-size: ${theme.fontSize.xSmall};
	line-height: ${theme.fontSize.xSmall};

	border-radius: ${theme.borderRadius};

	svg {
		width: ${theme.fontSize.small};
	}
`;

const smallButtonStyle = (theme, width) => css`
	width: ${width};
	padding: ${theme.fontSize.xSmall};

	font-size: ${theme.fontSize.small};
	line-height: ${theme.fontSize.small};

	border-radius: ${theme.borderRadius};

	svg {
		width: ${theme.fontSize.small};
	}
`;

const mediumButtonStyle = (theme, width) => css`
	width: ${width};
	padding: 14px;

	font-size: ${theme.fontSize.medium};
	line-height: ${theme.fontSize.medium};

	border-radius: ${theme.borderRadius};

	svg {
		width: ${theme.fontSize.medium};
	}
`;

const largeButtonStyle = (theme, width) => css`
	width: ${width};
	padding: ${theme.fontSize.small};

	font-size: ${theme.fontSize.large};
	line-height: ${theme.fontSize.large};

	border-radius: ${theme.borderRadius};

	svg {
		width: ${theme.fontSize.large};
	}
`;

const containedButtonStyle = (theme, color, iconColor) => css`
	background-color: ${theme.colors[color]};
	color: ${color === 'secondary' ? theme.colors.tertiary : theme.colors.white};

	${iconColor ? constrainedButtonIconColor(theme, color) : ''}

	&:disabled {
		background-color: ${theme.colors.gray3};
		cursor: default;

		&:hover {
			filter: brightness(100%);
		}
	}

	&:hover {
		filter: ${color === 'black'
			? `brightness(200%)`
			: color === 'secondary'
			? `brightness(102%)`
			: `brightness(110%)`};
	}

	&:active {
		filter: ${color === 'black' ? `brightness(100%)` : `brightness(90%)`};
	}
`;

const textButtonStyle = (theme, color, iconColor) => css`
	color: ${theme.colors[color]};

	${iconColor ? textButtonIconColor(theme, color) : ''}

	&:disabled {
		color: ${theme.colors.gray2};
		opacity: 0.4;
		cursor: default;

		&:hover {
			background: none;
		}
	}

	&:hover {
		background-color: ${theme.colors[color] + '48'};
	}

	&:active {
		background-color: ${theme.colors[color] + '24'};
	}
`;

const constrainedButtonIconColor = (theme, color) => css`
	svg {
		fill: ${color === 'secondary' ? theme.colors.tertiary : theme.colors.white};
	}
`;

const textButtonIconColor = (theme, color) => css`
	svg {
		fill: ${theme.colors[color]};
	}
`;
