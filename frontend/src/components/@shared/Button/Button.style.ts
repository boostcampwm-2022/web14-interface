import { css } from '@emotion/react';

export const buttonStyle = (theme, width, size, style, color, iconColor, justifyContent) => css`
	display: flex;
	justify-content: ${justifyContent};
	align-items: center;
	gap: 8px;

	width: ${width};
	padding: ${size === 'small' ? '12px' : '16px'};
	font-size: ${size === 'small' ? '16px' : '20px'};
	line-height: ${size === 'small' ? '14px' : '17px'};

	border-radius: 8px;

	${style === 'contained'
		? containedButtonStyle(theme, color, iconColor)
		: textButtonStyle(theme, color, iconColor)}

	svg {
		width: ${size === 'small' ? '16px' : '20px'};
	}
`;

const containedButtonStyle = (theme, color, iconColor) => css`
	background-color: ${theme.colors[color]};
	color: ${color === 'secondary' ? theme.colors.primary : theme.colors.white};

	${iconColor
		? `svg {
    fill: ${color === 'secondary' ? theme.colors.primary : theme.colors.white};
}`
		: ''}

	&:disabled {
		background-color: ${theme.colors.gray3};
		cursor: default;

		&:hover {
			filter: brightness(100%);
		}
	}

	&:hover {
		filter: ${color === 'black' ? `brightness(200%)` : `brightness(110%)`};
	}

	&:active {
		filter: ${color === 'black' ? `brightness(100%)` : `brightness(90%)`};
	}
`;

const textButtonStyle = (theme, color, iconColor) => css`
	color: ${theme.colors[color]};

	${iconColor
		? `svg {
    fill: ${color === 'secondary' ? theme.colors.primary : theme.colors.white};
}`
		: ''}

	&:disabled {
		background-color: ${theme.colors.gray3};
		color: ${theme.colors.gray2};
		cursor: default;

		&:hover {
			background-color: ${theme.colors.gray3};
		}
	}

	&:hover {
		background-color: ${theme.colors[color] + '48'};
	}

	&:active {
		background-color: ${theme.colors[color] + '24'};
	}
`;
